

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { generateReportFromJotform } from './_lib/logic';
import type { JotformSubmission, IndividualData } from './_lib/logic';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or service key is not defined in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);


// More robust helper function to extract user info and answers from the payload
const processJotformPayload = (body: any): JotformSubmission | null => {
    const submissionId = body.submissionID;
    if (!submissionId) return null;

    const allFields: { [key: string]: any } = { ...body };
    try {
        if (body.rawRequest) {
            const raw = JSON.parse(body.rawRequest);
            Object.assign(allFields, raw);
        }
    } catch (e) {
        console.warn('Could not parse rawRequest, proceeding with body data only.');
    }

    let firstName = 'N/A', lastName = '', email = 'N/A';
    const answers: { [key: string]: any } = {};
    const metaFields = ['submissionID', 'webhookURL', 'rawRequest', 'type', 'formID', 'ip', 'formTitle'];

    for (const key in allFields) {
        if (key.toLowerCase().includes('name') && typeof allFields[key] === 'object' && allFields[key] !== null) {
            firstName = allFields[key].first || firstName;
            lastName = allFields[key].last || lastName;
        } 
        else if (key.toLowerCase().includes('email') && typeof allFields[key] === 'string') {
            email = allFields[key];
        } 
        else if (!metaFields.includes(key)) {
            answers[key] = allFields[key];
        }
    }

    return {
        submissionId,
        firstName,
        lastName,
        email,
        assessmentDate: new Date().toISOString(),
        answers,
    };
};


export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).end('Method Not Allowed');
  }

  try {
    const submission = processJotformPayload(request.body);
    
    // --- Enhanced Validation ---
    // Fail fast if the payload is malformed or missing critical information.
    if (!submission) {
        return response.status(400).json({ error: 'Invalid webhook payload: Submission ID not found.' });
    }
    if (submission.firstName === 'N/A' || submission.email === 'N/A') {
        console.error('Webhook payload missing required user information:', submission);
        return response.status(400).json({ error: 'Webhook payload is missing required user information (name or email).' });
    }
    // --- End Enhanced Validation ---

    const reportData: IndividualData = generateReportFromJotform(submission);

    const { error: dbError } = await supabase
      .from('reports')
      .insert([
        {
          submissionId: reportData.individualId,
          data: reportData,
          createdAt: new Date().toISOString(),
        }
      ] as any);

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      if (dbError.code === '23505') { 
          return response.status(409).json({ error: 'Duplicate submission ID.', details: dbError.message });
      }
      return response.status(500).json({ error: 'Failed to save report to database.', details: dbError.message });
    }

    console.log(`Successfully processed and stored report for submission ID: ${submission.submissionId}`);
    return response.status(200).json({ message: 'Report processed successfully.' });

  } catch (e: any) {
    console.error('Webhook processing error:', e);
    return response.status(500).json({ error: 'An internal server error occurred while processing the webhook.', details: e.message });
  }
}

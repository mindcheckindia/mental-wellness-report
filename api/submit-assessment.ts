
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import { generateReportFromJotform } from './_lib/logic.js';
import type { IndividualData } from './_lib/logic.js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or service key is not defined in environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', ['POST']);
    return response.status(405).end('Method Not Allowed');
  }

  try {
    const { firstName, lastName, email, answers } = request.body;

    if (!firstName || !email || !answers) {
        return response.status(400).json({ error: 'Missing required fields: firstName, email, and answers are required.' });
    }

    // Generate a unique submission ID
    const submissionId = `SUB-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    // Adapt the incoming data to the format expected by the scoring logic function
    const submissionData = {
        submissionId,
        firstName,
        lastName: lastName || '',
        email,
        assessmentDate: new Date().toISOString(),
        answers,
    };

    const reportData: IndividualData = generateReportFromJotform(submissionData);

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
      return response.status(500).json({ error: 'Failed to save report to database.', details: dbError.message });
    }

    console.log(`Successfully processed and stored report for submission ID: ${submissionId}`);
    return response.status(200).json({ message: 'Report processed successfully.', submissionId: submissionId });

  } catch (e: any) {
    console.error('Assessment submission processing error:', e);
    return response.status(500).json({ error: 'An internal server error occurred while processing the assessment.', details: e.message });
  }
}



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

// This is a sample Jotform payload that simulates a user's submission.
const sampleSubmission: JotformSubmission = {
    submissionId: 'TEST_RUN_12345',
    firstName: 'Amelia',
    lastName: 'Bedelia',
    email: 'amelia.test@example.com',
    assessmentDate: new Date().toISOString(),
    answers: {
        // Depression: score 3 (Mild)
        'ltemgtinTheltemgtltstronggtltemgt5': 2,
        'ltemgtinTheltemgtltstronggtltemgt6': 1,
        // Anxiety: score 3 (Mild)
        'ltemgtinTheltemgtltstronggtltemgt28': 3,
        // Anger: score 4 (Low)
        'ltemgtinTheltemgtltstronggtltemgt15': 4,
        // Sleep Problems: score 5 (Good)
        'ltemgtinTheltemgtltstronggtltemgt58': 2,
        'ltemgtinTheltemgtltstronggtltemgt60': 3,
        // Suicidal Ideation: score 0 (None)
        'ltemgtinTheltemgtltstronggtltemgt55': 0,
        // ... other domains will be scored as 0 (Incomplete will show as 'Minimal', 'Low', etc)
    }
};

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
    if (request.method !== 'GET') {
        response.setHeader('Allow', ['GET']);
        return response.status(405).end('Method Not Allowed');
    }

    try {
        console.log(`[TEST RUN] Generating report for mock submission ID: ${sampleSubmission.submissionId}`);
        const reportData: IndividualData = generateReportFromJotform(sampleSubmission);

        console.log(`[TEST RUN] Saving report to Supabase...`);
        // We use `upsert` so this test endpoint can be run multiple times without causing a "duplicate key" error.
        const { error: dbError } = await supabase
            .from('reports')
            .upsert([
                {
                    submissionId: reportData.individualId,
                    data: reportData,
                    createdAt: new Date().toISOString(),
                }
            ] as any, { onConflict: 'submissionId' });

        if (dbError) {
            console.error('[TEST RUN] Supabase upsert error:', dbError);
            return response.status(500).json({ 
                error: 'Failed to save test report to database.', 
                details: dbError.message 
            });
        }

        const reportUrl = `${request.headers['x-forwarded-proto']}://${request.headers.host}/?submissionId=${sampleSubmission.submissionId}`;

        console.log(`[TEST RUN] Successfully processed. Report available at: ${reportUrl}`);
        
        response.setHeader('Content-Type', 'text/html');
        return response.status(200).send(`
            <body style="font-family: sans-serif; display: grid; place-content: center; min-height: 100vh; text-align: center; line-height: 1.6;">
                <h1>✅ Test Run Successful!</h1>
                <p>A sample report with ID <strong>${sampleSubmission.submissionId}</strong> has been saved to your database.</p>
                <p>This confirms your backend data processing and database connection are working perfectly.</p>
                <a 
                    href="${reportUrl}" 
                    style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 8px; font-size: 1.2rem;"
                >
                    Click Here to View the Report
                </a>
            </body>
        `);

    } catch (e: any) {
        console.error('[TEST RUN] Webhook processing error:', e);
        return response.status(500).json({ 
            error: 'An internal server error occurred during the test run.', 
            details: e.message 
        });
    }
}
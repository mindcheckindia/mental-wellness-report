import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import type { IndividualData } from './_lib/types.js';

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
  if (request.method !== 'GET') {
    response.setHeader('Allow', ['GET']);
    return response.status(405).end('Method Not Allowed');
  }

  const { id } = request.query;

  if (!id || typeof id !== 'string') {
    return response.status(400).json({ error: 'Submission ID is required.' });
  }

  try {
    // When selecting a JSONB column, TypeScript's type inference within the Supabase
    // client can become excessively deep. To avoid this, we fetch the data without
    // using .returns() and then apply our 'IndividualData' type via a direct cast.
    // Selecting '*' instead of just 'data' is a workaround for this TS issue.
    const { data: reports, error } = await supabase
      .from('reports')
      .select('*')
      .eq('submissionId', id)
      .limit(1);

    if (error) {
      console.error('Supabase query error:', error);
      return response.status(500).json({ error: 'Database query failed.' });
    }

    if (!reports || reports.length === 0) {
      console.error('No report found for submission ID:', id);
      return response.status(404).json({ error: `Report with Submission ID "${id}" not found.` });
    }
    
    // The report data is nested inside the 'data' property of the first record.
    const reportPayload = reports[0].data as IndividualData;

    const responseBody = JSON.stringify(reportPayload);

    response.setHeader('Content-Type', 'application/json');
    response.writeHead(200);
    response.end(responseBody);
    return;

  } catch (e: any) {
    console.error('Unexpected error fetching report:', e);
    return response.status(500).json({ error: 'An internal server error occurred.' });
  }
}

// Set this flag to true to fetch data from the API, or false to use local mock data.
// This can be controlled via the FF_FROM_API environment variable in your .env.local file.
export const FF_FROM_API = process.env.FF_FROM_API === 'true';

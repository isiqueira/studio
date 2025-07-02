// Set this flag to true to fetch data from the API, or false to use local mock data.
// This can be controlled via the FROM_API environment variable in your .env.local file.
export const FROM_API = process.env.FROM_API === 'true';

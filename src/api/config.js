/**
 * Centralized API configuration.
 * On Render (Production), it uses the REACT_APP_API_URL environment variable.
 * Locally, it falls back to the .env file or the local dev URL.
 */
export const API_BASE_URL = process.env.REACT_APP_API_URL;

console.log("Using API Base URL:", API_BASE_URL);

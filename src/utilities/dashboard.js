import sendRequest from "./send-request";

const BASE_URL = "/api/dashboard";

// Read
export function getJobs() {
  return sendRequest(`${BASE_URL}`, "GET");
}

// Create
export function createJob(data) {
  return sendRequest(`${BASE_URL}`, "POST", data);
}

// Update

export function updateJob(data) {
  return sendRequest(`${BASE_URL}`, "PUT", data);
}
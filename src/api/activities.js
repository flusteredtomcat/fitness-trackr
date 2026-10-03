import axios from "axios";

const API = import.meta.env.VITE_API;

/** Fetches an array of activities from the API. */
export async function getActivities() {
  try {
    const response = await axios.get(API + "/activities");
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * Sends a new activity to the API to be created.
 * A valid token is required.
 */
export async function createActivity(token, activity) {
  if (!token) {
    throw Error("You must be signed in to create an activity.");
  }

  try {
    await axios.post(API + "/activities", activity, {
      headers: { Authorization: "Bearer " + token },
    });
  } catch (error) {
    throw Error(error.response.data.message);
  }
}

export async function deleteActivity(token, id) {
  if (!token) {
    throw Error("You must be signed in to delete an activity.");
  }

  try {
    await axios.delete(API + "/activities/" + id, {
      headers: { Authorization: "Bearer " + token },
    });
  } catch (error) {
    throw Error(error.response.data.message);
  }
}

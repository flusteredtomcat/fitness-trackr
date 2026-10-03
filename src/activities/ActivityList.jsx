import { useState } from "react";
import { deleteActivity } from "../api/activities";

export default function ActivityList({ activities, token, syncActivities }) {
  const [error, setError] = useState(null);

  const tryDeleteActivitiy = async (id) => {
    setError(null);
    try {
      await deleteActivity(token, id);
      syncActivities();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.name}
            {token && (
              <button onClick={() => tryDeleteActivitiy(activity.id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
      {error && <p role="alert">{error}</p>}
    </>
  );
}

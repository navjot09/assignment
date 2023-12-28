import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";

export default function Meeting() {
  const { id } = useParams();
  const { success, error, loading, response } = useApi({
    method: "get",
    endpoint: `/class/${id}`,
  });
  if (loading) return <>Loading...</>;
  if (success && response.status === 200) {
    const { classDetails, meetDetails } = response.data;
    return (
      <div className="meeting-details-container">
        <div className="section">
          <h2>Class Details</h2>
          <ul>
            <li>
              <strong>Teacher:</strong> {classDetails.teacher}
            </li>
            <li>
              <strong>Students:</strong> {classDetails.students.join(", ")}
            </li>
            <li>
              <strong>Meeting ID:</strong> {classDetails.meeting_id}
            </li>
          </ul>
        </div>

        <div className="section">
          <h2>Meeting Details</h2>
          <ul>
            <li>
              <strong>Topic:</strong> {meetDetails.topic}
            </li>
            <li>
              <strong>Status:</strong> {meetDetails.status}
            </li>
            <li>
              <strong>Start Time:</strong>{" "}
              {new Date(meetDetails.start_time).toLocaleString()}
            </li>
          </ul>
        </div>

        <div className="section">
          <div className="buttons">
            <a
              href={classDetails.meeting_join_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Meeting
            </a>
            <a
              href={classDetails.meeting_start_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Meeting
            </a>
          </div>
        </div>
      </div>
    );
  }
  if (error) return <>Something Went Wrong</>;
  return <>Meeting id {id}</>;
}

import { useNavigate } from "react-router-dom";

const MeetingCard = ({ meeting, deleteMeet }) => {
  const {
    _id,
    teacher,
    meeting_id,
    meeting_join_url,
    meeting_start_url,
    meeting_time,
  } = meeting;
  const navigate = useNavigate();
  return (
    <div className="meeting-card">
      <div className="details">
        <h2>Meeting host: {teacher} </h2>
        <p>Meeting ID: {meeting_id}</p>
        <p>Meeting Time: {new Date(meeting_time).toLocaleString()}</p>
        <div className="buttons">
          <a href={meeting_join_url} target="_blank" rel="noopener noreferrer">
            Join Meeting
          </a>
          <a href={meeting_start_url} target="_blank" rel="noopener noreferrer">
            Start Meeting
          </a>
        </div>
      </div>
      <div className="action-buttons">
        <button
          onClick={() => deleteMeet(_id)}
          className=" action-button delete"
        >
          Delete
        </button>
        <button
          onClick={() => navigate(`/edit/${_id}`)}
          className=" action-button edit"
        >
          Edit
        </button>
        <button
          className="action-button"
          onClick={() => navigate(`/meeting/${_id}`)}
        >
          More details
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;

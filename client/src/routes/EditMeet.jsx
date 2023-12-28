import { useParams } from "react-router-dom";
import { useApi } from "../hooks/useApi";
import MeetForm from "../components/MeetForm";

export default function EditMeet() {
  const { id } = useParams();
  const { success, error, loading, response } = useApi({
    method: "get",
    endpoint: `/class/${id}`,
  });
  if (loading) return <>Loading...</>;
  if (success && response.status === 200) {
    const { classDetails, meetDetails } = response.data;
    return (
      <MeetForm
        type={"edit"}
        id={id}
        meetDetials={{
          teacher: classDetails.teacher,
          students: classDetails.students,
          agenda: meetDetails.agenda,
          topic: meetDetails.topic,
          time: classDetails.meeting_time,
        }}
      />
    );
  }
  if (error) return <>Something Went Wrong</>;
  return <>Meeting id {id}</>;
}

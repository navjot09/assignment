import { useMemo, useState } from "react";
import MeetingCard from "../components/MeetCard";
import { useApi } from "../hooks/useApi";
import axios from "axios";

export default function Home() {
  const { success, error, loading, response } = useApi({
    method: "get",
    endpoint: "/class",
  });
  const [removedMeets, setRemovedMeets] = useState([]);
  const meets = useMemo(() => {
    if (!response?.data?.data) return [];
    return response.data.data.filter(
      (item) => !removedMeets.includes(item._id)
    );
  }, [response, removedMeets]);
  if (loading) return <>Loading....</>;
  if (error) return <>Error</>;
  if (success) {
    const deleteMeet = async (id) => {
      try {
        const { status } = await axios.delete(
          `http://localhost:8080/class/${id}`
        );
        if (status === 204) {
          console.log("deleted");
          setRemovedMeets((prev) => [...prev, id]);
        }
      } catch (error) {
        console.log("failed to delete");
      }
    };
    return (
      <>
        <div>
          <div>Total Count: {meets.length}</div>
          {meets.length === 0 && <div>No Meets found!</div>}
          {meets?.map((meeting) => (
            <MeetingCard
              key={meeting._id}
              meeting={meeting}
              deleteMeet={deleteMeet}
            />
          ))}
        </div>
      </>
    );
  }
  return <>Home</>;
}

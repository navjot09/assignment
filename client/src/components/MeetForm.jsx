import { useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MeetForm({ meetDetials, type, id }) {
  const [teacherEmail, setTeacherEmail] = useState("");
  const [studentsEmails, setStudentsEmails] = useState("");
  const [topic, setTopic] = useState("");
  const [agenda, setAgenda] = useState("");
  const [loading, setLoading] = useState(false);
  const [time, setTime] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    if (meetDetials && type === "edit") {
      setTeacherEmail(meetDetials.teacher);
      setStudentsEmails(meetDetials.students.join(", "));
      setTopic(meetDetials.topic);
      setAgenda(meetDetials.agenda);
      setTime(meetDetials.time);
    }
  }, [meetDetials, type]);
  const resetStates = () => {
    setTeacherEmail("");
    setStudentsEmails("");
    setTopic("");
    setAgenda("");
    setTime(new Date());
  };
  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const body = {
        teacher: teacherEmail,
        students: studentsEmails.split(",").map((item) => item.trim()),
        time,
        agenda,
        topic,
      };
      if (type === "edit") {
        const { status } = await axios.patch(
          `http://localhost:8080/class/${id}`,
          body
        );
        if (status === 204) {
          console.log("updated");
          navigate("/");
        } else console.log("falied");
      } else {
        const { status } = await axios.post(
          "http://localhost:8080/class",
          body
        );
        if (status === 201) {
          console.log("created");
          navigate("/");
        } else console.log("falied");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      resetStates();
    }
  };
  return (
    <div>
      <form className="new-meeting-form" onSubmit={submit}>
        <label className=" label">
          Teacher&apos;s Email:
          <input
            className="input"
            placeholder="teacher@gmail.com"
            type="email"
            value={teacherEmail}
            onChange={(e) => setTeacherEmail(e.target.value)}
            required
          />
        </label>
        <label className=" label">
          Students&apos; Emails (comma-separated):
          <input
            className="input"
            type="text"
            placeholder="student1@gmail.com, student2@gmail.com"
            value={studentsEmails}
            onChange={(e) => setStudentsEmails(e.target.value)}
            required
          />
        </label>
        <label className=" label">
          Topic:
          <input
            className="input"
            placeholder="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </label>
        <label className=" label">
          Agenda:
          <textarea
            placeholder="agenda"
            className="textarea"
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
            required
          />
        </label>
        <label className="label">
          Date & Time:
          <DateTimePicker
            className="input"
            value={time}
            onChange={(val) => setTime(val)}
          />
        </label>
        <button className="button" type="submit">
          {type === "edit" ? "Edit Meeting" : "Create Meeting"}
        </button>
        {loading && <span>Loading....</span>}
      </form>
    </div>
  );
}

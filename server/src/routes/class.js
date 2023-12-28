import { Router } from "express";
import Class from "../models/class.model.js";
import { asynchHandler } from "../utils/asyncHandler.js";
import { getToken } from "../utils/tokens.js";
import { tokenCheck } from "../middleware/tokenCheck.js";
import { ZOOM_API_BASE_URL } from "../utils/constants.js";
import axios from "axios";
import { Types } from "mongoose";
const router = Router();
router
  .route("/")
  .get(
    asynchHandler(async (req, res) => {
      const classes = await Class.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: classes });
    })
  )
  .post(
    tokenCheck,
    asynchHandler(async (req, res) => {
      const { headerConfig, body } = req;
      const { teacher, students, time, agenda, topic } = body;
      const sanitizedStudents = students.map((student) => ({
        email: student,
      }));
      const meetResponse = await axios.post(
        `${ZOOM_API_BASE_URL}/users/me/meetings`,
        {
          agenda,
          topic,
          settings: {
            meeting_invitees: sanitizedStudents,
            registrants_confirmation_email: true,
            registrants_email_notification: true,
          },
          start_time: time,
        },
        headerConfig
      );
      const { data } = meetResponse;
      if (data?.id) {
        const newClass = new Class({
          teacher,
          students,
          meeting_start_url: data.start_url,
          meeting_join_url: data.join_url,
          meeting_id: data.id,
          meeting_time: data.start_time,
        });
        await newClass.save();
        return res.status(201).json({ success: true, data: newClass });
      }
      return res
        .status(400)
        .json({ success: false, error: "Error creating meeting" });
    })
  );
router
  .route("/:id")
  .get(
    tokenCheck,
    asynchHandler(async (req, res) => {
      const { params, headerConfig } = req;
      const { id } = params;
      const objId = new Types.ObjectId(id);
      const classDetails = await Class.findById(objId);
      if (classDetails) {
        const { data } = await axios.get(
          `${ZOOM_API_BASE_URL}/meetings/${classDetails.meeting_id}`,
          headerConfig
        );
        return res
          .status(200)
          .json({ success: true, classDetails, meetDetails: data });
      }
      res.status(400).json({ success: false, error: "No class found" });
    })
  )
  .patch(
    tokenCheck,
    asynchHandler(async (req, res) => {
      console.log("called");
      const { headerConfig, body, params } = req;
      const { teacher, students, time, agenda, topic } = body;
      const { id } = params;
      const objId = new Types.ObjectId(id);
      const sanitizedStudents = students.map((student) => ({
        email: student,
      }));
      const classDetails = await Class.findById(objId);
      if (classDetails) {
        const meetResponse = await axios.patch(
          `${ZOOM_API_BASE_URL}/meetings/${classDetails.meeting_id}`,
          {
            agenda,
            topic,
            settings: {
              meeting_invitees: sanitizedStudents,
              registrants_confirmation_email: true,
              registrants_email_notification: true,
            },
            start_time: time,
          },
          headerConfig
        );
        const { status } = meetResponse;
        if (status === 204) {
          await Class.findByIdAndUpdate(objId, {
            teacher,
            students,
            meeting_time: time,
          });
          return res.status(204).json({ success: true });
        }
        return res
          .status(400)
          .json({ success: false, error: "Error updating meeting" });
      }
      return res.status(400).json({ success: false, error: "No class found" });
    })
  )
  .delete(
    tokenCheck,
    asynchHandler(async (req, res) => {
      const { params, headerConfig } = req;
      const { id } = params;
      const objId = new Types.ObjectId(id);
      const classDetails = await Class.findById(objId);
      if (classDetails) {
        await axios.delete(
          `${ZOOM_API_BASE_URL}/meetings/${classDetails.meeting_id}`,
          headerConfig
        );
        await Class.findByIdAndDelete(objId);
        return res.status(204).json({ success: true });
      }
      res.status(400).json({ success: false, error: "No class found" });
    })
  );

export default router;

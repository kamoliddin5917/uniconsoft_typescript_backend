import { Request, Response } from "express";
import model from "./model";

export default {
  POST: async (req: Request, res: Response) => {
    try {
      const { name, time, projectId, workerId, leaderId } = req.body;

      if (!name || !time || !projectId || !workerId || isNaN(time))
        return res.status(400).json({ message: "BAD_REQUEST!" });

      const createTask = await model.createTask(
        name,
        time,
        projectId,
        workerId,
        leaderId
      );

      if (!createTask)
        return res.status(500).json({ message: "SERVER_CREATED_ERROR!" });

      res.status(201).json({
        message: "CREATED!",
        data: createTask,
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
  PUT: async (req: Request, res: Response) => {
    try {
      const { name, time, projectId, workerId, leaderId } = req.body;
      const { taskId } = req.params;

      if (!name || !time || !projectId || !workerId || isNaN(time))
        return res.status(400).json({ message: "BAD_REQUEST!" });

      const updateTaks = await model.updateTaks(
        name,
        time,
        projectId,
        workerId,
        taskId,
        leaderId
      );

      if (!updateTaks)
        return res.status(500).json({ message: "SERVER_UPDATED_ERROR!" });

      res.status(200).json({
        message: "UPDATED!",
        data: updateTaks,
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
  DELETE: async (req: Request, res: Response) => {
    try {
      const { leaderId } = req.body;
      const { taskId } = req.params;

      const deleteTask = await model.deleteTask(taskId, leaderId);

      if (!deleteTask)
        return res.status(500).json({ message: "SERVER_DELETED_ERROR!" });

      res.status(200).json({
        message: "DELETED!",
        data: deleteTask,
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
};

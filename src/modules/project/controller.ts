import { Request, Response } from "express";
import model from "./model";

export default {
  POST: async (req: Request, res: Response) => {
    try {
      const { name, orgId, leaderId } = req.body;

      if (!name || !orgId)
        return res.status(400).json({ message: "BAD_REQUEST!" });

      const createProject = await model.createProject(name, orgId, leaderId);

      if (!createProject)
        return res.status(500).json({ message: "SERVER_CREATED_ERROR!" });

      res.status(201).json({
        message: "CREATED!",
        data: createProject,
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
  PUT: async (req: Request, res: Response) => {
    try {
      const { name, leaderId } = req.body;
      const { projectId } = req.params;

      if (!name) return res.status(400).json({ message: "BAD_REQUEST!" });

      const updateProject = await model.updateProject(
        name,
        projectId,
        leaderId
      );

      if (!updateProject)
        return res.status(500).json({ message: "SERVER_UPDATED_ERROR!" });

      res.status(200).json({
        message: "UPDATED!",
        data: updateProject,
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
  DELETE: async (req: Request, res: Response) => {
    try {
      const { leaderId } = req.body;
      const { projectId } = req.params;

      const deleteProject = await model.deleteProject(projectId, leaderId);

      if (!deleteProject)
        return res.status(500).json({ message: "SERVER_DELETED_ERROR!" });

      res.status(200).json({
        message: "DELETED!",
        data: deleteProject,
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
};

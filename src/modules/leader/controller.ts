import { Request, Response } from "express";
import model from "./model";

export default {
  GET: async (req: Request, res: Response) => {
    try {
      const { leaderId } = req.body;

      const findProjects = await model.findProjects(leaderId);
      const findTasks = await model.findTasks(leaderId);
      const findWorkers = await model.findWorkers(leaderId);
      const findOrg = await model.findOrg(leaderId);

      res.status(200).json({
        message: "OK!",
        data: {
          projects: findProjects,
          tasks: findTasks,
          workers: findWorkers,
          organizations: findOrg,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
};

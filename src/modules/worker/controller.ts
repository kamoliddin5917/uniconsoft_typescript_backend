import { Request, Response } from "express";
import model from "./model";

export default {
  GET: async (req: Request, res: Response) => {
    try {
      const { workerId } = req.body;

      const findProjects = await model.findProjects(workerId);
      const findTaks = await model.findTaks(workerId);

      res.status(200).json({
        message: "OK!",
        data: { projects: findProjects, tasks: findTaks },
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
  PUT: async (req: Request, res: Response) => {
    try {
      const { start, end, workerId } = req.body;
      const { taskId } = req.params;

      if (!start && !end)
        return res.status(400).json({ message: "BAD_REQUEST!" });

      if (start) {
        const updateTaks = await model.updateTaksStart(taskId, workerId);

        if (!updateTaks)
          return res.status(500).json({ message: "SERVER_UPDATED_ERROR!" });

        res.status(200).json({
          message: "UPDATED!",
          data: updateTaks,
        });
      } else {
        const updateTaks = await model.updateTaksEnd(taskId, workerId);

        if (!updateTaks)
          return res.status(500).json({ message: "SERVER_UPDATED_ERROR!" });

        res.status(200).json({
          message: "UPDATED!",
          data: updateTaks,
        });
      }
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
};

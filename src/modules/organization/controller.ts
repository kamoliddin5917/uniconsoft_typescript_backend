import { Request, Response } from "express";
import model from "./model";

export default {
  POST: async (req: Request, res: Response) => {
    try {
      const { name, adminId } = req.body;

      if (!name) return res.status(400).json({ message: "BAD_REQUEST!" });

      const createOrg = await model.createOrg(name, adminId);

      if (!createOrg)
        return res.status(500).json({ message: "SERVER_CREATED_ERROR!" });

      res.status(201).json({
        message: "CREATED!",
        data: createOrg,
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
  PUT: async (req: Request, res: Response) => {
    try {
      const { name, adminId } = req.body;
      const { orgId } = req.params;

      if (!name) return res.status(400).json({ message: "BAD_REQUEST!" });

      const updateOrg = await model.updateOrg(name, orgId, adminId);

      if (!updateOrg)
        return res.status(500).json({ message: "SERVER_UPDATED_ERROR!" });

      res.status(200).json({
        message: "UPDATED!",
        data: updateOrg,
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
  DELETE: async (req: Request, res: Response) => {
    try {
      const { adminId } = req.body;
      const { orgId } = req.params;

      const deleteOrg = await model.deleteOrg(orgId, adminId);

      if (!deleteOrg)
        return res.status(500).json({ message: "SERVER_DELETED_ERROR!" });

      res.status(200).json({
        message: "DELETED!",
        data: deleteOrg,
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
};

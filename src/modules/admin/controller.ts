import { Request, Response } from "express";
import model from "./model";
import bcrypt from "../../utils/bcrypt";

export default {
  GET: async (req: Request, res: Response) => {
    try {
      const { adminId } = req.body;

      const findRoles = await model.findRoles();
      const findUsers = await model.findUsers(adminId);
      const findOrg = await model.findOrg(adminId);

      res.status(200).json({
        message: "OK!",
        data: {
          roles: findRoles,
          users: findUsers,
          organizations: findOrg,
          allStatistics: {
            organisationCount: findOrg.length,
            employes: findUsers.length,
          },
        },
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
  POST: async (req: Request, res: Response) => {
    try {
      const { name, username, password, roleId, organisationId, adminId } =
        req.body;

      if (!name || !username || !password || !roleId || !organisationId)
        return res.status(400).json({ message: "BAD_REQUEST!" });

      if (
        !password.match(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9][a-zA-Z0-9!@#$%^&*.,]{7,17}$/
        )
      )
        return res.status(400).json({
          message:
            "Kamida 7 ta belgi, ko'pi bn 17 ta belgi, kotta-kichkina harf, son bo'lishi, belgi bo'lishi kerak!",
        });

      const hashedPassword = await bcrypt.hashPassword(password);

      const createUser = await model.createUser(
        name,
        username,
        hashedPassword,
        roleId,
        adminId
      );

      if (!createUser)
        return res.status(500).json({ message: "SERVER_CREATED_ERROR!" });

      const userRefOrg = await model.userRefOrg(organisationId, createUser.id);

      if (!userRefOrg)
        return res.status(500).json({ message: "SERVER_REF_ERROR!" });

      res.status(201).json({
        message: "CREATED!",
        data: { ...createUser, role_id: roleId },
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
  ORG_REF_USER: async (req: Request, res: Response) => {
    try {
      const { organisationId, userId } = req.body;

      if (!userId || !organisationId)
        return res.status(400).json({ message: "BAD_REQUEST!" });

      const userRefOrg = await model.userRefOrg(organisationId, userId);

      if (!userRefOrg)
        return res.status(500).json({ message: "SERVER_REF_ERROR!" });

      res.status(201).json({ message: "CREATED!" });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
  PUT: async (req: Request, res: Response) => {
    try {
      const { roleId, adminId } = req.body;
      const { userId } = req.params;

      if (!roleId) return res.status(400).json({ message: "BAD_REQUEST!" });

      const updateUserRole = await model.updateUserRole(
        roleId,
        userId,
        adminId
      );

      if (!updateUserRole)
        return res.status(500).json({ message: "SERVER_UPDATE_ERROR!" });

      res.status(201).json({
        message: "UPDATE!",
        data: { ...updateUserRole, role_id: roleId },
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
  DELETE: async (req: Request, res: Response) => {
    try {
      const { adminId } = req.body;
      const { userId } = req.params;

      const deleteUser = await model.deleteUser(userId, adminId);

      if (!deleteUser)
        return res.status(500).json({ message: "SERVER_DELETED_ERROR!" });

      res.status(200).json({
        message: "DELETED!",
        data: deleteUser,
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
};

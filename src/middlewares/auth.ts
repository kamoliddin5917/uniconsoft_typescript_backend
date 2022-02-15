import { Request, Response, NextFunction } from "express";
import Token from "../utils/jwt";

export default {
  AUTH_ADMIN: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.headers;
      const { adminId }: any = Token.verify(token);

      if (!adminId) return res.status(401).json({ message: "Login qilin!" });

      req.body.adminId = adminId;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Login qilin!" });
    }
  },

  AUTH_LEADER: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.headers;
      const { leaderId }: any = Token.verify(token);

      if (!leaderId) return res.status(401).json({ message: "Login qilin!" });

      req.body.leaderId = leaderId;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Login qilin!" });
    }
  },

  AUTH_WORKER: (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.headers;
      const { workerId }: any = Token.verify(token);

      if (!workerId) return res.status(401).json({ message: "Login qilin!" });

      req.body.workerId = workerId;

      next();
    } catch (error) {
      return res.status(401).json({ message: "Login qilin!" });
    }
  },
};

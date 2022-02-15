import { Request, Response } from "express";
import model from "./model";
import Token from "../../utils/jwt";
import bcrypt from "../../utils/bcrypt";

export default {
  POST: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        return res.status(400).json({ message: "BAD_REQUEST!" });

      const findUser = await model.findUser(username);

      if (!findUser) return res.status(404).json({ message: "NOT_FOUND!" });

      const comparedPassword = await bcrypt.comparePassword(
        password,
        findUser.password
      );

      if (!comparedPassword)
        return res.status(400).json({ message: "BAD_REQUEST!" });

      let token: string;

      if (findUser.role === "admin") {
        token = Token.sign({ adminId: findUser.id });
      } else if (findUser.role === "leader") {
        token = Token.sign({ leaderId: findUser.id });
      } else if (findUser.role === "worker") {
        token = Token.sign({ workerId: findUser.id });
      }

      res.status(200).json({
        message: "OK!",
        data: {
          token,
          user: {
            id: findUser.id,
            name: findUser.name,
            username: findUser.username,
            role: findUser.role,
            role_id: findUser.role_id,
            created_at: findUser.created_at,
            created_by: findUser.created_by,
          },
        },
      });
    } catch (error) {
      res.status(500).json({ message: `SERVER_ERROR!` });
    }
  },
};

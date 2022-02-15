"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jwt_1 = __importDefault(require("../utils/jwt"));
exports.default = {
    AUTH_ADMIN: function (req, res, next) {
        try {
            var token = req.headers.token;
            var adminId = jwt_1.default.verify(token).adminId;
            if (!adminId)
                return res.status(401).json({ message: "Login qilin!" });
            req.body.adminId = adminId;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Login qilin!" });
        }
    },
    AUTH_LEADER: function (req, res, next) {
        try {
            var token = req.headers.token;
            var leaderId = jwt_1.default.verify(token).leaderId;
            if (!leaderId)
                return res.status(401).json({ message: "Login qilin!" });
            req.body.leaderId = leaderId;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Login qilin!" });
        }
    },
    AUTH_WORKER: function (req, res, next) {
        try {
            var token = req.headers.token;
            var workerId = jwt_1.default.verify(token).workerId;
            if (!workerId)
                return res.status(401).json({ message: "Login qilin!" });
            req.body.workerId = workerId;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Login qilin!" });
        }
    },
};

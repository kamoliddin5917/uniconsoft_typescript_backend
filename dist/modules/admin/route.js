"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = __importDefault(require("./controller"));
var auth_1 = __importDefault(require("../../middlewares/auth"));
var router = (0, express_1.Router)();
router
    .get("/admin", auth_1.default.AUTH_ADMIN, controller_1.default.GET)
    .post("/register", auth_1.default.AUTH_ADMIN, controller_1.default.POST)
    .post("/referenses", auth_1.default.AUTH_ADMIN, controller_1.default.ORG_REF_USER)
    .put("/role/:userId", auth_1.default.AUTH_ADMIN, controller_1.default.PUT)
    .delete("/admin/:userId", auth_1.default.AUTH_ADMIN, controller_1.default.DELETE);
exports.default = router;

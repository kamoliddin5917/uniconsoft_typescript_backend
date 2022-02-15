"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var model_1 = __importDefault(require("./model"));
exports.default = {
    POST: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name_1, time, projectId, workerId, leaderId, createTask, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, name_1 = _a.name, time = _a.time, projectId = _a.projectId, workerId = _a.workerId, leaderId = _a.leaderId;
                    if (!name_1 || !time || !projectId || !workerId || isNaN(time))
                        return [2 /*return*/, res.status(400).json({ message: "BAD_REQUEST!" })];
                    return [4 /*yield*/, model_1.default.createTask(name_1, time, projectId, workerId, leaderId)];
                case 1:
                    createTask = _b.sent();
                    if (!createTask)
                        return [2 /*return*/, res.status(500).json({ message: "SERVER_CREATED_ERROR!" })];
                    res.status(201).json({
                        message: "CREATED!",
                        data: createTask,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    res.status(500).json({ message: "SERVER_ERROR!" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    PUT: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name_2, time, projectId, workerId, leaderId, taskId, updateTaks, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, name_2 = _a.name, time = _a.time, projectId = _a.projectId, workerId = _a.workerId, leaderId = _a.leaderId;
                    taskId = req.params.taskId;
                    if (!name_2 || !time || !projectId || !workerId || isNaN(time))
                        return [2 /*return*/, res.status(400).json({ message: "BAD_REQUEST!" })];
                    return [4 /*yield*/, model_1.default.updateTaks(name_2, time, projectId, workerId, taskId, leaderId)];
                case 1:
                    updateTaks = _b.sent();
                    if (!updateTaks)
                        return [2 /*return*/, res.status(500).json({ message: "SERVER_UPDATED_ERROR!" })];
                    res.status(200).json({
                        message: "UPDATED!",
                        data: updateTaks,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    res.status(500).json({ message: "SERVER_ERROR!" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    DELETE: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var leaderId, taskId, deleteTask, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    leaderId = req.body.leaderId;
                    taskId = req.params.taskId;
                    return [4 /*yield*/, model_1.default.deleteTask(taskId, leaderId)];
                case 1:
                    deleteTask = _a.sent();
                    if (!deleteTask)
                        return [2 /*return*/, res.status(500).json({ message: "SERVER_DELETED_ERROR!" })];
                    res.status(200).json({
                        message: "DELETED!",
                        data: deleteTask,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    res.status(500).json({ message: "SERVER_ERROR!" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};

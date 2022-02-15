"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var bcrypt_1 = __importDefault(require("../../utils/bcrypt"));
exports.default = {
    GET: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var adminId, findRoles, findUsers, findOrg, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    adminId = req.body.adminId;
                    return [4 /*yield*/, model_1.default.findRoles()];
                case 1:
                    findRoles = _a.sent();
                    return [4 /*yield*/, model_1.default.findUsers(adminId)];
                case 2:
                    findUsers = _a.sent();
                    return [4 /*yield*/, model_1.default.findOrg(adminId)];
                case 3:
                    findOrg = _a.sent();
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
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    res.status(500).json({ message: "SERVER_ERROR!" });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    POST: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, name_1, username, password, roleId, organisationId, adminId, hashedPassword, createUser, userRefOrg, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, name_1 = _a.name, username = _a.username, password = _a.password, roleId = _a.roleId, organisationId = _a.organisationId, adminId = _a.adminId;
                    if (!name_1 || !username || !password || !roleId || !organisationId)
                        return [2 /*return*/, res.status(400).json({ message: "BAD_REQUEST!" })];
                    if (!password.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9][a-zA-Z0-9!@#$%^&*.,]{7,17}$/))
                        return [2 /*return*/, res.status(400).json({
                                message: "Kamida 7 ta belgi, ko'pi bn 17 ta belgi, kotta-kichkina harf, son bo'lishi, belgi bo'lishi kerak!",
                            })];
                    return [4 /*yield*/, bcrypt_1.default.hashPassword(password)];
                case 1:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, model_1.default.createUser(name_1, username, hashedPassword, roleId, adminId)];
                case 2:
                    createUser = _b.sent();
                    if (!createUser)
                        return [2 /*return*/, res.status(500).json({ message: "SERVER_CREATED_ERROR!" })];
                    return [4 /*yield*/, model_1.default.userRefOrg(organisationId, createUser.id)];
                case 3:
                    userRefOrg = _b.sent();
                    if (!userRefOrg)
                        return [2 /*return*/, res.status(500).json({ message: "SERVER_REF_ERROR!" })];
                    res.status(201).json({
                        message: "CREATED!",
                        data: __assign(__assign({}, createUser), { role_id: roleId }),
                    });
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    res.status(500).json({ message: "SERVER_ERROR!" });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); },
    ORG_REF_USER: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, organisationId, userId, userRefOrg, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, organisationId = _a.organisationId, userId = _a.userId;
                    if (!userId || !organisationId)
                        return [2 /*return*/, res.status(400).json({ message: "BAD_REQUEST!" })];
                    return [4 /*yield*/, model_1.default.userRefOrg(organisationId, userId)];
                case 1:
                    userRefOrg = _b.sent();
                    if (!userRefOrg)
                        return [2 /*return*/, res.status(500).json({ message: "SERVER_REF_ERROR!" })];
                    res.status(201).json({ message: "CREATED!" });
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _b.sent();
                    res.status(500).json({ message: "SERVER_ERROR!" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    PUT: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, roleId, adminId, userId, updateUserRole, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.body, roleId = _a.roleId, adminId = _a.adminId;
                    userId = req.params.userId;
                    if (!roleId)
                        return [2 /*return*/, res.status(400).json({ message: "BAD_REQUEST!" })];
                    return [4 /*yield*/, model_1.default.updateUserRole(roleId, userId, adminId)];
                case 1:
                    updateUserRole = _b.sent();
                    if (!updateUserRole)
                        return [2 /*return*/, res.status(500).json({ message: "SERVER_UPDATE_ERROR!" })];
                    res.status(201).json({
                        message: "UPDATE!",
                        data: __assign(__assign({}, updateUserRole), { role_id: roleId }),
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _b.sent();
                    res.status(500).json({ message: "SERVER_ERROR!" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
    DELETE: function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var adminId, userId, deleteUser, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    adminId = req.body.adminId;
                    userId = req.params.userId;
                    return [4 /*yield*/, model_1.default.deleteUser(userId, adminId)];
                case 1:
                    deleteUser = _a.sent();
                    if (!deleteUser)
                        return [2 /*return*/, res.status(500).json({ message: "SERVER_DELETED_ERROR!" })];
                    res.status(200).json({
                        message: "DELETED!",
                        data: deleteUser,
                    });
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    res.status(500).json({ message: "SERVER_ERROR!" });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); },
};

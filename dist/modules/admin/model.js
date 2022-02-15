"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("../../utils/pg"));
// GET
var FIND_ROLES = "\nSELECT \n        role_id AS id,\n        role_name AS name\nFROM roles\nWHERE role_name != 'admin' AND role_status = true\n";
var FIND_USERS = "\nSELECT \n        user_id AS id,\n        user_name AS name,\n        user_username AS username,\n        user_ref_admin AS created_by,\n        user_date AS created_at,\n        user_status AS status\nFROM users\nWHERE user_ref_admin = $1 \n";
var FIND_ORGS = "\nSELECT \n        org_id AS id,\n        org_name AS name,\n        org_admin AS created_by,\n        org_date AS created_at,\n        org_status AS status\nFROM organizations\nWHERE org_admin = $1 \n";
// POST
var CREATE_USER = "\nINSERT INTO users (user_name, user_username, user_password, user_role, user_ref_admin) VALUES ($1, $2, $3, $4, $5)\nRETURNING \n        user_id AS id,\n        user_name AS name,\n        user_username AS username,\n        user_ref_admin AS created_by,\n        user_date AS created_at\n";
var ORG_REF_USER = "\nINSERT INTO org_users (org_id, user_id) VALUES ($1, $2)\nRETURNING \n        org_user_id AS id\n";
var UPDATE_USER_ROLE = "\nUPDATE users SET\n                user_role = $1\nWHERE user_id = $2 AND user_ref_admin = $3\nRETURNING \n        user_id AS id,\n        user_name AS name,\n        user_username AS username,\n        user_ref_admin AS created_by,\n        user_date AS created_at\n";
// DELETE
var DELETE_USER = "\nDELETE FROM users WHERE user_id = $1 AND user_ref_admin = $2\nRETURNING \n        user_id AS id\n";
var findRoles = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pgAll(FIND_ROLES, values);
};
var findUsers = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pgAll(FIND_USERS, values);
};
var findOrg = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pgAll(FIND_ORGS, values);
};
var createUser = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(CREATE_USER, values);
};
var userRefOrg = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(ORG_REF_USER, values);
};
var updateUserRole = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(UPDATE_USER_ROLE, values);
};
var deleteUser = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(DELETE_USER, values);
};
exports.default = {
    findRoles: findRoles,
    findUsers: findUsers,
    findOrg: findOrg,
    createUser: createUser,
    userRefOrg: userRefOrg,
    updateUserRole: updateUserRole,
    deleteUser: deleteUser,
};

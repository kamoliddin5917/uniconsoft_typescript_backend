"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("../../utils/pg"));
// POST
var CREATE_PROJECT = "\nINSERT INTO projects (project_name, project_org, project_leader) VALUES ($1, $2, $3)\nRETURNING \n        project_id AS id,\n        project_name AS name,\n        project_leader AS created_by,\n        project_org AS org_id,\n        project_date AS created_at\n";
// PUT
var UPDATE_PROJECT = "\nUPDATE projects SET \n                project_name = $1 \nWHERE\n        project_id = $2 AND project_leader = $3\nRETURNING \n        project_id AS id,\n        project_name AS name,\n        project_leader AS created_by,\n        project_org AS org_id,\n        project_date AS created_at\n";
// DELETE
var DELETE_PROJECT = "\nDELETE FROM projects WHERE project_id = $1 AND project_leader = $2\nRETURNING \n        project_id AS id\n";
var createProject = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(CREATE_PROJECT, values);
};
var updateProject = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(UPDATE_PROJECT, values);
};
var deleteProject = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(DELETE_PROJECT, values);
};
exports.default = { createProject: createProject, updateProject: updateProject, deleteProject: deleteProject };

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("../../utils/pg"));
// GET
var FIND_PROJECTS = "\nSELECT \n        p.project_id AS id,\n        p.project_name AS name,\n        p.project_org AS org_id,\n        p.project_date AS created_at\nFROM tasks AS t INNER JOIN projects AS p\nON t.task_project = p.project_id\nWHERE t.task_worker = $1 AND p.project_status = true\n";
var FIND_TASKS = "\nSELECT \n        task_id AS id,\n        task_name AS name,\n        task_time AS due_date,\n        task_worker AS worker_user_id,\n        task_status_prosses AS status,\n        task_project AS project_id,\n        task_leader AS created_by,\n        task_date AS created_at,\n        task_prosses_date AS prosses_at,\n        task_done_date AS done_at\nFROM tasks\nWHERE task_worker = $1 AND task_status = true\n";
// PUT
var UPDATE_TASK_START = "\nUPDATE tasks SET \n                task_status_prosses = 'IN_PROCESS',\n                task_prosses_date = current_timestamp\nWHERE\n        task_id = $1 AND task_worker = $2\nRETURNING \n        task_id AS id,\n        task_name AS name,\n        task_time AS due_date,\n        task_worker AS worker_user_id,\n        task_status_prosses AS status,\n        task_project AS project_id,\n        task_leader AS created_by,\n        task_date AS created_at,\n        task_prosses_date AS prosses_at,\n        task_done_date AS done_at\n";
var UPDATE_TASK_END = "\nUPDATE tasks SET \n                task_status_prosses = 'DONE',\n                task_done_date = current_timestamp\nWHERE\n        task_id = $1 AND task_worker = $2\nRETURNING \n        task_id AS id,\n        task_name AS name,\n        task_time AS due_date,\n        task_worker AS worker_user_id,\n        task_status_prosses AS status,\n        task_project AS project_id,\n        task_leader AS created_by,\n        task_date AS created_at,\n        task_prosses_date AS prosses_at,\n        task_done_date AS done_at\n";
var findProjects = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pgAll(FIND_PROJECTS, values);
};
var findTaks = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pgAll(FIND_TASKS, values);
};
var updateTaksStart = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(UPDATE_TASK_START, values);
};
var updateTaksEnd = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(UPDATE_TASK_END, values);
};
exports.default = { findProjects: findProjects, findTaks: findTaks, updateTaksStart: updateTaksStart, updateTaksEnd: updateTaksEnd };

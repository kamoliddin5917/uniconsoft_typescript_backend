"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("../../utils/pg"));
// POST
var CREATE_TASK = "\nINSERT INTO tasks (task_name, task_time, task_project, task_worker, task_leader) VALUES ($1, $2, $3, $4, $5)\nRETURNING \n        task_id AS id,\n        task_name AS name,\n        task_time AS due_date,\n        task_worker AS worker_user_id,\n        task_status_prosses AS status,\n        task_project AS project_id,\n        task_leader AS created_by,\n        task_date AS created_at,\n        task_prosses_date AS prosses_at,\n        task_done_date AS done_at\n";
// PUT
var UPDATE_TASK = "\nUPDATE tasks SET \n                task_name = $1,\n                task_time = $2,\n                task_project = $3,\n                task_worker = $4\nWHERE\n        task_id = $5 AND task_leader = $6\nRETURNING \n        task_id AS id,\n        task_name AS name,\n        task_time AS due_date,\n        task_worker AS worker_user_id,\n        task_status_prosses AS status,\n        task_project AS project_id,\n        task_leader AS created_by,\n        task_date AS created_at,\n        task_prosses_date AS prosses_at,\n        task_done_date AS done_at\n";
// DELETE
var DELETE_TASK = "\nDELETE FROM tasks WHERE task_id = $1 AND task_leader = $2\nRETURNING \n        task_id AS id\n";
var createTask = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(CREATE_TASK, values);
};
var updateTaks = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(UPDATE_TASK, values);
};
var deleteTask = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(DELETE_TASK, values);
};
exports.default = { createTask: createTask, updateTaks: updateTaks, deleteTask: deleteTask };

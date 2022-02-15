"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("../../utils/pg"));
// GET
var FIND_PROJECTS = "\nSELECT\n        project_id AS id,\n        project_name AS name,\n        project_leader AS created_by,\n        project_org AS org_id,\n        project_date AS created_at\nFROM projects\nWHERE project_leader = $1\n";
var FIND_TASKS = "\nSELECT\n        task_id AS id,\n        task_name AS name,\n        task_time AS due_date,\n        task_worker AS worker_user_id,\n        task_status_prosses AS status,\n        task_project AS project_id,\n        task_leader AS created_by,\n        task_date AS created_at,\n        task_prosses_date AS prosses_at,\n        task_done_date AS done_at\nFROM tasks\nWHERE task_leader = $1\n";
var FIND_WORKERS = "\nSELECT \n        u.user_id AS id,\n        u.user_name AS name,\n        u.user_username AS username,\n        u.user_ref_admin AS created_by,\n        u.user_date AS created_at\nFROM org_users AS ol INNER JOIN org_users AS ow \n        ON ol.org_id = ow.org_id\n                INNER JOIN users AS u\n        ON ow.user_id = u.user_id\n                INNER JOIN roles AS r \n        ON  u.user_role = r.role_id\n                WHERE ol.user_id = $1 AND r.role_name = 'worker'\nGROUP BY u.user_id\n";
var FIND_ORGSS = "\nSELECT \n        o.org_id AS id,\n        o.org_name AS name,\n        o.org_date AS date\nFROM org_users AS ou INNER JOIN organizations AS o \n        ON ou.org_id = o.org_id\n                WHERE ou.user_id = $1 AND o.org_status = true\n";
// PUT
var UPDATE_TASK = "\nUPDATE tasks SET \n                task_status_prosses = $1\nWHERE\n        task_id = $2 AND task_worker = $3\nRETURNING \n        task_id AS id,\n        task_name AS name,\n        task_time AS due_date,\n        task_worker AS worker_user_id,\n        task_status_prosses AS status,\n        task_project AS project_id,\n        task_leader AS created_by,\n        task_date AS created_at,\n        task_prosses_date AS prosses_at,\n        task_done_date AS done_at\n";
var findProjects = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pgAll(FIND_PROJECTS, values);
};
var findTasks = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pgAll(FIND_TASKS, values);
};
var findWorkers = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pgAll(FIND_WORKERS, values);
};
var findOrg = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pgAll(FIND_ORGSS, values);
};
var updateTaks = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(UPDATE_TASK, values);
};
exports.default = { findProjects: findProjects, findTasks: findTasks, findWorkers: findWorkers, findOrg: findOrg, updateTaks: updateTaks };

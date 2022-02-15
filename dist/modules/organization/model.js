"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("../../utils/pg"));
// POST
var CREATE_ORG = "\nINSERT INTO organizations (org_name, org_admin) VALUES ($1, $2)\nRETURNING \n        org_id AS id,\n        org_name AS name,\n        org_admin AS created_by,\n        org_date AS created_at,\n        org_status AS status\n";
// PUT
var UPDATE_ORG = "\nUPDATE organizations SET \n                        org_name = $1 \nWHERE\n        org_id = $2 AND org_admin = $3\nRETURNING \n        org_id AS id,\n        org_name AS name,\n        org_admin AS created_by,\n        org_date AS created_at,\n        org_status AS status\n";
// DELETE
var DELETE_ORG = "\nDELETE FROM organizations WHERE org_id = $1 AND org_admin = $2\nRETURNING \n        org_id AS id\n";
var createOrg = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(CREATE_ORG, values);
};
var updateOrg = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(UPDATE_ORG, values);
};
var deleteOrg = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(DELETE_ORG, values);
};
exports.default = { createOrg: createOrg, updateOrg: updateOrg, deleteOrg: deleteOrg };

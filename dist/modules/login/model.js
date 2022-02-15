"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = __importDefault(require("../../utils/pg"));
var FIND_USER = "\nSELECT\n    u.user_id AS id,\n    u.user_password AS password,\n    u.user_name AS name,\n    u.user_username AS username,\n    u.user_ref_admin AS created_by,\n    u.user_date AS created_at,\n    r.role_name AS role,\n    r.role_id\n\nFROM roles AS r INNER JOIN users AS u \n    ON r.role_id = u.user_role\nWHERE u.user_username = $1\n";
var findUser = function () {
    var values = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        values[_i] = arguments[_i];
    }
    return pg_1.default.pg(FIND_USER, values);
};
exports.default = { findUser: findUser };

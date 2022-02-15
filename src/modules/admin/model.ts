import pg from "../../utils/pg";

// GET
const FIND_ROLES = `
SELECT 
        role_id AS id,
        role_name AS name
FROM roles
WHERE role_name != 'admin' AND role_status = true
`;
const FIND_USERS = `
SELECT 
        user_id AS id,
        user_name AS name,
        user_username AS username,
        user_ref_admin AS created_by,
        user_date AS created_at,
        user_status AS status
FROM users
WHERE user_ref_admin = $1 
`;
const FIND_ORGS = `
SELECT 
        org_id AS id,
        org_name AS name,
        org_admin AS created_by,
        org_date AS created_at,
        org_status AS status
FROM organizations
WHERE org_admin = $1 
`;
// POST
const CREATE_USER = `
INSERT INTO users (user_name, user_username, user_password, user_role, user_ref_admin) VALUES ($1, $2, $3, $4, $5)
RETURNING 
        user_id AS id,
        user_name AS name,
        user_username AS username,
        user_ref_admin AS created_by,
        user_date AS created_at
`;
const ORG_REF_USER = `
INSERT INTO org_users (org_id, user_id) VALUES ($1, $2)
RETURNING 
        org_user_id AS id
`;
const UPDATE_USER_ROLE = `
UPDATE users SET
                user_role = $1
WHERE user_id = $2 AND user_ref_admin = $3
RETURNING 
        user_id AS id,
        user_name AS name,
        user_username AS username,
        user_ref_admin AS created_by,
        user_date AS created_at
`;
// DELETE
const DELETE_USER = `
DELETE FROM users WHERE user_id = $1 AND user_ref_admin = $2
RETURNING 
        user_id AS id
`;

const findRoles = (...values: any) => pg.pgAll(FIND_ROLES, values);
const findUsers = (...values: any) => pg.pgAll(FIND_USERS, values);
const findOrg = (...values: any) => pg.pgAll(FIND_ORGS, values);
const createUser = (...values: any) => pg.pg(CREATE_USER, values);
const userRefOrg = (...values: any) => pg.pg(ORG_REF_USER, values);
const updateUserRole = (...values: any) => pg.pg(UPDATE_USER_ROLE, values);
const deleteUser = (...values: any) => pg.pg(DELETE_USER, values);

export default {
  findRoles,
  findUsers,
  findOrg,
  createUser,
  userRefOrg,
  updateUserRole,
  deleteUser,
};

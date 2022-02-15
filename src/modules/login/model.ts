import pg from "../../utils/pg";

const FIND_USER = `
SELECT
    u.user_id AS id,
    u.user_password AS password,
    u.user_name AS name,
    u.user_username AS username,
    u.user_ref_admin AS created_by,
    u.user_date AS created_at,
    r.role_name AS role,
    r.role_id

FROM roles AS r INNER JOIN users AS u 
    ON r.role_id = u.user_role
WHERE u.user_username = $1
`;

const findUser = (...values: any) => pg.pg(FIND_USER, values);

export default { findUser };

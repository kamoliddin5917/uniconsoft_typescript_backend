import pg from "../../utils/pg";

// POST
const CREATE_ORG = `
INSERT INTO organizations (org_name, org_admin) VALUES ($1, $2)
RETURNING 
        org_id AS id,
        org_name AS name,
        org_admin AS created_by,
        org_date AS created_at,
        org_status AS status
`;
// PUT
const UPDATE_ORG = `
UPDATE organizations SET 
                        org_name = $1 
WHERE
        org_id = $2 AND org_admin = $3
RETURNING 
        org_id AS id,
        org_name AS name,
        org_admin AS created_by,
        org_date AS created_at,
        org_status AS status
`;
// DELETE
const DELETE_ORG = `
DELETE FROM organizations WHERE org_id = $1 AND org_admin = $2
RETURNING 
        org_id AS id
`;

const createOrg = (...values: any) => pg.pg(CREATE_ORG, values);
const updateOrg = (...values: any) => pg.pg(UPDATE_ORG, values);
const deleteOrg = (...values: any) => pg.pg(DELETE_ORG, values);

export default { createOrg, updateOrg, deleteOrg };

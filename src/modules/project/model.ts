import pg from "../../utils/pg";

// POST
const CREATE_PROJECT = `
INSERT INTO projects (project_name, project_org, project_leader) VALUES ($1, $2, $3)
RETURNING 
        project_id AS id,
        project_name AS name,
        project_leader AS created_by,
        project_org AS org_id,
        project_date AS created_at
`;
// PUT
const UPDATE_PROJECT = `
UPDATE projects SET 
                project_name = $1 
WHERE
        project_id = $2 AND project_leader = $3
RETURNING 
        project_id AS id,
        project_name AS name,
        project_leader AS created_by,
        project_org AS org_id,
        project_date AS created_at
`;
// DELETE
const DELETE_PROJECT = `
DELETE FROM projects WHERE project_id = $1 AND project_leader = $2
RETURNING 
        project_id AS id
`;

const createProject = (...values: any) => pg.pg(CREATE_PROJECT, values);
const updateProject = (...values: any) => pg.pg(UPDATE_PROJECT, values);
const deleteProject = (...values: any) => pg.pg(DELETE_PROJECT, values);

export default { createProject, updateProject, deleteProject };

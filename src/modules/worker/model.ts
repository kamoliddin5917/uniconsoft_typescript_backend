import pg from "../../utils/pg";

// GET
const FIND_PROJECTS = `
SELECT 
        p.project_id AS id,
        p.project_name AS name,
        p.project_org AS org_id,
        p.project_date AS created_at
FROM tasks AS t INNER JOIN projects AS p
ON t.task_project = p.project_id
WHERE t.task_worker = $1 AND p.project_status = true
`;
const FIND_TASKS = `
SELECT 
        task_id AS id,
        task_name AS name,
        task_time AS due_date,
        task_worker AS worker_user_id,
        task_status_prosses AS status,
        task_project AS project_id,
        task_leader AS created_by,
        task_date AS created_at,
        task_prosses_date AS prosses_at,
        task_done_date AS done_at
FROM tasks
WHERE task_worker = $1 AND task_status = true
`;
// PUT
const UPDATE_TASK_START = `
UPDATE tasks SET 
                task_status_prosses = 'IN_PROCESS',
                task_prosses_date = current_timestamp
WHERE
        task_id = $1 AND task_worker = $2
RETURNING 
        task_id AS id,
        task_name AS name,
        task_time AS due_date,
        task_worker AS worker_user_id,
        task_status_prosses AS status,
        task_project AS project_id,
        task_leader AS created_by,
        task_date AS created_at,
        task_prosses_date AS prosses_at,
        task_done_date AS done_at
`;
const UPDATE_TASK_END = `
UPDATE tasks SET 
                task_status_prosses = 'DONE',
                task_done_date = current_timestamp
WHERE
        task_id = $1 AND task_worker = $2
RETURNING 
        task_id AS id,
        task_name AS name,
        task_time AS due_date,
        task_worker AS worker_user_id,
        task_status_prosses AS status,
        task_project AS project_id,
        task_leader AS created_by,
        task_date AS created_at,
        task_prosses_date AS prosses_at,
        task_done_date AS done_at
`;

const findProjects = (...values: any) => pg.pgAll(FIND_PROJECTS, values);
const findTaks = (...values: any) => pg.pgAll(FIND_TASKS, values);
const updateTaksStart = (...values: any) => pg.pg(UPDATE_TASK_START, values);
const updateTaksEnd = (...values: any) => pg.pg(UPDATE_TASK_END, values);

export default { findProjects, findTaks, updateTaksStart, updateTaksEnd };

import pg from "../../utils/pg";

// POST
const CREATE_TASK = `
INSERT INTO tasks (task_name, task_time, task_project, task_worker, task_leader) VALUES ($1, $2, $3, $4, $5)
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
// PUT
const UPDATE_TASK = `
UPDATE tasks SET 
                task_name = $1,
                task_time = $2,
                task_project = $3,
                task_worker = $4
WHERE
        task_id = $5 AND task_leader = $6
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
// DELETE
const DELETE_TASK = `
DELETE FROM tasks WHERE task_id = $1 AND task_leader = $2
RETURNING 
        task_id AS id
`;

const createTask = (...values: any) => pg.pg(CREATE_TASK, values);
const updateTaks = (...values: any) => pg.pg(UPDATE_TASK, values);
const deleteTask = (...values: any) => pg.pg(DELETE_TASK, values);

export default { createTask, updateTaks, deleteTask };

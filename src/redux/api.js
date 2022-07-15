import axios from 'axios';

const authAxios = axios.create({
	baseURL: 'https://stage.api.sloovi.com'
});

authAxios.interceptors.request.use((req) => {
	req.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTY0MzIyOTgsIm5iZiI6MTY1NjQzMjI5OCwianRpIjoiNjExZmNlMmQtMzE3Yi00NzgyLThiYjQtMzU1ODI5MDMxMDNhIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.Q16QVDsLX2AD2znCDWL9v8xql2YE0CCtU53pN4b4X78`;
	return req;
});
//
// create task
export const createTask = (taskData) =>
	authAxios.post(
		'/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=company_413ef22b6237417fb1fba7917f0f69e7',
		taskData
	);
//
//
//get all tasks
export const getTasks = () =>
	authAxios.get('/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=company_413ef22b6237417fb1fba7917f0f69e7');

//
//get single tasks

export const getTask = (id) =>
	authAxios.get(
		`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`
	);
//
//delete a task
export const deleteTask = (id) =>
	authAxios.delete(
		`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`
	);

//
//udate a task
export const updateTask = (updatedTaskData, id) =>
	authAxios.put(
		`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`,
		updatedTaskData
	);

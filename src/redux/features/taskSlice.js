import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from '../api';

export const createTask = createAsyncThunk('task/createTask', async (taskData) => {
	try {
		const response = await api.createTask(taskData);
		return response.data.results;
	} catch (error) {}
});

export const getTasks = createAsyncThunk('task/getTasks', async () => {
	try {
		const response = await api.getTasks();
		return response.data.results;
	} catch (error) {}
});

export const deleteTask = createAsyncThunk('task/deleteTask', async (id) => {
	try {
		const response = await api.deleteTask(id);
		return response.data.results;
	} catch (error) {}
});

export const updateTask = createAsyncThunk('task/updateTask', async ({ updatedTaskData, id }) => {
	try {
		const response = await api.updateTask(updatedTaskData, id);
		return response.data.results;
	} catch (error) {}
});
export const getTask = createAsyncThunk('task/getTask', async (id) => {
	try {
		const response = await api.getTask(id);
		return response.data.results;
	} catch (error) {}
});

const taskSlice = createSlice({
	name: 'task',
	initialState: {
		_task: {},
		_tasks: [],
		isLoading: true,
		error: ''
	},

	extraReducers: {
		// create task reducer
		[createTask.pending]: (state, action) => {
			state.loading = true;
		},
		[createTask.fulfilled]: (state, action) => {
			state.loading = false;
			state.tasks = action.payload;
			if (action.payload) {
				alert('task created successfully');
				window.location = '/';
			}
		},
		[createTask.rejected]: (state, action) => {
			state.loading = false;
			state.error = action.payload.message;
		},
		//get all task reducer
		[getTasks.pending]: (state, action) => {
			state.isLoading = true;
		},
		[getTasks.fulfilled]: (state, action) => {
			state.isLoading = false;
			state._tasks = action.payload;
		},
		[getTasks.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload.message;
		},
		//delete a task reducer
		[deleteTask.pending]: (state, action) => {
			state.isLoading = true;
		},
		[deleteTask.fulfilled]: (state, action) => {
			state.isLoading = false;

			window.location = '/';
		},
		[deleteTask.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload.message;
		},
		//update a task reducer
		[updateTask.pending]: (state, action) => {
			state.isLoading = true;
		},
		[updateTask.fulfilled]: (state, action) => {
			state.isLoading = false;
			state._task = action.payload;
		},
		[updateTask.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload.message;
		},
		//get a single task reducer
		[getTask.pending]: (state, action) => {
			state.isLoading = true;
		},
		[getTask.fulfilled]: (state, action) => {
			state.isLoading = false;
			state._task = action.payload;
		},
		[getTask.rejected]: (state, action) => {
			state.isLoading = false;
			state.error = action.payload.message;
		}
	}
});

export default taskSlice.reducer;

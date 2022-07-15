import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../features/taskSlice';

export default configureStore({
	reducer: {
		task: taskReducer
	}
});

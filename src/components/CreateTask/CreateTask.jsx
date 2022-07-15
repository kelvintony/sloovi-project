import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTask } from '../../redux/features/taskSlice';

const CreateTask = () => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const [ error, setError ] = useState(false);

	const [ isLoading, setisLoading ] = useState(false);

	const [ formData, setFromData ] = useState({
		taskMessage: '',
		taskDate: '',
		taskTime: '',
		assignUser: 'Saravanan C',
		isTaskCompleted: false,
		taskTimeZone: new Date().getTimezoneOffset() * -60
	});

	const delegateUsers = [ 'Saravanan C', 'Sundar Pichai' ];

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		const checked = e.target.checked;
		const type = e.target.type;

		setFromData((state) => ({
			...state,
			[name]: type === 'checkbox' ? checked : value
		}));
	};

	// Convert Time To Seconds
	const convertTimeToSeconds = (time) => {
		//CONVERTING TIME TO SECONDS
		// let hms = '02:30';   this is the format the time is meant to be
		let hms = time;

		let a = hms.split(':'); // split it at the colons

		// minutes are worth 60 seconds. Hours are worth 60 minutes.
		let seconds = +a[0] * 60 * 60 + +a[1] * 60;

		return seconds;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { taskMessage, taskDate, taskTime, assignUser, taskTimeZone } = formData;

		if (taskMessage.length === 0 || taskDate.length === 0 || taskTime.length === 0 || assignUser.length === 0) {
			setError(true);
		}

		if (taskMessage && taskDate && taskTime && assignUser) {
			const formDataInput = {
				assigned_user: assignUser,
				task_date: taskDate,
				task_time: convertTimeToSeconds(taskTime),
				is_completed: 0,
				time_zone: taskTimeZone,
				task_msg: taskMessage
			};

			dispatch(createTask(formDataInput));

			setisLoading(true);
		}
	};

	return (
		<div className='container-createPost'>
			<h1>Create Task</h1>

			<form className='form-container' onSubmit={handleSubmit}>
				<label>
					Task Message: <br />
					<input
						className='input-box'
						type='text'
						name='taskMessage'
						value={formData.taskMessage}
						onChange={handleChange}
					/>
				</label>
				<br />
				{error && formData.taskMessage.length <= 0 ? (
					<label className='validation'>test message can't be empty</label>
				) : (
					''
				)}

				<br />
				<label>
					Select Date: <br />
					<input
						className='input-box'
						type='date'
						name='taskDate'
						value={formData.taskDate}
						onChange={handleChange}
					/>
				</label>
				<br />
				{error && formData.taskDate.length <= 0 ? (
					<label className='validation'>date can't be empty</label>
				) : (
					''
				)}
				<br />
				<label>
					Select Time: <br />
					<input
						className='input-box'
						type='time'
						name='taskTime'
						value={formData.taskTime}
						onChange={handleChange}
					/>
				</label>
				<br />
				{error && formData.taskTime.length <= 0 ? (
					<label className='validation'>time can't be empty</label>
				) : (
					''
				)}
				<br />
				<label>
					Assign a user: <br />
					<select className='input-box' name='assignUser' value={formData.assignUser} onChange={handleChange}>
						{delegateUsers.map((user, i) => (
							<option key={i} value={user}>
								{user}
							</option>
						))}
					</select>
				</label>
				<br />
				{error && formData.assignUser.length <= 0 ? (
					<label className='validation'>user can't be empty</label>
				) : (
					''
				)}
				<button className='btn-submitTask' type='submit' disabled={isLoading}>
					{isLoading && <i className='fa fa-refresh fa-spin' />}  Submit
				</button>
			</form>

			<button
				className='btn-goToDashboard'
				onClick={() => {
					navigate('/');
				}}
			>
				Go to Dashboard
			</button>
		</div>
	);
};

export default CreateTask;

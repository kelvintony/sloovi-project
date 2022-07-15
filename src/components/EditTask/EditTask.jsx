import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditTask = () => {
	const [ loading, setLoading ] = useState(true);
	const [ error, setError ] = useState(false);

	//icon load
	const [ isLoading, setisLoading ] = useState(false);

	const { taskId } = useParams();
	const apiUrl = 'https://stage.api.sloovi.com';

	const authAxios = axios.create({
		baseURL: apiUrl,
		headers: {
			Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTU5OTM0NjUsIm5iZiI6MTY1NTk5MzQ2NSwianRpIjoiOTBmZTM2ZDQtZDFjNC00NTIyLTk5YjItY2E4YmFkYjYwYWE4IiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.q7RuU2-qdqJsM62XDwUSYfjW5ZZHl-P0Rw7zby1VnYY`
		}
	});

	const navigate = useNavigate();
	const [ formData, setFromData ] = useState({
		taskMessage: '',
		taskDate: '',
		taskTime: '',
		assignUser: '',
		isTaskCompleted: false,
		taskTimeZone: new Date().getTimezoneOffset() * -60
	});

	useEffect(() => {
		const getTasks = async () => {
			setLoading(true);
			await authAxios
				.get(
					`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskId}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`
				)
				.then((res) => {
					setFromData({
						...formData,
						taskMessage: res.data.results.task_msg,
						taskDate: res.data.results.task_date,
						taskTime: toHHMMSS(res.data.results.task_time),
						assignUser: res.data.results.assigned_user
					});

					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		};

		getTasks();
	}, []);

	console.log(taskId);
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

	const toHHMMSS = (secs) => {
		var sec_num = parseInt(secs, 10);
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor(sec_num / 60) % 60;
		// var seconds = sec_num % 60

		return [ hours, minutes ].map((v) => (v < 10 ? '0' + v : v)).filter((v, i) => v !== '00' || i > 0).join(':');
	};

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
			setisLoading(true);

			await authAxios
				.put(
					`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${taskId}?company_id=company_413ef22b6237417fb1fba7917f0f69e7`,
					{
						assigned_user: assignUser,
						task_date: taskDate,
						task_time: convertTimeToSeconds(taskTime),
						is_completed: 0,
						time_zone: taskTimeZone,
						task_msg: taskMessage
					}
				)
				.then(function(response) {
					if (response.data.code === 202) {
						alert('Updated succefully');
						navigate('/');
					}
				})
				.catch(function(error) {
					console.log(error);
				});
		}
	};

	return (
		<div className='container-createPost'>
			{loading && <h3>loading...</h3>}

			{!loading && (
				<form className='form-container' onSubmit={handleSubmit}>
					<h1>Edit Task</h1>

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
					<br />
					{error && formData.taskTime.length <= 0 ? (
						<label className='validation'>time can't be empty</label>
					) : (
						''
					)}
					<br />
					<label>
						Assign a user: <br />
						<select
							className='input-box'
							name='assignUser'
							value={formData.assignUser}
							onChange={handleChange}
						>
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
						{isLoading && <i className='fa fa-refresh fa-spin' />}
						Update
					</button>
					<button
						className='btn-goToDashboard'
						onClick={() => {
							navigate('/');
						}}
					>
						Go to Dashboard
					</button>
				</form>
			)}
		</div>
	);
};

export default EditTask;

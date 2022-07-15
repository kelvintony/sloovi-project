import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTask } from '../../redux/features/taskSlice';
import { useDispatch, useSelector } from 'react-redux';

const DetailedTask = () => {
	const { _task, isLoading } = useSelector((state) => state.task);

	const dispatch = useDispatch();

	const { taskId } = useParams();

	const navigate = useNavigate();

	useEffect(
		() => {
			if (taskId) {
				dispatch(getTask(taskId));
			}
		},
		[ taskId ]
	);

	const delegateUsers = [ 'Saravanan C', 'Sundar Pichai' ];

	const toHHMMSS = (secs) => {
		var sec_num = parseInt(secs, 10);
		var hours = Math.floor(sec_num / 3600);
		var minutes = Math.floor(sec_num / 60) % 60;

		return [ hours, minutes ].map((v) => (v < 10 ? '0' + v : v)).filter((v, i) => v !== '00' || i > 0).join(':');
	};

	return (
		<div className='container-createPost'>
			{isLoading && <h3>loading...</h3>}

			{!isLoading && (
				<form className='form-container'>
					<label>
						Task Message: <br />
						<input className='input-box' type='text' name='taskMessage' value={_task.task_msg} />
					</label>
					<br />
					<label>
						Select Date: <br />
						<input className='input-box' type='date' name='taskDate' value={_task.task_date} />
					</label>
					<br />
					<label>
						Select Time: <br />
						<input className='input-box' type='time' name='taskTime' value={toHHMMSS(_task.task_time)} />
					</label>
					<br />
					<label>
						Assign a user: <br />
						<select className='input-box' name='assignUser' value={_task.assigned_user}>
							{delegateUsers.map((user, i) => (
								<option key={i} value={user}>
									{user}
								</option>
							))}
						</select>
					</label>
					<br />

					<button
						className='btn-submitTask'
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

export default DetailedTask;

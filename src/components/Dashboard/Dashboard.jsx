import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getTasks,deleteTask } from '../../redux/features/taskSlice';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
	const { _tasks, isLoading } = useSelector((state) => state.task);
	const dispatch = useDispatch();

	//
	const navigate = useNavigate();
	
	useEffect(() => {
		dispatch(getTasks());
	}, []);

 
	const onDelete = async (id) => {

		dispatch(deleteTask(id));
	};

	const handleClick = () => {
		navigate('/createpost');
	};

	return (
		<div className='dashboard-container'>
			<div className='task-header'>
				<button className='btn-login' onClick={handleClick}>
					Create A Task
				</button>

				{/* <h5>Total Task: {_tasks?.length}</h5> */}
				<h5>Total Task: {_tasks?.length==0?'You do not have any task':_tasks?.length}</h5>
			</div>

			<div className='task-container'>
				{isLoading && <h3>loading...</h3>}
				

				{!isLoading &&
					_tasks?.map((task, key) => {
						return (
							<div className='box' key={task.id}>
								<img src='https://img.icons8.com/ios-filled/50/000000/user-male-circle.png' />
								<h5>{task?.task_msg}</h5>
								<p className='task-message'>{task?.task_date}</p>

								<button
									className='btn-delete'
									onClick={() => {
										if (window.confirm('Are you sure you wish to delete this item?'))
											onDelete(task.id);
									}}
								>
									Delete
								</button>
								<Link to={`/task/edit/${task?.id}`}>
									<button className='btn-edit'>Edit</button>
								</Link>

								<Link to={`/task/details/${task?.id}`}>
									<button className='btn-view'>View</button>
								</Link>
							</div>
						);
					})}


			</div>
		</div>
	);
};

export default Dashboard;

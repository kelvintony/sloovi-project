import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import CreateTask from './components/CreateTask/CreateTask';
import EditTask from './components/EditTask/EditTask';
import DetailedTask from './components/DetailedTask/DetailedTask';
import Header from './components/Header/Header';

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route exact path='/' element={<Dashboard />} />
					<Route exact path='/createpost' element={<CreateTask />} />
					<Route exact path='/task/edit/:taskId' element={<EditTask />} />
					<Route exact path='/task/details/:taskId' element={<DetailedTask />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;

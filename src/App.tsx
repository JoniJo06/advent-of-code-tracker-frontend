/** @format */

import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { MenuBar } from './Components';
import { BasicTracker, HomePage, PersonalTrackerList, CreatePersonalTracker, LoginPage, SignupPage } from './Pages';
import { Wrapper } from './App.styles';
import { userType } from './types';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

type RedirectProps = {
	location: string;
};

export const Redirect: React.FC<RedirectProps> = ({ location }) => {
	const navigate = useNavigate();
	useEffect(() => {
		navigate('/' + location);
	}, [location, navigate]);
	return <></>;
};

const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021];

const App = () => {
	const location = useLocation();
	const [user, setUser] = useState<userType | null>(null);
	// if the local storage entry yearInfo doesn't exist create a new one
	// this is only relevant for the basic tracker
	useEffect(() => {
		if (!localStorage.getItem('yearsInfo')) {
			const yearsInfo = {};
			YEARS.forEach((el) => {
				//@ts-ignore
				yearsInfo[el] = [];
				for (let i = 1; i <= 25; i++) {
					//@ts-ignore
					yearsInfo[el].push(false);
				}
			});
			localStorage.setItem('yearsInfo', JSON.stringify(yearsInfo));
		}

		if (localStorage.getItem('jwt_token')) {
			axios
				.get(process.env.REACT_APP_BACKEND_URI + '/users/user', {
					headers: {
						jwt_token: localStorage.getItem('jwt_token') || '',
					},
				})
				.then((res) => {
					console.log(res.data);
				})
				.catch((err) => {
					const error = err.response;
					if (error && (error.status === 401 || error.status === 500)) {
						localStorage.removeItem('jwt_token');
					}
				});
		}
	}, [location]);

	return (
		<Wrapper>
			<MenuBar user={user}>
				<Routes>
					<Route path='/home' element={<HomePage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/signup' element={<SignupPage />} />
					<Route path='/tracker/basic' element={<BasicTracker />} />

					<Route path='/tracker/create-personal' element={<CreatePersonalTracker />} />
					<Route path='/tracker/personal' element={<PersonalTrackerList />} />
					<Route path='/*' element={<Redirect location='home' />} />
				</Routes>
			</MenuBar>
		</Wrapper>
	);
};

export default App;

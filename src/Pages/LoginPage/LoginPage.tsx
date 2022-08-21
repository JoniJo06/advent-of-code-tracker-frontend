/** @format */

import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from './LoginPage.styles';
import { Label } from '@mui/icons-material';
import axios from 'axios';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';

type LoginFormData = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const [formData, setFormData] = useState<LoginFormData>({
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.email || !formData.password) {
			toast.error('Please fill all fields to log in', {
				autoClose: 2000,
			});
			return;
		}
		await axios
			.post(process.env.REACT_APP_BACKEND_URI + '/users/login', {
				email: formData.email,
				password: formData.password,
			})
			.then((res) => {
				localStorage.setItem('jwt_token', res.data.token);
				navigate('/home');
			})
			.catch((err) => {
				toast.error(err.response.data.error, {
					autoClose: 2000,
				});
			});
	};

	const handleChange = (e: any) => {
		setFormData((prev) => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	};

	return (
		<Wrapper>
			<h1>Login Page</h1>
			<Button onClick={() => navigate('/signup')}>SignUp</Button>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='email'>email</label>
					<input value={formData.email} onChange={handleChange} id='email' placeholder='email' type='email' />
					<br />
					<label htmlFor='password'>password</label>
					<input value={formData.password} onChange={handleChange} id='password' placeholder='password' type='password' />
					<br />
					<button type='submit'>submit</button>
				</div>
			</form>
		</Wrapper>
	);
};
export default LoginPage;

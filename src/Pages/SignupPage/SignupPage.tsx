/** @format */

import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from './SingupPage.styles';
import { Button } from '@mui/material';
import { Label } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

type SignUpFormData = {
	username: string;
	email: string;
	password: string;
	retypePassword: string;
};

const SignupPage = () => {
	const [formData, setFormData] = useState<SignUpFormData>({
		username: '',
		email: '',
		password: '',
		retypePassword: '',
	});

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.username || !formData.email || !formData.password || !formData.retypePassword) {
			toast.error('Please fill all fields to sign up', {
				autoClose: 2000,
			});
			return;
		}
		if (formData.password !== formData.retypePassword) {
			alert('passwords must be equal');
			return;
		}
		await axios
			.post(process.env.REACT_APP_BACKEND_URI + '/users', {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			})
			.then((res) => {
				localStorage.setItem('jwt_token', res.data.token);
				navigate('/home');
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleChange = (e: any) => {
		setFormData((prev) => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	};

	return (
		<Wrapper>
			<h1>Signup Page</h1>
			<Button onClick={() => navigate('/login')}>Login</Button>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='username'>username</label>
					<input value={formData.username} onChange={handleChange} id='username' placeholder='username' type='text' />
					<br />
					<label htmlFor='email'>email</label>
					<input value={formData.email} onChange={handleChange} id='email' placeholder='email' type='email' />
					<br />
					<label htmlFor='password'>password</label>
					<input value={formData.password} onChange={handleChange} id='password' placeholder='password' type='password' />
					<br />
					<label htmlFor='retypePassword'>retype-password</label>
					<input value={formData.retypePassword} onChange={handleChange} id='retypePassword' placeholder='retype password' type='password' />
					<br />
					<button type='submit'>submit</button>
				</div>
			</form>
		</Wrapper>
	);
};
export default SignupPage;

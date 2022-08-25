/** @format */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#0f0f23',
			paper: '#0f0f23',
		},
		primary: {
			main: '#277f0b',
		},
		warning: {
			main: '#d2d245',
		},
	},
	typography: {
		fontFamily: '"Source Code Pro", "monospace"',
	},
});

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<App />
				<CssBaseline />
				<ToastContainer limit={3} transition={Slide} />
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

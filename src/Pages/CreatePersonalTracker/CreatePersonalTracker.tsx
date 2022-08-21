/** @format */

import React, { useState } from 'react';
import { Wrapper, Form } from './CreatePersonalTracker.styles';
import { Box, FormControlLabel, FormLabel, Radio, RadioGroup, Slider, Typography } from '@mui/material';
import { SearchSelectBox } from '../../Components';
import { Button } from '@mui/material';

import programmingLanguages from '../../programmingLanguages';

const CreatePersonalTracker = () => {
	const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
	const [selectedYears, setSelectedYears] = useState<string[]>([]);
	const [name, setName] = useState<string>('');
	const [isCustomAmount, setIsCustomAmount] = useState<boolean>(false);
	const [completionsPerDay, setCompletionsPerDay] = useState<string>('one');
	const [customCompletionsPerDay, setCustomCompletionsPerDay] = useState<number>(1);
	const handleClick = () => {
		console.log(selectedLanguages);
	};

	const years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
	};

	const centerStyle = { alignSelf: 'center', width: '80%', mt: '10px' };

	return (
		<Wrapper>
			<Typography variant='h3' align='center'>
				Create Personal Tracker
			</Typography>
			<Form onSubmit={handleSubmit}>
				<Box sx={centerStyle} />
				{/* <NameInput setValue={setName} /> */}
				<SearchSelectBox setValue={setName} values={['one', 'two']} title='Name' />
				<Box sx={centerStyle} />
				<SearchSelectBox multiple setValue={setSelectedLanguages} values={programmingLanguages} title='Programming Languages' />
				<Box sx={centerStyle} />
				<SearchSelectBox multiple setValue={setSelectedYears} values={years} title='Years to finish' />
				<Box sx={centerStyle}>
					<FormLabel>Completions per Day</FormLabel>
					<RadioGroup
						row
						name='completionsPerDay'
						value={completionsPerDay}
						onChange={(e) => {
							setCompletionsPerDay(e.target.value);
						}}>
						<FormControlLabel value='one' control={<Radio />} label='One' />
						<FormControlLabel value='all' control={<Radio />} label='All' />
						<FormControlLabel value='custom' control={<Radio />} label='Custom' />
					</RadioGroup>
				</Box>
				{completionsPerDay !== 'one' && completionsPerDay !== 'all' && (
					<Slider
						sx={centerStyle}
						defaultValue={1}
						value={customCompletionsPerDay}
						onChange={(e) => {
							// @ts-ignore
							setCustomCompletionsPerDay(e.target.value);
						}}
						valueLabelDisplay='auto'
						step={1}
						marks
						min={1}
						max={25}
					/>
				)}
				<Button
					sx={{ alignSelf: 'center', width: '80%', mt: '20px', fontSize: '1.25rem' }}
					size='small'
					variant='contained'
					type='submit'
					onClick={handleClick}>
					Create
				</Button>
			</Form>
		</Wrapper>
	);
};

export default CreatePersonalTracker;

/** @format */

import React, { useState } from 'react';
import { Wrapper, Form } from './CreatePersonalTracker.styles';
import { Box, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Slider, Typography } from '@mui/material';
import { SearchSelectBox } from '../../Components';
import { Button } from '@mui/material';
import { v4 as uuid } from 'uuid';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { personalTrackerType } from '../../types';
import programmingLanguages from '../../programmingLanguages';
import { toast } from 'react-toastify';

const CreatePersonalTracker = () => {
	const [personalTracker, setPersonalTracker] = useState<personalTrackerType>({
		id: 0,
		name: '',
		programmingLanguages: [],
		yearsToFinish: [],
		completionsPerDay: 1,
		languageSelectionRandom: true,
		years: {},
	});

	const setPersonalTrackerName = (name: string) => {
		setPersonalTracker((prev) => {
			return { ...prev, name };
		});
	};

	const setPersonalTrackerprogrammingLanguages = (programmingLanguages: string[]) => {
		setPersonalTracker((prev) => {
			return { ...prev, programmingLanguages };
		});
		// updateProgrammingLanguages();
	};

	const setPersonalTrackerYearsToFinish = (yearsToFinish: string[]) => {
		setPersonalTracker((prev) => {
			return { ...prev, yearsToFinish };
		});
	};

	const handleClick = (e: React.FormEvent) => {
		handleSubmit(e);
	};

	const years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021'];

	const handleSubmit = (e: React.FormEvent) => {
		console.log(personalTracker.programmingLanguages);
		console.log(uuid());
		console.log(personalTracker);
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
				<SearchSelectBox setValue={setPersonalTrackerName} values={['one', 'two']} title='Name' />
				<Box sx={centerStyle} />
				<SearchSelectBox multiple setValue={setPersonalTrackerprogrammingLanguages} values={programmingLanguages} title='Programming Languages' />
				<Box sx={centerStyle} />
				<SearchSelectBox multiple setValue={setPersonalTrackerYearsToFinish} values={years} title='Years to finish' />
				<Box sx={centerStyle}>
					<FormLabel>Completions per Day</FormLabel>
					<RadioGroup
						row
						name='completionsPerDay'
						value={
							personalTracker.completionsPerDay <= 1
								? 'one'
								: personalTracker.completionsPerDay === personalTracker.programmingLanguages.length
								? 'all'
								: 'custom'
						}
						onChange={(e) => {
							const value = e.target.value;
							let amount = 0;
							if (value === 'one') amount = 1;
							else if (value === 'all') amount = personalTracker.programmingLanguages.length;
							else if (value === 'custom' && personalTracker.programmingLanguages.length === 3) amount = 2;
							else amount = personalTracker.programmingLanguages.length;
							setPersonalTracker((prev) => {
								return { ...prev, completionsPerDay: amount };
							});
						}}>
						<FormControlLabel value='one' control={<Radio />} label='One' />
						<FormControlLabel value='all' control={<Radio />} label='All' />
						<FormControlLabel value='custom' control={<Radio />} label='Custom' />
						<IconButton
							onClick={() =>
								toast.info(
									'If you select 1 or 2 languages it is impossible to choose custom. If you select 3 you can choose custom without slide, this means 2 per day is selected. And if you select more than 3 you can easily choose custom.',
									{
										toastId: 'completionsPerDayHelp',
									}
								)
							}>
							<HelpOutlineIcon />
						</IconButton>
					</RadioGroup>
				</Box>
				{!(personalTracker.completionsPerDay <= 1) &&
					personalTracker.completionsPerDay !== personalTracker.programmingLanguages.length &&
					personalTracker.programmingLanguages.length > 3 && (
						<Slider
							sx={centerStyle}
							defaultValue={1}
							value={personalTracker.completionsPerDay}
							onChange={(e) => {
								setPersonalTracker((prev) => {
									// @ts-ignore
									return { ...prev, completionsPerDay: e.target.value };
								});
							}}
							valueLabelDisplay='auto'
							step={1}
							marks
							min={2}
							max={personalTracker.programmingLanguages.length - 1}
						/>
					)}
				<Box sx={centerStyle}>
					<FormLabel>Programming Language Selection</FormLabel>
					<RadioGroup
						row
						name='completionsPerDay'
						value={personalTracker.languageSelectionRandom ? 'random' : 'custom'}
						onChange={(e) => {
							const value = e.target.value === 'random';
							setPersonalTracker((prev) => {
								return { ...prev, languageSelectionRandom: value };
							});
						}}>
						<FormControlLabel value='random' control={<Radio />} label='Random' />
						<FormControlLabel value='custom' control={<Radio />} label='Custom' />
					</RadioGroup>
				</Box>
				{!personalTracker.languageSelectionRandom && <Slider sx={centerStyle}></Slider>}
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

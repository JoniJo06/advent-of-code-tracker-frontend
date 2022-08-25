/** @format */

const YEARS = Object.freeze([2015, 2016, 2017, 2018, 2019, 2020, 2021]);
type dayType = {
	_completed: boolean;
	[key: string]: boolean;
};

type yearType = {
	[key: string]: dayType;
};

type yearsType = {
	[key: string]: yearType;
};

type jsonType = {
	name: string;
	programmingLanguages: string[];
	completionsPerDay: number;
	years: any;
};

const content = (name: string, programmingLanguages: string[], completionsPerDay: number) => {
	const json: jsonType = {
		name: name,
		programmingLanguages: programmingLanguages,
		completionsPerDay: completionsPerDay,
		years: {},
	};
	const years: yearsType = {};
	YEARS.forEach((el) => {
		const year: yearType = {};
		for (let i = 1; i <= 25; i++) {
			const day: dayType = {
				_completed: false,
			};

			programmingLanguages.forEach((el) => {
				day[el] = false;
			});

			year[i] = day;
		}
		years[el] = year;
	});

	json.years = years;
	return json;
};

const generatePersonalTracker = (): jsonType => {
	const name = 'test';
	const programmingLanguages = ['c#', 'python', 'scala', 'java', 'rust', 'typeScript'];
	const completionsPerDay = programmingLanguages.length;

	const json = content(name, programmingLanguages, completionsPerDay);

	return json;
};

export default generatePersonalTracker;
/** @format */

export type userType = {
	username: string;
	email: string;
	admin: boolean;
};

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

export type personalTrackerType = {
	id: number;
	name: string;
	programmingLanguages: string[];
	yearsToFinish: string[];
	completionsPerDay: number;
	languageSelectionRandom: boolean;
	years: yearsType;
};

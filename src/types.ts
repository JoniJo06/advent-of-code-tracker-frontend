/** @format */

export type userType = {
	username: string;
	email: string;
	admin: boolean;
};

export type personalTrackerType = {
	id: number;
	name: string;
	programingLanguages: string[];
	yearsToFinish: string[];
	completionsPerDay: number;
};

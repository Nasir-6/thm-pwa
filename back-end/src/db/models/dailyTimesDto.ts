export type DailyTimesMosqueDto = {
	id: number;
	mosqueId: number;
	mosqueName: string;
	date: Date;
	fajr: Date;
	zuhr: Date;
	asr: Date;
	maghrib: Date;
	isha: Date;
};

export type DailyTimesMosqueDB = {
	id: number;
	mosque_id: number;
	mosque_name: string;
	date: Date;
	fajr: Date;
	zuhr: Date;
	asr: Date;
	maghrib: Date;
	isha: Date;
};

export type DailySalahBeginningTimesDto = {
	id: number;
	date: Date;
	fajr: Date;
	zuhr: Date;
	asr1stMithl: Date;
	asr2ndMithl: Date;
	maghrib: Date;
	isha: Date;
	sunrise: Date;
};

export type DailySalahBeginningTimesDB = {
	id: number;
	date: Date;
	fajr: Date;
	zuhr: Date;
	asr_1st_mithl: Date;
	asr_2nd_mithl: Date;
	maghrib: Date;
	isha: Date;
	sunrise: Date;
};

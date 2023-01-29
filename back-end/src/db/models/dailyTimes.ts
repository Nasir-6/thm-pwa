export type DailyTimesMosqueDTO = {
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
	date: string;
	fajr: string;
	zuhr: string;
	asr: string;
	maghrib: string;
	isha: string;
};

export type DailySalahBeginningTimesDTO = {
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
	date: string;
	fajr: string;
	zuhr: string;
	asr_1st_mithl: string;
	asr_2nd_mithl: string;
	maghrib: string;
	isha: string;
	sunrise: string;
};

export type MosqueTimesDailyDTO = {
	id: number;
	mosqueId: number;
	mosqueName: string;
	date: string;
	fajr: string;
	zuhr: string;
	asr: string;
	maghrib: string;
	isha: string;
};

export type MosqueTimesDailyDB = {
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

export type SalahBeginningTimesDailyDTO = {
	id: number;
	date: string;
	fajr: string;
	zuhr: string;
	asr1stMithl: string;
	asr2ndMithl: string;
	maghrib: string;
	isha: string;
	sunrise: string;
};

export type SalahBeginningTimesDailyDB = {
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

CREATE TABLE mosque_times (
	id serial PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL,
	date DATE NOT NULL,
	fajr TIME NOT NULL,
	zuhr TIME NOT NULL,
	asr TIME NOT NULL,
	maghrib TIME NOT NULL,
	isha TIME NOT NULL
);

DROP TABLE mosque_times;

COPY mosque_times(name, date, fajr, zuhr, asr, maghrib, isha)
FROM '/Users/nasir/thm-pwa/time_converter_scripts/chatGPT-mosques-new-DB-cleaned/Al Aqsa Masjid/Apr-2023.csv'
DELIMITER ',' 
CSV HEADER;
DROP TABLE mosque_times;

CREATE TABLE mosque_times (
	uid VARCHAR ( 50 ) UNIQUE PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL,
	date DATE NOT NULL,
	fajr TIME NOT NULL,
	zuhr TIME NOT NULL,
	asr TIME NOT NULL,
	maghrib TIME NOT NULL,
	isha TIME NOT NULL
);


COPY mosque_times(uid, name, date, fajr, zuhr, asr, maghrib, isha)
FROM '/Users/nasir/thm-pwa/time_converter_scripts/chatGPT-mosques-new-DB-cleaned/all_mosque_combined.csv'
DELIMITER ',' 
CSV HEADER;
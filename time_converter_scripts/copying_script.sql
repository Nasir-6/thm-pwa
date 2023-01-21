DROP TABLE mosque_times;
DROP TABLE mosques;

CREATE TABLE mosques (
	uid VARCHAR UNIQUE PRIMARY KEY,
	name VARCHAR UNIQUE NOT NULL,
	address VARCHAR UNIQUE NOT NULL,
	latitude NUMERIC NOT NULL,
	longitude NUMERIC NOT NULL,
	google_url VARCHAR NOT NULL
);

COPY mosques(uid, name, address, latitude, longitude, google_url)
FROM '/Users/nasir/thm-pwa/time_converter_scripts/mosques_db.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE mosque_times (
	uid VARCHAR UNIQUE PRIMARY KEY,
	mosque_uid VARCHAR REFERENCES mosques(uid),
	name VARCHAR NOT NULL,
	date DATE NOT NULL,
	fajr TIME NOT NULL,
	zuhr TIME NOT NULL,
	asr TIME NOT NULL,
	maghrib TIME NOT NULL,
	isha TIME NOT NULL
);


COPY mosque_times(uid, mosque_uid, name, date, fajr, zuhr, asr, maghrib, isha)
FROM '/Users/nasir/thm-pwa/time_converter_scripts/chatGPT-mosques-new-DB-cleaned/all_mosque_combined.csv'
DELIMITER ','
CSV HEADER;


DROP TABLE postcodes;
CREATE TABLE postcodes (
	postcode VARCHAR UNIQUE PRIMARY KEY,
    latitude NUMERIC NOT NULL,
	longitude NUMERIC NOT NULL
);


COPY postcodes(postcode, latitude, longitude)
FROM '/Users/nasir/thm-pwa/time_converter_scripts/th_postcodes.csv'
DELIMITER ','
CSV HEADER;
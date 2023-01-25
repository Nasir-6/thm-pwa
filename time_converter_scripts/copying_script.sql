DROP TABLE mosque_times;
DROP TABLE mosques;

CREATE TABLE mosques (
	id SERIAL UNIQUE PRIMARY KEY,
	name VARCHAR UNIQUE NOT NULL,
	address VARCHAR UNIQUE NOT NULL,
	latitude NUMERIC NOT NULL,
	longitude NUMERIC NOT NULL,
	google_url VARCHAR NOT NULL
);

COPY mosques(id, name, address, latitude, longitude, google_url)
FROM '/Users/nasir/thm-pwa/time_converter_scripts/mosques_db.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE mosque_times (
	id SERIAL UNIQUE PRIMARY KEY,
	mosque_id INTEGER REFERENCES mosques(id),
	name VARCHAR NOT NULL,
	date DATE NOT NULL,
	fajr TIME NOT NULL,
	zuhr TIME NOT NULL,
	asr TIME NOT NULL,
	maghrib TIME NOT NULL,
	isha TIME NOT NULL
);


COPY mosque_times(mosque_id, name, date, fajr, zuhr, asr, maghrib, isha)
FROM '/Users/nasir/thm-pwa/time_converter_scripts/chatGPT-mosques-new-DB-cleaned/all_mosque_combined.csv'
DELIMITER ','
CSV HEADER;


DROP TABLE postcodes;
CREATE TABLE postcodes (
    id SERIAL UNIQUE PRIMARY KEY,
	postcode VARCHAR UNIQUE,
    latitude NUMERIC NOT NULL,
	longitude NUMERIC NOT NULL
);


COPY postcodes(postcode, latitude, longitude)
FROM '/Users/nasir/thm-pwa/time_converter_scripts/th_postcodes.csv'
DELIMITER ','
CSV HEADER;
-- Create the db first if doesn't exist
-- CREATE DATABASE thm

DROP TABLE mosque_times;
DROP TABLE mosques;

CREATE TABLE mosques (
	id SERIAL UNIQUE PRIMARY KEY,
	name VARCHAR UNIQUE NOT NULL,
	area VARCHAR NOT NULL,
	address VARCHAR UNIQUE NOT NULL,
	latitude NUMERIC NOT NULL,
	longitude NUMERIC NOT NULL,
	has_female_facilities BOOLEAN NOT NULL,
	has_wheelchair_access BOOLEAN NOT NULL,
	url_slug VARCHAR UNIQUE NOT NULL,
	google_url VARCHAR UNIQUE NOT NULL
);

COPY mosques(id, name, area, address, latitude, longitude, has_female_facilities, has_wheelchair_access, url_slug, google_url)
FROM '/Users/nasir/thm-pwa/time_converter_scripts/mosques_db.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE mosque_times (
	id SERIAL UNIQUE PRIMARY KEY,
	mosque_id INTEGER REFERENCES mosques(id),
	mosque_name VARCHAR NOT NULL,
	date VARCHAR NOT NULL,
	fajr TIME NOT NULL,
	zuhr TIME NOT NULL,
	asr TIME NOT NULL,
	maghrib TIME NOT NULL,
	isha TIME NOT NULL
);

COPY mosque_times(mosque_id, mosque_name, date, fajr, zuhr, asr, maghrib, isha)
FROM '/Users/nasir/thm-pwa/time_converter_scripts/chatGPT-mosques-new-DB-cleaned/all_mosque_combined.csv'
DELIMITER ','
CSV HEADER;


DROP TABLE salah_beginning_times;

CREATE TABLE salah_beginning_times (
	id SERIAL UNIQUE PRIMARY KEY,
	date VARCHAR UNIQUE NOT NULL,
	fajr TIME NOT NULL,
	sunrise TIME NOT NULL,
	zuhr TIME NOT NULL,
	asr_1st_mithl TIME NOT NULL,
	asr_2nd_mithl TIME NOT NULL,
	maghrib TIME NOT NULL,
	isha TIME NOT NULL
);

COPY salah_beginning_times(date, fajr, zuhr, asr_1st_mithl, maghrib, isha, sunrise, asr_2nd_mithl)
FROM '/Users/nasir/thm-pwa/time_converter_scripts/salah_beginning_combined.csv'
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


SELECT * FROM mosque_times WHERE mosque_id = 2 AND date = '01-Apr-23';
SELECT * FROM mosque_times WHERE mosque_id = 2 AND date LIKE '%Apr-23%';

SELECT id, date, fajr, sunrise, zuhr, asr_1st_mithl, asr_2nd_mithl, maghrib, isha FROM salah_beginning_times WHERE date = '15-Mar-23';

CREATE TABLE jumuah_times (
    id SERIAL UNIQUE PRIMARY KEY,
    mosque_name VARCHAR NOT NULL,
    mosque_id INTEGER REFERENCES mosques(id),
    first_time TIME NOT NULL,
    second_time TIME,
	area VARCHAR NOT NULL,
	borough VARCHAR NOT NULL
    );

COPY jumuah_times(id, mosque_name, mosque_id, first_time, second_time, area, borough)
FROM '/Users/nasir/thm-pwa/time_converter_scripts/jumuah_times.csv'
DELIMITER ','
CSV HEADER;
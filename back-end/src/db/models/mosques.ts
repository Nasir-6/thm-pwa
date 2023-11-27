export type MosqueDTO = {
	id: number;
	name: string;
	area: string;
	address: string;
	latitude: number;
	longitude: number;
	hasFemaleFacilities: boolean;
	hasWheelchairAccess: boolean;
	urlSlug: string;
	googleUrl: string;
	distanceToLocationInMiles?: number; // THIS IS set to the id as a placeholder!
};

// NOTE: NUMERIC Type in postgres is a string in JS - in order to preserve accuracy!
export type MosqueDB = {
	id: number;
	name: string;
	area: string;
	address: string;
	latitude: string;
	longitude: string;
	has_female_facilities: boolean;
	has_wheelchair_access: boolean;
	url_slug: string;
	google_url: string;
};

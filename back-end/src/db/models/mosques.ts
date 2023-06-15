export type MosqueDTO = {
	id: number;
	name: string;
	area: string;
	address: string;
	latitude: number;
	longitude: number;
	urlSlug: string;
	googleUrl: string;
	distanceToLocationInMiles: number; // THIS IS set to the id as a placeholder!
};

// NOTE: NUMERIC Type in postgres is a string in JS - in order to preserve accuracy!
export type MosqueDB = {
	id: number;
	name: string;
	area: string;
	address: string;
	latitude: string;
	longitude: string;
	url_slug: string;
	google_url: string;
};

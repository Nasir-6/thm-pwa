export type MosqueDTO = {
	id: number;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	googleUrl: string;
};

// NOTE: NUMERIC Type in postgres is a string in JS - in order to preserve accuracy!
export type MosqueDB = {
	id: number;
	name: string;
	address: string;
	latitude: string;
	longitude: string;
	google_url: string;
};

import { z } from "zod";

const mosqueJumuahTimesDBSchema = z.object({
	id: z.number(),
	mosque_name: z.string(),
	mosque_id: z.number().nullable(),
	first_time: z.string(),
	second_time: z.string().nullable(),
	area: z.string(),
	borough: z.string(),
});

type mosqueJumuahTimesDB = z.infer<typeof mosqueJumuahTimesDBSchema>;

const mosqueJumuahTimesSchema = z.object({
	id: z.number(),
	mosqueName: z.string(),
	mosqueId: z.number().nullable(),
	firstTime: z.string(),
	secondTime: z.string().nullable(),
	area: z.string(),
	borough: z.string(),
});

type mosqueJumuahTimes = z.infer<typeof mosqueJumuahTimesSchema>;

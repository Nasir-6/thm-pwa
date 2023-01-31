// Will use a TS declaration file for front-end ONLY - as not needed in Back-end
// Also need the models for DTOs when receiving axios response
interface MosqueTimesDaily {
  id: number;
  mosqueId: number;
  mosqueName: string;
  date: Date;
  fajr: Date;
  zuhr: Date;
  asr: Date;
  maghrib: Date;
  isha: Date;
}

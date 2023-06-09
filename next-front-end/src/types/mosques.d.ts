// Will use a TS declaration file for front-end ONLY - as not needed in Back-end
// However The back-end models for DTOs are needed when receiving axios response - so import using relative path
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

interface SalahTimesDaily {
  id: number;
  date: Date;
  sunrise: Date;
  fajr: Date;
  zuhr: Date;
  asr1stMithl: Date;
  asr2ndMithl: Date;
  maghrib: Date;
  isha: Date;
}

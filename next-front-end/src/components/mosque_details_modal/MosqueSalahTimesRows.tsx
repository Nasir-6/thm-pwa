import React from 'react';
import SunIcon from '@/icons/salah_times_icons/SunIcon';
import SunriseIcon from '@/icons/salah_times_icons/SunriseIcon';
import CloudySunIcon from '@/icons/salah_times_icons/CloudySunIcon';
import CloudyMoonIcon from '@/icons/salah_times_icons/CloudyMoonIcon';
import MoonIcon from '@/icons/salah_times_icons/MoonIcon';

type Props = {
  salahTimes: MosqueTimesDaily;
  currentSalahTime: Date | null;
  setTabToShow: React.Dispatch<React.SetStateAction<string>>;
};

type SalahName = 'Fajr' | 'Zuhr' | 'Asr' | 'Maghrib' | 'Isha';
type SalahObject = {
  name: SalahName;
  time: Date;
};

const MosqueSalahTimesRows = ({ salahTimes, currentSalahTime, setTabToShow }: Props) => {
  const isFriday = salahTimes.date.getDay() === 5;
  return (
    <>
      {Object.entries(salahTimes).map((row: [string, Date | number]) => {
        if (row[0] === 'id' || row[0] === 'mosqueId' || row[0] === 'mosqueName' || row[0] === 'date') return null;
        const salahName = (row[0][0].toUpperCase() +
          row[0]
            .slice(1)
            .split(/(?=[A-Z]|[0-9])/)
            .join(' ')) as SalahName;
        const salahTimeObj: SalahObject = {
          name: salahName,
          time: row[1] as Date,
        };
        let icon;
        // https://kb.narrative.io/what-is-unix-time - Will need to have alternative for after year 2038
        // https://www.freecodecamp.org/news/javascript-date-comparison-how-to-compare-dates-in-js/
        const isCurrentSalahTime = currentSalahTime?.getTime() === salahTimeObj.time.getTime();
        if (salahName === 'Fajr') icon = <SunriseIcon isCurrentSalahTime={isCurrentSalahTime} />;
        if (salahName === 'Zuhr') icon = <SunIcon isCurrentSalahTime={isCurrentSalahTime} />;
        if (salahName === 'Asr') icon = <CloudySunIcon isCurrentSalahTime={isCurrentSalahTime} />;
        if (salahName === 'Maghrib') icon = <CloudyMoonIcon isCurrentSalahTime={isCurrentSalahTime} />;
        if (salahName === 'Isha') icon = <MoonIcon isCurrentSalahTime={isCurrentSalahTime} />;
        return (
          <div
            key={salahName}
            className={`flex justify-between px-4 py-5 border-t ${
              isCurrentSalahTime ? 'bg-gradient-to-r from-accent-600 to-accent-400 text-white' : ''
            }`}>
            <div className="lhs flex gap-2">
              {icon}
              <p>{salahTimeObj.name}</p>
            </div>
            {isFriday && salahTimeObj.name === 'Zuhr' ? (
              <button
                type="button"
                onClick={() => setTabToShow("Jumu'ah Times")}
                className="font-semibold hover:text-primary-700 underline underline-offset-2">
                See Jumu'ah Times
              </button>
            ) : (
              <p>
                {salahTimeObj.time
                  ?.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    // hour12: true,
                  })
                  .replace(/\s?[AP]M/, '')}
                {/* Remove AM/PM with replace function! */}
              </p>
            )}
          </div>
        );
      })}
    </>
  );
};

export default MosqueSalahTimesRows;

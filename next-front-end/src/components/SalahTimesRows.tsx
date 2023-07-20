import React from 'react';
import SunIcon from '@/icons/salah_times_icons/SunIcon';
import SunriseIcon from '@/icons/salah_times_icons/SunriseIcon';
import CloudySunIcon from '@/icons/salah_times_icons/CloudySunIcon';
import CloudyMoonIcon from '@/icons/salah_times_icons/CloudyMoonIcon';
import MoonIcon from '@/icons/salah_times_icons/MoonIcon';

type Props = {
  salahTimes: SalahTimesDaily;
  currentSalahTime: Date | null;
};

type SalahName = 'Fajr' | 'Sunrise' | 'Zuhr' | 'Asr 1st Mithl' | 'Asr 2nd Mithl' | 'Maghrib' | 'Isha';
type SalahObject = {
  name: SalahName;
  time: Date;
};

const SalahTimesRows = ({ salahTimes, currentSalahTime }: Props) => (
  <>
    {Object.entries(salahTimes).map((row: [string, Date | number]) => {
      if (row[0] === 'id' || row[0] === 'date') return null;
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
      const isCurrentSalahTime = currentSalahTime === salahTimeObj.time;
      if (salahName === 'Fajr' || salahName === 'Sunrise') icon = <SunriseIcon isCurrentSalahTime={isCurrentSalahTime} />;
      if (salahName === 'Zuhr') icon = <SunIcon isCurrentSalahTime={isCurrentSalahTime} />;
      if (salahName === 'Asr 1st Mithl' || salahName === 'Asr 2nd Mithl') icon = <CloudySunIcon isCurrentSalahTime={isCurrentSalahTime} />;
      if (salahName === 'Maghrib') icon = <CloudyMoonIcon isCurrentSalahTime={isCurrentSalahTime} />;
      if (salahName === 'Isha') icon = <MoonIcon isCurrentSalahTime={isCurrentSalahTime} />;
      return (
        <div className={`flex justify-between px-4 py-5 border-t ${isCurrentSalahTime ? 'current' : ''}`}>
          <div className="lhs flex gap-2">
            {icon}
            <p>{salahTimeObj.name}</p>
          </div>
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
        </div>
      );
    })}
  </>
);

export default SalahTimesRows;

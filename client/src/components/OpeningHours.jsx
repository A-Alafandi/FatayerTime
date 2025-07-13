// src/components/OpeningHours/OpeningHours.jsx

import React from 'react';
import styles from '../main.css';

const hours = [
  { day: 'Monday',    open: '10:00', close: '20:00' },
  { day: 'Tuesday',   open: '10:00', close: '20:00' },
  { day: 'Wednesday', open: '10:00', close: '20:00' },
  { day: 'Thursday',  open: '10:00', close: '20:00' },
  { day: 'Friday',    open: '10:00', close: '21:00' },
  { day: 'Saturday',  open: '12:00', close: '21:00' },
  { day: 'Sunday',    open: '12:00', close: '19:00' },
];

function OpeningHours() {
  return (
      <section className={styles.openingHoursSection} aria-labelledby="hours-title">
        <h2 id="hours-title" className={styles.title}>Opening Hours</h2>
        <table className={styles.table} aria-label="Opening hours">
          <tbody>
          {hours.map(({ day, open, close }) => (
              <tr key={day}>
                <th className={styles.day}>{day}</th>
                <td className={styles.time}>{open} - {close}</td>
              </tr>
          ))}
          </tbody>
        </table>
        <div className={styles.note}>
          <span>Special hours for holidays are announced on our socials.</span>
        </div>
      </section>
  );
}

export default React.memo(OpeningHours);

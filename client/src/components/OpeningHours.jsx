import React from 'react';
import '../Main.css';

const hours = [
    { day: 'Monday', open: '10:00', close: '20:00' },
    { day: 'Tuesday', open: '10:00', close: '20:00' },
    { day: 'Wednesday', open: '10:00', close: '20:00' },
    { day: 'Thursday', open: '10:00', close: '20:00' },
    { day: 'Friday', open: '10:00', close: '21:00' },
    { day: 'Saturday', open: '12:00', close: '21:00' },
    { day: 'Sunday', open: '12:00', close: '19:00' },
];

function OpeningHours() {
    return (
        <section className="openingHoursSection" aria-labelledby="hours-title">
            <h2 id="hours-title" className="title">Opening Hours</h2>
            <table className="table" aria-label="Opening hours">
                <tbody>
                {hours.map(({ day, open, close }) => (
                    <tr key={day}>
                        <th className="day">{day}</th>
                        <td className="time">{open} - {close}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="note">
                <span>Special hours for holidays are announced on our socials.</span>
            </div>
        </section>
    );
}

export default React.memo(OpeningHours);

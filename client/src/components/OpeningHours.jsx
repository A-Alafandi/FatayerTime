import React, { useState, useEffect } from 'react';

function OpeningHours() {
  const [openStatus, setOpenStatus] = useState({});

  useEffect(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    const hours = {
      0: { open: 12, close: 18 },
      1: { open: 11, close: 18 },
      2: null,
      3: { open: 11, close: 18 },
      4: { open: 11, close: 18 },
      5: { open: 11, close: 18 },
      6: { open: 12, close: 18 },
    };

    const status = {};
    Object.keys(hours).forEach((d) => {
      if (!hours[d]) {
        status[d] = 'closed-today';
      } else {
        const { open, close } = hours[d];
        status[d] = hour >= open && hour < close ? 'open-today' : 'closed-today';
      }
    });
    setOpenStatus(status);
  }, []);

  return (
      <section className="opening-hours-section py-5" aria-labelledby="opening-hours-title">
        <div className="container">
          <div className="text-center mb-4">
            <i
                className="bi bi-calendar-week"
                style={{ fontSize: '2rem', color: '#28a745' }}
                aria-hidden="true"
            ></i>
            <h2 id="opening-hours-title" className="section-title mt-2">Afhaaltijden</h2>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="opening-hours bg-white shadow rounded p-4">
                <div className="row">
                  <div className="col-6 text-start">
                    {['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'].map((day, index) => (
                        <p
                            key={index}
                            className={`mb-2 ${openStatus[index] || ''}`}
                            id={`day-${index}`}
                        >
                          {day}
                        </p>
                    ))}
                  </div>
                  <div className="col-6 text-end">
                    <p className={`mb-2 ${openStatus[1] || ''}`} id="time-1">11:00 – 18:00</p>
                    <p className={`mb-2 text-muted ${openStatus[2] || ''}`} id="time-2">Gesloten</p>
                    <p className={`mb-2 ${openStatus[3] || ''}`} id="time-3">11:00 – 18:00</p>
                    <p className={`mb-2 ${openStatus[4] || ''}`} id="time-4">11:00 – 18:00</p>
                    <p className={`mb-2 ${openStatus[5] || ''}`} id="time-5">11:00 – 18:00</p>
                    <p className={`mb-2 ${openStatus[6] || ''}`} id="time-6">12:00 – 18:00</p>
                    <p className={`mb-0 ${openStatus[0] || ''}`} id="time-0">12:00 – 18:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}

export default OpeningHours;
import React, { useEffect } from 'react'

function OpeningHours() {
  useEffect(() => {
    const now = new Date()
    const day = now.getDay()
    const hour = now.getHours()

    const hours = {
      0: { open: 12, close: 18 },
      1: { open: 11, close: 18 },
      2: null,
      3: { open: 11, close: 18 },
      4: { open: 11, close: 18 },
      5: { open: 11, close: 18 },
      6: { open: 12, close: 18 },
    }

    const dayEl = document.getElementById('day-' + day)
    const timeEl = document.getElementById('time-' + day)

    if (dayEl && timeEl) {
      if (!hours[day]) {
        dayEl.classList.add('closed-today')
        timeEl.classList.add('closed-today')
      } else {
        const { open, close } = hours[day]
        const isOpenNow = hour >= open && hour < close
        const className = isOpenNow ? 'open-today' : 'closed-today'
        dayEl.classList.add(className)
        timeEl.classList.add(className)
      }
    }
  }, [])

  return (
    <section className="opening-hours-section py-5">
      <div className="container">
        <div className="text-center mb-4">
          <i
            className="bi bi-calendar-week"
            style={{ fontSize: '2rem', color: '#28a745' }}
          ></i>
          <h2 className="section-title mt-2">Afhaaltijden</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="opening-hours bg-white shadow rounded p-4">
              <div className="row">
                <div className="col-6 text-start">
                  <p className="mb-2" id="day-1">
                    maandag
                  </p>
                  <p className="mb-2" id="day-2">
                    dinsdag
                  </p>
                  <p className="mb-2" id="day-3">
                    woensdag
                  </p>
                  <p className="mb-2" id="day-4">
                    donderdag
                  </p>
                  <p className="mb-2" id="day-5">
                    vrijdag
                  </p>
                  <p className="mb-2" id="day-6">
                    zaterdag
                  </p>
                  <p className="mb-0" id="day-0">
                    zondag
                  </p>
                </div>
                <div className="col-6 text-end">
                  <p className="mb-2" id="time-1">
                    11:00 – 18:00
                  </p>
                  <p className="mb-2 text-muted" id="time-2">
                    Gesloten
                  </p>
                  <p className="mb-2" id="time-3">
                    11:00 – 18:00
                  </p>
                  <p className="mb-2" id="time-4">
                    11:00 – 18:00
                  </p>
                  <p className="mb-2" id="time-5">
                    11:00 – 18:00
                  </p>
                  <p className="mb-2" id="time-6">
                    12:00 – 18:00
                  </p>
                  <p className="mb-0" id="time-0">
                    12:00 – 18:00
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OpeningHours

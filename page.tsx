'use client'

import { useState, useEffect } from 'react'
import styles from './styles.module.css'

export default function SkirmishCountdown() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [status, setStatus] = useState('')
  const [liveTimer, setLiveTimer] = useState({ hours: 0, minutes: 0, seconds: 0 })
  const [endingSoonTimer, setEndingSoonTimer] = useState({ minutes: 0, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const thursday = new Date(now)
      thursday.setUTCDate(thursday.getUTCDate() + ((4 + 7 - thursday.getUTCDay()) % 7))
      thursday.setUTCHours(23, 0, 0, 0) // Thursday 23:00 UTC

      const saturdayEndingSoon = new Date(thursday)
      saturdayEndingSoon.setUTCDate(saturdayEndingSoon.getUTCDate() + 2) // Move to Saturday
      saturdayEndingSoon.setUTCHours(4, 0, 0, 0) // Saturday 04:00 UTC

      const saturdayEnd = new Date(saturdayEndingSoon)
      saturdayEnd.setUTCHours(5, 0, 0, 0) // Saturday 05:00 UTC

      if (now >= thursday && now < saturdayEndingSoon) {
        setStatus('Skirmish Live')
        const liveDiff = saturdayEndingSoon.getTime() - now.getTime()
        const liveHours = Math.floor(liveDiff / (1000 * 60 * 60))
        const liveMinutes = Math.floor((liveDiff % (1000 * 60 * 60)) / (1000 * 60))
        const liveSeconds = Math.floor((liveDiff % (1000 * 60)) / 1000)
        setLiveTimer({ hours: liveHours, minutes: liveMinutes, seconds: liveSeconds })
        setEndingSoonTimer({ minutes: 0, seconds: 0 })
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else if (now >= saturdayEndingSoon && now < saturdayEnd) {
        setStatus('Skirmish Ending Soon')
        const endingSoonDiff = saturdayEnd.getTime() - now.getTime()
        const endingSoonMinutes = Math.floor(endingSoonDiff / (1000 * 60))
        const endingSoonSeconds = Math.floor((endingSoonDiff % (1000 * 60)) / 1000)
        setEndingSoonTimer({ minutes: endingSoonMinutes, seconds: endingSoonSeconds })
        setLiveTimer({ hours: 0, minutes: 0, seconds: 0 })
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      } else {
        let target
        if (now < thursday) {
          target = thursday
        } else {
          target = new Date(thursday)
          target.setUTCDate(target.getUTCDate() + 7)
        }

        const diff = target.getTime() - now.getTime()
        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setStatus('Next Skirmish in')
        setCountdown({ days, hours, minutes, seconds })
        setLiveTimer({ hours: 0, minutes: 0, seconds: 0 })
        setEndingSoonTimer({ minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`${styles.root} ${styles.container}`}>
      <div className={styles.card}>
        <div className={styles['card-content']}>
          <div className={styles['countdown-container']}>
            {status === 'Skirmish Live' && (
              <>
                <div className={styles['countdown-green']}>Skirmish is Live!</div>
                <div className={styles.countdown}>
                  <div className={styles['countdown-item']}>
                    <span>{liveTimer.hours}</span>
                    <div className={styles.label}>Hours</div>
                  </div>
                  <div className={styles['countdown-item']}>
                    <span>{liveTimer.minutes}</span>
                    <div className={styles.label}>Minutes</div>
                  </div>
                  <div className={styles['countdown-item']}>
                    <span>{liveTimer.seconds}</span>
                    <div className={styles.label}>Seconds</div>
                  </div>
                </div>
              </>
            )}
            {status === 'Skirmish Ending Soon' && (
              <>
                <div className={styles['countdown-red']}>Skirmish Ending Soon!</div>
                <div className={styles.countdown}>
                  <div className={styles['countdown-item']}>
                    <span>{endingSoonTimer.minutes}</span>
                    <div className={styles.label}>Minutes</div>
                  </div>
                  <div className={styles['countdown-item']}>
                    <span>{endingSoonTimer.seconds}</span>
                    <div className={styles.label}>Seconds</div>
                  </div>
                </div>
              </>
            )}
            {status === 'Next Skirmish in' && (
              <>
                <div className={styles.countdown}>
                  <div className={styles['countdown-item']}>
                    <span>{countdown.days}</span>
                    <div className={styles.label}>Days</div>
                  </div>
                  <div className={styles['countdown-item']}>
                    <span>{countdown.hours}</span>
                    <div className={styles.label}>Hours</div>
                  </div>
                  <div className={styles['countdown-item']}>
                    <span>{countdown.minutes}</span>
                    <div className={styles.label}>Minutes</div>
                  </div>
                  <div className={styles['countdown-item']}>
                    <span>{countdown.seconds}</span>
                    <div className={styles.label}>Seconds</div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
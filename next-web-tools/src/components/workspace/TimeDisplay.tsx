'use client'

import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { formatDate } from '@/lib/utils/date'

const TimeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: theme.shape.borderRadius,
  backdropFilter: 'blur(10px)',
}))

const TimeText = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.9)',
  fontWeight: 500,
  fontSize: '2rem',
}))

const DateText = styled(Typography)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.7)',
  marginTop: theme.spacing(1),
}))

export function Time() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <TimeText>
      {currentTime.toLocaleTimeString()}
    </TimeText>
  )
}

export function DateDisplay() {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date())
    }, 1000 * 60) // Update every minute

    return () => clearInterval(timer)
  }, [])

  return (
    <DateText>
      {formatDate(currentDate)}
    </DateText>
  )
}

export default function TimeDisplay() {
  return (
    <TimeContainer>
      <Time />
      <DateDisplay />
    </TimeContainer>
  )
}

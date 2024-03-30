

import React from 'react'
import React, { useState } from 'react'

import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DigitalClock } from '@mui/x-date-pickers/DigitalClock';

export default function DigitalClock({setDate, setTime}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer className="flex-container" components={['DateCalendar', 'DateCalendar','DigitalClock', 'DigitalClock']}>
        <DateCalendar onChange={(newValue) => setDate(newValue)} />
        <DigitalClock
         onChange={(newValue) => setTime(newValue)}
        />
    </DemoContainer>
</LocalizationProvider>
  )
}

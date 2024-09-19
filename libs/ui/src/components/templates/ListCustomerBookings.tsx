'use client'
import { BookingStatus } from '@parkease/network/src/gql/generated'
import { useState } from 'react'
import { Tab, TabPanel, Tabs } from '../molecules/Tabs'
import { ShowCustomerBookings } from '../organisms/ShowCustomerBookings'

export const ListCustomerBookings = () => {
  const [value, setValue] = useState<0 | 1>(1)
  return (
    <>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label="bookings"
      >
        <Tab label={'PAST'} />
        <Tab label={'ON GOING'} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowCustomerBookings statuses={[BookingStatus.CheckedOut]} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowCustomerBookings
          statuses={[
            BookingStatus.Booked,
            BookingStatus.ValetPickedUp,
            BookingStatus.ValetAssignedForCheckIn,
            BookingStatus.CheckedIn,
            BookingStatus.ValetAssignedForCheckOut,
          ]}
        />
      </TabPanel>
    </>
  )
}

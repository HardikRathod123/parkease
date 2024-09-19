import { useState } from 'react'
import { Tab, TabPanel, Tabs } from '../molecules/Tabs'
import { ShowValetMyDropTrips } from '../organisms/ShowValetMyDropTrips'
import { ShowValetMyPickupTrips } from '../organisms/ShowValetMyPickupTrips'

export const ValetTrips = ({ uid }: { uid: string }) => {
  const [value, setValue] = useState<0 | 1>(0)

  return (
    <>
      <Tabs
        value={value}
        onChange={(e, v) => setValue(v)}
        aria-label="bookings"
      >
        <Tab label={'Pickup'} />
        <Tab label={'Drop'} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ShowValetMyPickupTrips uid={uid} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShowValetMyDropTrips uid={uid} />
      </TabPanel>
    </>
  )
}

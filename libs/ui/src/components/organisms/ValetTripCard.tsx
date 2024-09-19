import { isLatLng } from '@parkease/util'
import { useMapboxDirections } from '@parkease/util/hooks/directions'
import { LatLng } from '@parkease/util/types'
import { format } from 'date-fns'
import { ReactNode } from 'react'
import { AlertSection } from '../molecules/AlertSection'
import { MapLink } from '../molecules/MapLink'
import { StaticMapDirections } from './map/StaticMapDirections'

export interface IValetTripCardProps {
  start?: Partial<LatLng> | null
  end?: Partial<LatLng> | null
  booking: {
    id: number
    time: string
  }
  children?: ReactNode
}

export const ValetTripCard = ({
  start,
  end,
  booking,
  children,
}: IValetTripCardProps) => {
  const { data, distance } = useMapboxDirections(start, end)

  if (!isLatLng(start) || !isLatLng(end)) {
    return (
      <AlertSection>
        <div>Something went wrong.</div>
        <div className="text-xs">Start end locations not set.</div>
      </AlertSection>
    )
  }

  return (
    <div>
      <MapLink waypoints={[start, end]}>
        <StaticMapDirections start={start} end={end} coordinates={data} />
      </MapLink>
      <div className="p-2 bg-white space-y-2 ">
        <div className="flex justify-between gap-2 ">
          <div>
            <div className="text-lg font-semibold">
              {format(new Date(booking.time), 'p')}
            </div>
            <div className="text-xs text-gray">
              {format(new Date(booking.time), 'PP')}
            </div>
          </div>
          <div className="font-medium">
            {((distance || 0) / 1000).toFixed(2)}Km
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

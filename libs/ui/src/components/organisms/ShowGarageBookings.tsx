import { useQuery } from '@apollo/client'
import {
  BookingStatus,
  BookingsForGarageDocument,
  QueryMode,
} from '@parkease/network/src/gql/generated'
import { useTakeSkip } from '@parkease/util/hooks/pagination'
import { IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import { CheckInOutButton } from './CheckInOutButtons'
import { ManageBookingCard } from './ManageBookingCard'
import { ShowData } from './ShowData'

export const ShowGarageBookings = ({
  garageId,
  statuses,
  showCheckIn = false,
  showCheckOut = false,
}: {
  garageId: number
  statuses: BookingStatus[]
  showCheckIn?: boolean
  showCheckOut?: boolean
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { take, setTake, skip, setSkip } = useTakeSkip()

  const { data, loading } = useQuery(BookingsForGarageDocument, {
    variables: {
      garageId,
      skip,
      take,
      where: {
        status: { in: statuses },
        ...(searchTerm && {
          vehicleNumber: {
            contains: searchTerm,
            mode: QueryMode.Insensitive,
          },
        }),
      },
    },
  })

  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <div className="flex justify-start items-center gap-2 w-full max-w-xl  rounded-full shadow-xl bg-white px-4">
          <IconSearch />
          <input
            placeholder="Search vehicle number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow py-4 bg-transparent"
          />
        </div>
      </div>
      <ShowData
        loading={loading}
        pagination={{
          skip,
          take,
          resultCount: data?.bookingsForGarage.length,
          totalCount: data?.bookingsCount.count,
          setSkip,
          setTake,
        }}
      >
        {data?.bookingsForGarage.map((booking) => (
          <div key={booking.id}>
            <ManageBookingCard booking={booking} />
            {showCheckIn ? (
              <CheckInOutButton
                status={BookingStatus.CheckedIn}
                buttonText="CHECK IN"
                bookingId={booking.id}
              />
            ) : null}
            {showCheckOut ? (
              <CheckInOutButton
                status={BookingStatus.CheckedOut}
                buttonText="CHECK OUT"
                bookingId={booking.id}
              />
            ) : null}
          </div>
        ))}
      </ShowData>
    </div>
  )
}

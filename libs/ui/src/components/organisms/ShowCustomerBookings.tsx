import { useQuery } from '@apollo/client'
import {
  BookingStatus,
  BookingsForCustomerDocument,
} from '@parkease/network/src/gql/generated'
import { useTakeSkip } from '@parkease/util/hooks/pagination'
import { CustomerBookingCard } from './CustomerBookingCard'
import { ShowData } from './ShowData'

export const ShowCustomerBookings = ({
  statuses,
}: {
  statuses: BookingStatus[]
}) => {
  const { setSkip, setTake, skip, take } = useTakeSkip()

  const { loading, data, error } = useQuery(BookingsForCustomerDocument, {
    variables: {
      skip,
      take,
      where: {
        status: {
          in: statuses,
        },
      },
    },
  })

  return (
    <ShowData
      error={error?.message}
      loading={loading}
      pagination={{
        skip,
        take,
        resultCount: data?.bookingsForCustomer.length || 0,
        totalCount: data?.bookingsCount.count || 0,
        setSkip,
        setTake,
      }}
    >
      {data?.bookingsForCustomer.map((booking) => (
        <CustomerBookingCard key={booking.id} booking={booking} />
      ))}
    </ShowData>
  )
}

import { useMutation } from '@apollo/client'
import {
  AssignValetDocument,
  BookingStatus,
  namedOperations,
} from '@parkease/network/src/gql/generated'
import { ReactNode } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../atoms/Button'

export const AssignValetButton = ({
  bookingId,
  status,
  children,
}: {
  bookingId: number
  status: BookingStatus
  children: ReactNode
}) => {
  const [assignPickup, { loading }] = useMutation(AssignValetDocument, {
    awaitRefetchQueries: true,
    refetchQueries: [
      namedOperations.Query.valetDrops,
      namedOperations.Query.valetPickups,
    ],
    onCompleted(data) {
      toast(`Action successful.
            ID: ${data.assignValet.id}`)
    },
  })

  return (
    <Button
      loading={loading}
      variant="outlined"
      fullWidth
      onClick={async () => {
        await assignPickup({
          variables: { bookingId, status },
        })
      }}
    >
      {children}
    </Button>
  )
}

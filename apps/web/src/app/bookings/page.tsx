import { IsLoggedIn } from '@parkease/ui/src/components/organisms/IsLoggedIn'
import { ListCustomerBookings } from '@parkease/ui/src/components/templates/ListCustomerBookings'

export default function Page() {
  return (
    <IsLoggedIn>
      <ListCustomerBookings />
    </IsLoggedIn>
  )
}

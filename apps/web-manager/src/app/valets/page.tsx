import { IsLoggedIn } from '@parkease/ui/src/components/organisms/IsLoggedIn'
import { ManageValets } from '@parkease/ui/src/components/templates/ManageValets'

export default function Page() {
  return (
    <IsLoggedIn>
      <ManageValets />
    </IsLoggedIn>
  )
}

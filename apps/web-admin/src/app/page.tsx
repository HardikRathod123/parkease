import { IsAdmin } from '@parkease/ui/src/components/organisms/IsAdmin'
import { AdminHome } from '@parkease/ui/src/components/templates/AdminHome'

export default function Home() {
  return (
    <main>
      <IsAdmin>
        <AdminHome />
      </IsAdmin>
    </main>
  )
}

'use client'
import { IsLoggedIn } from '@parkease/ui/src/components/organisms/IsLoggedIn'
import { IsValet } from '@parkease/ui/src/components/organisms/IsValet'
export default function Home() {
  return (
    <main>
      <IsLoggedIn>
        {(uid) => <IsValet uid={uid}>Hello valet.</IsValet>}
      </IsLoggedIn>
    </main>
  )
}

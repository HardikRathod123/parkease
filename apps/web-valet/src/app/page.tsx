'use client'
import { IsLoggedIn } from '@parkease/ui/src/components/organisms/IsLoggedIn'

export default function Home() {
  return (
    <main>
      <IsLoggedIn>Hello valet</IsLoggedIn>
    </main>
  )
}

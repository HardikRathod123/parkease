'use client'
import { IsLoggedIn } from '@parkease/ui/src/components/organisms/IsLoggedIn'
import { IsManager } from '@parkease/ui/src/components/organisms/IsManager'

export default function Home() {
  return (
    <IsLoggedIn>
      <IsManager>Hello Manager</IsManager>
    </IsLoggedIn>
  )
}

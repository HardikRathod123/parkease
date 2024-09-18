'use client'
import { IsLoggedIn } from '@parkease/ui/src/components/organisms/IsLoggedIn'
import { IsManager } from '@parkease/ui/src/components/organisms/IsManager'
import { ListGarages } from '@parkease/ui/src/components/organisms/ListGarages'

export default function Home() {
  return (
    <IsLoggedIn>
      <IsManager>
        {(companyId) => <ListGarages companyId={companyId} />}
      </IsManager>
    </IsLoggedIn>
  )
}

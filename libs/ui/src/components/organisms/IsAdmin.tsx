'use client'
import { useQuery } from '@apollo/client'
import { AdminMeDocument } from '@parkease/network/src/gql/generated'
import { ReactNode } from 'react'
import { AlertSection } from '../molecules/AlertSection'
import { LoaderPanel } from '../molecules/Loader'

export const IsAdmin = ({ children }: { children: ReactNode }) => {
  const { data, loading } = useQuery(AdminMeDocument)

  if (loading) {
    return <LoaderPanel text="Loading company..." />
  }

  if (!data?.adminMe?.uid)
    return (
      <AlertSection>
        <div>You are not an admin.</div>
      </AlertSection>
    )

  return <>{children}</>
}

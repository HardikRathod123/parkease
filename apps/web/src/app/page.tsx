'use client'
import { useQuery } from '@apollo/client'
import { CompaniesDocument } from '@parkease/network/src/gql/generated'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data, loading } = useQuery(CompaniesDocument)
  console.log('data', data)
  const { data: sessionData, status } = useSession()

  return (
    <main className="bg-primary">
      <div>Home page</div>
    </main>
  )
}

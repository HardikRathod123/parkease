'use client'
import { useQuery } from '@apollo/client'
import {
  CompaniesDocument,
  SearchGaragesDocument,
} from '@parkease/network/src/gql/generated'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data, loading } = useQuery(CompaniesDocument)
  console.log('data', data)
  const { data: sessionData, status } = useSession()
  const { data: garages } = useQuery(SearchGaragesDocument, {
    variables: {
      dateFilter: { end: '2024-12-14', start: '2023-12-04' },
      locationFilter: {
        ne_lat: 1,
        ne_lng: 1,
        sw_lat: -1,
        sw_lng: -1,
      },
    },
  })

  return (
    <main className="bg-primary">
      <div>Home page</div>
      {garages?.searchGarages.map((garage) => (
        <pre key={garage.id}>{JSON.stringify(garage, null, 2)}</pre>
      ))}
    </main>
  )
}

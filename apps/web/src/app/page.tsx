'use client'
import { useQuery } from '@apollo/client'
import { CompaniesDocument } from '@parkease/network/src/gql/generated'
import { add } from '@parkease/sample-lib'

export default function Home() {
  const { data, loading } = useQuery(CompaniesDocument)
  console.log('data', data)
  return (
    <main className="bg-primary">
      Hello {add(343, 3)}
      {/* <div>
        {data?.companies.map((company) => (
          <div className="p-4 bg-gray-100 rounded" key={company.id}>
            <div>{company.displayName}</div>
            <div>{company.description}</div>
          </div>
        ))}
      </div> */}
    </main>
  )
}

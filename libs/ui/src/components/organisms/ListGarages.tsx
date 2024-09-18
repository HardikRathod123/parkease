import { useQuery } from '@apollo/client'
import {
  GaragesDocument,
  MyCompanyQuery,
} from '@parkease/network/src/gql/generated'
import { useTakeSkip } from '@parkease/util/hooks/pagination'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { GarageCard } from './GarageCard'
import { ShowData } from './ShowData'

export const ListGarages = ({
  companyId,
}: {
  companyId: MyCompanyQuery['myCompany']['id']
}) => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { data, loading, error } = useQuery(GaragesDocument, {
    variables: {
      skip,
      take,
      where: { companyId: { equals: companyId } },
    },
  })
  return (
    <ShowData
      error={error?.message}
      loading={loading}
      pagination={{
        skip,
        take,
        resultCount: data?.garages.length,
        totalCount: data?.garagesCount.count,
        setSkip,
        setTake,
      }}
      title={
        <div className="flex items-center gap-4">
          <div>Garages</div>
          <Link
            href="/new-garage"
            className="rounded-full border border-black p-0.5"
          >
            <IconPlus />
          </Link>
        </div>
      }
    >
      {data?.garages.map((garage) => (
        <GarageCard key={garage.id} garage={garage} />
      ))}
    </ShowData>
  )
}
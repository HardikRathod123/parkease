'use client'
import { useQuery } from '@apollo/client'
import { GaragesDocument } from '@parkease/network/src/gql/generated'
import { useTakeSkip } from '@parkease/util/hooks/pagination'
import { GarageAdminCard } from '../organisms/GarageAdminCard'
import { ShowData } from '../organisms/ShowData'
import { CreateVerificationButton } from '../organisms/admin/CreateVerificationButton'
import { RemoveVerificationButton } from '../organisms/admin/RemoveVerificationButton'

export const AdminHome = () => {
  return <ShowGarages />
}

export const ShowGarages = () => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { loading, data, error } = useQuery(GaragesDocument, {
    variables: { skip, take },
  })

  return (
    <ShowData
      error={error?.message}
      title="Garages"
      loading={loading}
      pagination={{
        resultCount: data?.garages.length || 0,
        totalCount: data?.garagesCount.count || 0,
        setSkip,
        setTake,
        skip,
        take,
      }}
    >
      {data?.garages.map((garage) => (
        <GarageAdminCard key={garage.id} garage={garage}>
          <div className="flex justify-end">
            {!garage?.verification?.verified ? (
              <CreateVerificationButton garageId={garage.id} />
            ) : (
              <RemoveVerificationButton garageId={garage.id} />
            )}
          </div>
        </GarageAdminCard>
      ))}
    </ShowData>
  )
}

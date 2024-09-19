import { useQuery } from '@apollo/client'
import { CompanyValetsDocument } from '@parkease/network/src/gql/generated'
import { useTakeSkip } from '@parkease/util/hooks/pagination'
import { ShowData } from './ShowData'
import { ValetCard } from './ValetCard'

export const ListValets = () => {
  const { take, skip, setSkip, setTake } = useTakeSkip()
  const { data, loading } = useQuery(CompanyValetsDocument)

  return (
    <ShowData
      loading={loading}
      pagination={{
        resultCount: data?.companyValets.length,
        totalCount: data?.companyValetsTotal,
        take,
        skip,
        setSkip,
        setTake,
      }}
    >
      {data?.companyValets.map((valet) => (
        <ValetCard key={valet.uid} valet={valet} />
      ))}
    </ShowData>
  )
}

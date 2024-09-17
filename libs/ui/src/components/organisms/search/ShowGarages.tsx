import { useLazyQuery } from '@apollo/client'
import { useConvertSearchFormToVariables } from '@parkease/forms/src/adapters/searchFormAdapter'
import { SearchGaragesDocument } from '@parkease/network/src/gql/generated'
import { useEffect } from 'react'
import { GarageMarker } from './GarageMarker'

export const ShowGarages = () => {
  const [searchGarages, { data }] = useLazyQuery(SearchGaragesDocument)

  const { variables } = useConvertSearchFormToVariables()

  useEffect(() => {
    if (variables) {
      searchGarages({ variables })
    }
  }, [searchGarages, variables])

  return (
    <>
      {data?.searchGarages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  )
}

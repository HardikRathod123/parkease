import { useLazyQuery } from '@apollo/client'
import { FormTypeSearchGarage } from '@parkease/forms/src/searchGarages'
import { SearchGaragesDocument } from '@parkease/network/src/gql/generated'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { GarageMarker } from './GarageMarker'

export const ShowGarages = () => {
  const [searchGarages, { data }] = useLazyQuery(SearchGaragesDocument)

  const { watch } = useFormContext<FormTypeSearchGarage>()
  const { endTime: end, startTime: start, locationFilter } = watch()

  useEffect(() => {
    searchGarages({ variables: { dateFilter: { end, start }, locationFilter } })
  }, [end, locationFilter, searchGarages, start])

  return (
    <>
      {data?.searchGarages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  )
}

import { useLazyQuery } from '@apollo/client'
import { useConvertSearchFormToVariables } from '@parkease/forms/src/adapters/searchFormAdapter'
import { SearchGaragesDocument } from '@parkease/network/src/gql/generated'
import { IconInfoCircle } from '@tabler/icons-react'
import { useEffect } from 'react'
import { Loader } from '../../molecules/Loader'
import { Panel } from '../map/Panel'
import { GarageMarker } from './GarageMarker'

export const ShowGarages = () => {
  const [searchGarages, { loading, data }] = useLazyQuery(SearchGaragesDocument)

  const { variables } = useConvertSearchFormToVariables()

  useEffect(() => {
    if (variables) {
      searchGarages({ variables })
    }
  }, [searchGarages, variables])

  if (data?.searchGarages.length === 0) {
    return (
      <Panel
        position="center-center"
        className="bg-white/50 shadow border-white border backdrop-blur-sm"
      >
        <div className="flex items-center justify-center gap-2 ">
          <IconInfoCircle /> <div>No parking slots found in this area.</div>
        </div>
      </Panel>
    )
  }

  return (
    <>
      {loading ? (
        <Panel position="center-bottom">
          <Loader />
        </Panel>
      ) : null}
      {data?.searchGarages.map((garage) => (
        <GarageMarker key={garage.id} marker={garage} />
      ))}
    </>
  )
}

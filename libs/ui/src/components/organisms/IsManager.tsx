import { useQuery } from '@apollo/client'
import { MyCompanyDocument } from '@parkease/network/src/gql/generated'
import { BaseComponent } from '@parkease/util/types'
import { AlertSection } from '../molecules/AlertSection'
import { LoaderPanel } from '../molecules/Loader'
import { CreateCompany } from './CreateCompany'

export const IsManager = ({ children }: BaseComponent) => {
  const { data, loading } = useQuery(MyCompanyDocument)

  if (loading) {
    return <LoaderPanel text="Loading company..." />
  }

  if (!data?.myCompany)
    return (
      <AlertSection>
        <div>You don&apos;t have a company yet.</div>
        <CreateCompany />
      </AlertSection>
    )

  return children
}

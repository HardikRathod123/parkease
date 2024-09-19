'use client'
import { useQuery } from '@apollo/client'
import { ValetMeDocument } from '@parkease/network/src/gql/generated'
import { ReactNode } from 'react'
import { AlertSection } from '../molecules/AlertSection'
import { LoaderPanel } from '../molecules/Loader'
type RenderPropChild = (id: number) => ReactNode

export const IsValet = ({
  children,
  uid,
}: {
  children: RenderPropChild | ReactNode
  uid: string
}) => {
  const { data, loading } = useQuery(ValetMeDocument)

  if (loading) {
    return <LoaderPanel text="Loading company..." />
  }

  if (!data?.valetMe?.companyId)
    return (
      <AlertSection>
        <div>You are not a valet.</div>
        <div>Please contact the company&apos;s managers with your ID. </div>
        <div>{uid}</div>
      </AlertSection>
    )

  return (
    <>
      {typeof children === 'function'
        ? (children as RenderPropChild)(data.valetMe.companyId)
        : children}
    </>
  )
}

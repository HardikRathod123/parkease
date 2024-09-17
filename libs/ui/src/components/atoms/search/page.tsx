'use client'
import { FormProviderSearchGarage } from '@parkease/forms/src/searchGarages'
import { SearchPage } from '@parkease/ui/src/components/templates/SearchPage'

export default function Page() {
  return (
    <FormProviderSearchGarage>
      <SearchPage />
    </FormProviderSearchGarage>
  )
}

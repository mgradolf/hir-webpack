import * as React from "react"
import { SectionSearchMeta } from "~/TableSearchMeta/Section/SectionSearchMeta"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getSectionTableColumns } from "~/TableSearchMeta/Section/SectionTableColumns"

export function SectionLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Section"
      valueKey="SectionID"
      displayKey="SectionNumber"
      meta={SectionSearchMeta as IField[]}
      metaName="SectionSearchMeta"
      {...props}
      {...getSectionTableColumns(true)}
    />
  )
}

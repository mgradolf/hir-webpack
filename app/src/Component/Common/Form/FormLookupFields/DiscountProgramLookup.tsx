import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getDiscountProgramsTableColumns } from "~/TableSearchMeta/DiscountPrograms/DiscountProgramsTableColumns"
import { DiscountProgramsSearchMeta } from "~/TableSearchMeta/DiscountPrograms/DiscountProgramsSearchMeta"

export function DiscountProgramLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Discount Program"
      displayKey="Name"
      placeholder="Search By Discount Program Name"
      meta={DiscountProgramsSearchMeta as IField[]}
      metaName="DiscountProgramsSearchMeta"
      {...props}
      {...getDiscountProgramsTableColumns(true)}
      valueKey={props.valueKey || "DiscountProgramID"}
    />
  )
}

import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getDiscountProgramsTableColumns } from "~/TableSearchMeta/DiscountPrograms/DiscountProgramsTableColumns"
import { DiscountProgramsSearchMeta } from "~/TableSearchMeta/DiscountPrograms/DiscountProgramsSearchMeta"

interface IDiscountProgramLookup extends IGeneratedField {
  valueKey?: string
}
export function DiscountProgramLookup(props: IDiscountProgramLookup) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Discount Program"
      displayKey="Name"
      meta={DiscountProgramsSearchMeta as IField[]}
      metaName="DiscountProgramsSearchMeta"
      {...props}
      {...getDiscountProgramsTableColumns(true)}
      valueKey={props.valueKey || "DiscountProgramID"}
      // {...(props.defaultValue && {
      //   entityLookupFunc: () =>
      //     searchStudents({ StudentID: props.defaultValue }).then((x) => {
      //       if (x.success) return x.data[0]
      //       else return undefined
      //     })
      // })}
    />
  )
}

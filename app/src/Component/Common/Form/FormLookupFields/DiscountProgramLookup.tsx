import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Form/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getDiscountProgramsTableColumns } from "~/TableSearchMeta/DiscountPrograms/DiscountProgramsTableColumns"
import { DiscountProgramsSearchMeta } from "~/TableSearchMeta/DiscountPrograms/DiscountProgramsSearchMeta"

interface IDiscountProgramLookup extends IGeneratedField {
  valueField?: string
}
export function DiscountProgramLookup(props: IDiscountProgramLookup) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Discount Program"
      displayField="Name"
      meta={DiscountProgramsSearchMeta as IField[]}
      {...props}
      {...getDiscountProgramsTableColumns(true)}
      valueField={props.valueField || "DiscountProgramID"}
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

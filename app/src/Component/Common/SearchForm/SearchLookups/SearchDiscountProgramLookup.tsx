import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchForm/SearchLookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/SearchForm/common"
import { getDiscountProgramsTableColumns } from "~/FormMeta/DiscountPrograms/DiscountProgramsTableColumns"
import { DiscountProgramsSearchMeta } from "~/FormMeta/DiscountPrograms/DiscountProgramsSearchMeta"

interface ISearchDiscountProgramLookup extends IGeneratedField {
  valueField?: string
}
export function SearchDiscountProgramLookup(props: ISearchDiscountProgramLookup) {
  return (
    <SearchLookupOpenButton
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

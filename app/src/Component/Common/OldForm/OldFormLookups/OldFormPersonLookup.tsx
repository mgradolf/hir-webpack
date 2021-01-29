import * as React from "react"
import { PersonSearchMeta } from "~/FormMeta/Person/PersonSearchMeta"
import { OldFormLookupOpenButton } from "~/Component/Common/OldForm/OldFormLookupOpenButton"
import { FormInstance } from "antd/lib/form"
import { getPersonTableColumns } from "~/FormMeta/Person/PersonTableColumns"

export function OldFormPersonLookup(props: { formInstance: FormInstance; onCloseModal?: (person: any) => void }) {
  return (
    <OldFormLookupOpenButton
      lookupModalTitle="Select Person"
      valueField="PersonID"
      displayField="SortName"
      fieldName="PersonID"
      label="Person"
      formInstance={props.formInstance}
      {...getPersonTableColumns(true)}
      meta={PersonSearchMeta}
      onCloseModal={props.onCloseModal}
    />
  )
}

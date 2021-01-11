import * as React from "react"
import { PersonSearchMeta } from "~/FormMeta/Person/PersonSearchMeta"
import { FormLookupOpenButton } from "~/Component/Common/Form/FormLookupOpenButton"
import { FormInstance } from "antd/lib/form"
import { getPersonTableColumns } from "~/FormMeta/Person/PersonTableColumns"

export function FormPersonLookupButton(props: { formInstance: FormInstance; onCloseModal?: (person: any) => void }) {
  return (
    <FormLookupOpenButton
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

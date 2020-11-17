import * as React from "react"
import PersonSearchFilterMeta from "~/FormMeta/Person/PersonSearchFilterMeta"
import { FormLookupOpenButton } from "~/Component/Common/Form/FormLookupOpenButton"
import { searchPersons } from "~/ApiServices/BizApi/person/persongIF"
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
      searchFunc={searchPersons}
      columns={getPersonTableColumns(true)}
      meta={PersonSearchFilterMeta}
      onCloseModal={props.onCloseModal}
    />
  )
}

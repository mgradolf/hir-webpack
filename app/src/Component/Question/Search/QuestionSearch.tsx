import React from "react"
import { MetaDrivenForm } from "~/Component/Common/Form/MetaDrivenForm"
import { DROPDOWN, IField, TEXT } from "~/Component/Common/Form/common"
import { getOrganizations, getPreferenceValueType } from "~/ApiServices/Service/RefLookupService"

interface IQuestionSearch {
  onFormSubmission: (Params: any) => void
}

const QuestionSearchFiltersMeta: IField[] = [
  {
    label: "Name",
    inputType: TEXT,

    fieldName: "Name",
    ariaLabel: "Question Name"
  },
  {
    label: "Active",
    inputType: DROPDOWN,

    fieldName: "IsActive",
    ariaLabel: "Active",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" }
    ]
  },
  {
    label: "Department",
    inputType: DROPDOWN,
    fieldName: "OrganizationID",
    ariaLabel: "Department Select",
    refLookupService: getOrganizations,
    displayKey: "Name",
    valueKey: "OrganizationID"
  },
  {
    label: "Widget",
    inputType: DROPDOWN,

    fieldName: "PreferenceValueTypeID",
    ariaLabel: "Widget Type Select",
    refLookupService: getPreferenceValueType,
    displayKey: "Name",
    valueKey: "ID"
  }
]

export default function QuestionSearch(props: IQuestionSearch) {
  return (
    <MetaDrivenForm
      initialFormValue={{}}
      hideFilters={() => {
        console.log("do nothing")
      }}
      meta={QuestionSearchFiltersMeta}
      onApplyChanges={(newFilterValues, newFilterCount) => {
        props.onFormSubmission(newFilterValues)
      }}
    />
  )
}

import * as React from "react"
import { SectionSearchMeta } from "~/TableSearchMeta/Section/SectionSearchMeta"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { getSectionTableColumns } from "~/TableSearchMeta/Section/SectionTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { CUSTOM_FIELD, IField, IGeneratedField } from "~/Component/Common/Form/common"
import { IReportMeta } from "~/Pages/Reporting/Report/ReportMetaInterface"
import { SECTION_STATUS_CODE } from "~/utils/Constants"

function SectionLookup(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Section"
      valueKey="SectionID"
      displayKey="SectionNumber"
      meta={SectionSearchMeta.filter((x) => x.fieldName !== "SectionStatusCodeID") as IField[]}
      metaName="SectionSearchMeta"
      {...props}
      {...getSectionTableColumns(true)}
      {...(props.extraProps &&
        props.extraProps.defaultFormValue && {
          defaultFormValue: props.extraProps.defaultFormValue
        })}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Section", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}

const meta: IField[] = [
  {
    label: "Section",
    fieldName: "SectionID",
    rules: [{ required: true, message: "Section is Required" }],
    inputType: CUSTOM_FIELD,
    customFilterComponent: SectionLookup,
    extraProps: {
      isArray: true,
      defaultFormValue: {
        SectionStatusCodeID: SECTION_STATUS_CODE.CANCELLED
      }
    }
  }
]

const reportMeta: IReportMeta = {
  meta
}

export default reportMeta

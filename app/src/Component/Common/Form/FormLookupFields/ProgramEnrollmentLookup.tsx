import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { ProgramEnrollmentSearchMeta } from "~/TableSearchMeta/ProgramEnrollment/ProgramEnrollmentSearchMeta"
import { getProgramEnrollmentTableColumnsForLookup } from "~/TableSearchMeta/ProgramEnrollment/ProgramEnrollmentTableColumnsForLookup"

interface ILookupOpenButton extends IGeneratedField {
  valueField?: string
}
export function ProgramEnrollmentLookup(props: ILookupOpenButton) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Program Enrollment"
      displayField="ProgramCode"
      meta={ProgramEnrollmentSearchMeta as IField[]}
      metaName="ProgramEnrollmentSearchMeta"
      {...props}
      {...getProgramEnrollmentTableColumnsForLookup(true)}
      valueField={props.valueField || "ProgramEnrollmentID"}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Person", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}

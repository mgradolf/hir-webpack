import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Modal/LookupModal/LookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/Form/common"
import { OfferingSearchMeta } from "~/TableSearchMeta/Offering/OfferingSearchMeta"
import { getOfferingTableColumns } from "~/TableSearchMeta/Offering/OfferingTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export function OfferingLookupButton(props: IGeneratedField) {
  return (
    <LookupOpenButton
      lookupModalTitle="Select Offering"
      valueKey="OfferingID"
      displayKey="OfferingCode"
      meta={OfferingSearchMeta as IField[]}
      metaName="OfferingSearchMeta"
      {...props}
      formInstance={props.formInstance}
      {...getOfferingTableColumns(true)}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Offering", props.defaultValue).then((x) => {
            // if (x.success) x.data["OfferingCode"] = x.data.Name
            // console.log(x)
            return x.data
          })
      })}
    />
  )
}

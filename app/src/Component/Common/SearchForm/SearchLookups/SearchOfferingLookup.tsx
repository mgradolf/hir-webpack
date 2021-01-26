import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchForm/SearchLookupOpenButton"
import { IField, IGeneratedField } from "~/Component/Common/SearchForm/common"
import { OfferingSearchMeta } from "~/FormMeta/Offering/OfferingSearchMeta"
import { getOfferingTableColumns } from "~/FormMeta/Offering/OfferingTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export function SearchOfferingLookupButton(props: IGeneratedField) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Offering"
      valueField="OfferingID"
      displayField="OfferingCode"
      meta={OfferingSearchMeta as IField[]}
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

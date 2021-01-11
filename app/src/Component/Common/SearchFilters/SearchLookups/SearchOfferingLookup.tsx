import * as React from "react"
import { SearchLookupOpenButton } from "~/Component/Common/SearchFilters/SearchLookupOpenButton"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { OfferingSearchMeta } from "~/FormMeta/Offering/OfferingSearchMeta"
import { getOfferingTableColumns } from "~/FormMeta/Offering/OfferingTableColumns"
import { getEntityById } from "~/ApiServices/Service/EntityService"

export function SearchOfferingLookupButton(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  return (
    <SearchLookupOpenButton
      lookupModalTitle="Select Offering"
      valueField="OfferingID"
      displayField="OfferingCode"
      meta={OfferingSearchMeta}
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

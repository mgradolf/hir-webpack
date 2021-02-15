import * as React from "react"
import { LookupOpenButton } from "~/Component/Common/Form/LookupOpenButton"
import { IGeneratedField } from "~/Component/Common/Form/common"
import { getEntityById } from "~/ApiServices/Service/EntityService"
import { ResourceSearchMeta } from "~/FormMeta/Resource/ResourceSearchMeta"
import { getResourceTableColumns } from "~/FormMeta/Resource/ResourceTableColumns"

interface ILookupOpenButton extends IGeneratedField {
  valueField?: string
}
export function ResourceLookup(props: ILookupOpenButton) {
  return (
    <LookupOpenButton
      meta={ResourceSearchMeta}
      {...getResourceTableColumns()}
      lookupModalTitle="Select Resource"
      displayField="Name"
      {...props}
      valueField={props.valueField || "ResourceID"}
      {...(props.defaultValue && {
        entityLookupFunc: () =>
          getEntityById("Resource", props.defaultValue).then((x) => {
            return x.data
          })
      })}
    />
  )
}

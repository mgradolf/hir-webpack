import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
// import { IField } from "~/Component/Common/Form/common"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { getReferenceGenericTableColumn } from "~/FormMeta/ReferenceData/ReferenceGeneric/ReferenceGenericTableColumn"
import { ReferenceList } from "~/FormMeta/ReferenceData/ReferenceList"

export default function ReferenceDataListPage(props: RouteComponentProps<{ refName: string }>) {
  const refName = props?.match?.params?.refName
  // const [formMeta, setFormMeta] = useState<IField[]>([])
  const [reference, setReference] = useState<any>()
  useEffect(() => {
    const __reference = ReferenceList.find((x) => x.Value === refName)
    if (__reference) {
      setReference(__reference)
      // if (!__reference?.custom) {
      //   import("~/FormMeta/ReferenceData/ReferenceGeneric/ReferenceGenericFormMeta").then((x) => {
      //     setFormMeta(x.ReferenceGenericFormMeta)
      //   })
      // }
    }
  }, [refName])
  return (
    <>
      {reference && (
        <SearchPage
          title={reference?.Title || ""}
          tableProps={getReferenceGenericTableColumn(refName)}
          defaultFilter={{ LookUpName: refName }}
          initialFilter={{}}
          blocks={[]}
        />
      )}
    </>
  )
}

import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { AddRefButton } from "~/FormMeta/ReferenceData/ReferenceButtons"
import { getReferenceGenericTableColumn } from "~/FormMeta/ReferenceData/ReferenceGeneric/ReferenceGenericTableColumn"
import { ReferenceList } from "~/FormMeta/ReferenceData/ReferenceList"

export default function ReferenceDataListPage(props: RouteComponentProps<{ refName: string }>) {
  const refName = props?.match?.params?.refName
  const [reference, setReference] = useState<any>()
  useEffect(() => {
    const __reference = ReferenceList.find((x) => x.Value === refName)
    if (__reference) setReference(__reference)
    // eslint-disable-next-line
  }, [])
  return (
    <>
      {reference && (
        <SearchPage
          title={reference?.Title || ""}
          tableProps={getReferenceGenericTableColumn(refName)}
          defaultFilter={{ LookUpName: refName }}
          initialFilter={{}}
          blocks={[<AddRefButton LookUpName={refName} />]}
        />
      )}
    </>
  )
}

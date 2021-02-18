import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { getRefList } from "~/ApiServices/Service/RefLookupService"
import { IField } from "~/Component/Common/Form/common"
import { SearchPage } from "~/Component/Common/Page/SearchPage"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { AddRefButton, RemoveRefButton, UpdateRefButton } from "~/TableSearchMeta/ReferenceData/ReferenceButtons"
import { genericColumns } from "~/TableSearchMeta/ReferenceData/ReferenceGeneric/ReferenceGenericTableColumn"
import { ReferenceList } from "~/TableSearchMeta/ReferenceData/ReferenceList"

export default function ReferenceDataListPage(props: RouteComponentProps<{ refName: string }>) {
  const refName = props?.match?.params?.refName
  const refreshEventName = `REFRESH_${refName}`
  const [reference, setReference] = useState<any>()
  const [formMeta, setFormMeta] = useState<IField[]>([])
  const [columns, setColumns] = useState<TableColumnType>([])

  const getActionColumn = (formMeta: IField[], refName: string, refreshEventName: string) => ({
    title: "Actions",
    dataIndex: "ID",
    render: (ID: any, record: any) => (
      <>
        <UpdateRefButton
          formMeta={formMeta}
          LookUpName={refName}
          reference={record}
          refreshEventName={refreshEventName}
        />
        <RemoveRefButton ID={ID} LookUpName={refName} refreshEventName={refreshEventName} />
      </>
    )
  })

  useEffect(() => {
    const __reference = ReferenceList.find((x) => x.Value === refName)
    if (__reference) setReference(__reference)
    if (__reference) {
      if (__reference?.custom) {
        import(`~/TableSearchMeta/ReferenceData/ReferenceCustomFormMeta/${refName}`).then((x) => {
          setFormMeta(x.FormMeta)
          setColumns([...x.columns, getActionColumn(x.FormMeta, refName, refreshEventName)])
        })
      } else {
        import("~/TableSearchMeta/ReferenceData/ReferenceGeneric/ReferenceGenericFormMeta").then((x) => {
          setFormMeta(x.FormMeta)
          setColumns([...genericColumns, getActionColumn(x.FormMeta, refName, refreshEventName)])
        })
      }
    }

    // eslint-disable-next-line
  }, [])
  return (
    <>
      {reference && columns.length > 0 && (
        <SearchPage
          title={reference?.Title || ""}
          tableProps={{ columns, refreshEventName, searchFunc: getRefList }}
          defaultFormValue={{ LookUpName: refName }}
          initialFormValue={{}}
          blocks={[<AddRefButton LookUpName={refName} formMeta={formMeta} refreshEventName={refreshEventName} />]}
        />
      )}
    </>
  )
}

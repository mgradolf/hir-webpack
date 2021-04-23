import React from "react"
import { getProgramAdmReqs } from "~/ApiServices/BizApi/program/programIF"
import { renderBoolean, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { AdmissionReqRemoveLink } from "~/Component/Feature/ProgramAdmissionRequirement/AdmissionReqRemoveLink"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getProgramAdmissionReqTableColumns = (ProgramAdmReqGroupID: number): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Requirement",
      dataIndex: "Name"
    },
    {
      title: "Has Question",
      dataIndex: "PreferenceDefID",
      render: (text: any) => (text !== null ? "Yes" : "No")
    },
    {
      title: "Need Proof",
      dataIndex: "NeedProof",
      render: renderBoolean
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => <AdmissionReqRemoveLink ProgramAdmReqID={record.ProgramAdmReqID} />
    }
  ]

  return {
    columns,
    searchFunc: () => getProgramAdmReqs({ ProgramAdmReqGroupID: ProgramAdmReqGroupID }),
    tableName: "AdmissionReqTableColumns"
  }
}

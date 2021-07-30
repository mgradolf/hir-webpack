import { renderDate, renderDetailsLink, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { getLiteRequests } from "~/ApiServices/Service/RequestService"

export const getRequestTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      dataIndex: "RequestID",
      render: (text: any, record: any) => renderDetailsLink(`/request/${text}`)
    },
    {
      title: "Request Date",
      dataIndex: "CreateDate",
      key: "CreateDate",
      render: renderDate
    },
    {
      title: "Purchaser",
      dataIndex: "PurchaserPersonName",
      render: (text: any, record: any) => renderLink(`/person/${record.PurchaserPersonID}`, text),
      key: "PurchaserPersonName"
    },
    {
      title: "Account",
      dataIndex: "AccountName",
      render: (text: any, record: any) => renderLink(`/account/${record.AccountID}`, text),
      key: "AccountName"
    },
    {
      title: "Request Type",
      dataIndex: "RequestType",
      key: "RequestType"
    },
    {
      title: "Request Status",
      dataIndex: "State",
      key: "State"
    },
    {
      title: "Source",
      dataIndex: "Source",
      key: "Source"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return {
    columns,
    responsiveColumnIndices,
    expandableColumnIndices,
    searchFunc: (Params: { [key: string]: any }) => {
      if (Params["SectionID"] !== undefined) {
        Params["ProductID"] = Params["SectionID"]
        Params["ProductType"] = "SectionID"
      }
      return getLiteRequests(Params).then((x: any) => {
        if (x.success) {
          x.data = x?.data?.Requests
        }

        return x
      })
    }
  }
}

import { findMembershipBeneficiaries } from "~/ApiServices/BizApi/membership/membershipIF"
import { renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getMembershipBeneficiariesTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Contact Name",
      dataIndex: "PersonName",
      key: "PersonName",
      render: (text: any, record: any) => renderDetailsLink(`/person/${record.PersonID}`)
    },
    {
      title: "Source",
      dataIndex: "SourceName",
      key: "SourceName"
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return {
    columns,
    responsiveColumnIndices,
    expandableColumnIndices,
    searchFunc: (Params: { [key: string]: any }) =>
      findMembershipBeneficiaries([Params.MembershipTermID, Params.PersonID])
  }
}

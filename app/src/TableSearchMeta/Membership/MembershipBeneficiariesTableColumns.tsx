import { findMembershipBeneficiaries } from "~/ApiServices/BizApi/membership/membershipIF"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getMembershipBeneficiariesTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Contact Name",
      dataIndex: "PersonName"
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
      findMembershipBeneficiaries({ MembershipTermID: Params.MembershipTermID, PersonID: Params.PersonID })
  }
}

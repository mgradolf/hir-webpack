import { renderDate, renderDetailsLink, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"
//TODO: API fix 
import { findMembershipBeneficiaries } from "~/ApiServices/Service/RequestService"

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
    searchFunc: findMembershipBeneficiaries
  }
}
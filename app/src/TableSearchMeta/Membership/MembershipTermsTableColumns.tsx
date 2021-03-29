import { findMebershipTerms } from "~/ApiServices/BizApi/membership/membershipIF"
import { renderBoolean, renderDate, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getMembershipTermsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Membership Program",
      dataIndex: "MembershipProgramName",
      key: "MembershipProgramName",
      render: (text: any, record: any) => renderLink(`/membership-program/${record.MembershipProgramID}`, text)
    },
    {
      title: "Term Start",
      dataIndex: "TermStartDate",
      key: "TermStartDate",
      render: renderDate
    },
    {
      title: "Term End",
      dataIndex: "TermExpirationDate",
      key: "TermExpirationDate",
      render: renderDate
    },
    {
      title: "Source",
      dataIndex: "SourceName",
      key: "SourceName"
    },
    {
      title: "Returned",
      dataIndex: "IsReturned",
      key: "IsReturned",
      render: renderBoolean
    }
  ]

  return {
    columns,
    searchFunc: (Params: { [key: string]: any }) => findMebershipTerms({ MembershipID: Params.MembershipID }),
    tableName: "MembershipTermsTableColumns"
  }
}

import { getMembershipCollection } from "~/ApiServices/Service/MembershipService"
import {
  renderBoolean,
  renderDate,
  renderDetailsLink,
  renderEmail,
  renderLink,
  TableColumnType
} from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getMembershipTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "MembershipID",
      key: "MembershipID",
      render: (text: any, record: any) => renderDetailsLink(`/membership/${record.MembershipID}`)
    },
    {
      title: "Member Since",
      dataIndex: "MemberSince",
      key: "MemberSince",
      render: renderDate
    },
    {
      title: "Member",
      dataIndex: "PersonName",
      render: (text: any, record: any) => renderLink(`/person/${record.PersonID}`, text),
      key: "PersonName"
    },
    {
      title: "Email",
      dataIndex: "EmailAddress",
      render: renderEmail,
      key: "EmailAddress"
    },
    {
      title: "Membership Program",
      dataIndex: "MembershipProgramName",
      render: (text: any, record: any) => renderLink(`/membershipprogram/${record.MembershipProgramID}`, text),
      key: "MembershipProgramName"
    },
    {
      title: "Level",
      dataIndex: "MembershipDefinitionName",
      key: "MembershipDefinitionName"
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      key: "IsActive",
      render: renderBoolean
    },
    {
      title: "Renewed",
      dataIndex: "IsRenewed",
      key: "IsRenewed",
      render: renderBoolean
    }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return {
    columns,
    responsiveColumnIndices,
    expandableColumnIndices,
    searchFunc: getMembershipCollection
  }
}

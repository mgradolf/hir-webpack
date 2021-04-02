import { searchPersons } from "~/ApiServices/BizApi/person/personIF"
import { renderBoolean, renderDate, renderEmail, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getPersonTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "SortName",
      render: (text: any, record: any) => renderLink(`/person/${record.PersonID}`, text, isModal)
    },
    { title: "Email", dataIndex: "EmailAddress", render: renderEmail },
    { title: "Telephone", dataIndex: "TelephoneNumber" },
    { title: "BirthDate ", dataIndex: "Birthday", render: renderDate },
    { title: "City", dataIndex: "Locality" },
    { title: "ERP ID", dataIndex: "ERPID", hidden: false },

    { title: "AccountName", dataIndex: "AccountName", hidden: true }, //: null
    { title: "Address", dataIndex: "Address", hidden: true }, //: "546 ↵tampa,FL 33325"
    { title: "AddressLine1", dataIndex: "AddressLine1", hidden: true }, //: "546"
    { title: "AddressLine2", dataIndex: "AddressLine2", hidden: true }, //: ""
    { title: "AddressLine3", dataIndex: "AddressLine3", hidden: true }, //: ""
    { title: "Country", dataIndex: "Country", hidden: true }, //: "US"
    { title: "Ethnicity", dataIndex: "Ethnicity", hidden: true }, //: null
    { title: "FirstName", dataIndex: "FirstName", hidden: true }, //: "aff"
    { title: "GenderTypeName", dataIndex: "GenderTypeName", hidden: true }, //: "Unknown"
    { title: "GovID", dataIndex: "GovID", hidden: true }, //: null
    { title: "IsDeceased", dataIndex: "IsDeceased", render: renderBoolean, hidden: true }, //: false
    {
      title: "LastName",
      dataIndex: "LastName",
      render: (text: any, record: any) => renderLink(`/person/${record.PersonID}`, text, isModal),
      hidden: true
    }, //: "0324"
    {
      title: "MaidenName",
      dataIndex: "MaidenName",
      render: (text: any, record: any) => renderLink(`/person/${record.PersonID}`, text, isModal),
      hidden: true
    }, //: ""
    {
      title: "MiddleName",
      dataIndex: "MiddleName",
      render: (text: any, record: any) => renderLink(`/person/${record.PersonID}`, text, isModal),
      hidden: true
    }, //: null
    {
      title: "OtherName",
      dataIndex: "OtherName",
      render: (text: any, record: any) => renderLink(`/person/${record.PersonID}`, text, isModal),
      hidden: true
    }, //: ""
    {
      title: "PersonDescriptor",
      dataIndex: "PersonDescriptor",
      render: (text: any, record: any) => renderLink(`/person/${record.PersonID}`, text, isModal),
      hidden: true
    }, //: "aff 0324"
    {
      title: "PersonID",
      dataIndex: "PersonID",
      render: (text: any, record: any) => renderLink(`/person/${record.PersonID}`, text, isModal),
      hidden: true
    }, //: 14831
    { title: "PostalCode", dataIndex: "PostalCode", hidden: true }, //: "33325"
    { title: "RoleName", dataIndex: "RoleName", hidden: true }, //: null
    { title: "State", dataIndex: "State", hidden: true } //: "FL"
  ]

  return { columns, searchFunc: searchPersons, tableName: "PersonTableColumns" }
}

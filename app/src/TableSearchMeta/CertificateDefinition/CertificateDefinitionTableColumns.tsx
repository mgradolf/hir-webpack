import { searchCertificate } from "~/ApiServices/BizApi/certificate/certificateIF"
import { renderBoolean, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getCertificateDefinitionTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      dataIndex: "CertificateID",
      render: (text: any, record: any) => renderDetailsLink(`/data/certificate/${text}`)
    },
    {
      title: "Certificate Name",
      dataIndex: "Name"
    },
    {
      title: "Certificate Category",
      dataIndex: "CertificateCategoryTypeName"
    },
    {
      title: "Certificate Type",
      dataIndex: "CertificateType"
    },
    {
      title: "Department",
      dataIndex: "OrganizationName"
    },
    {
      title: "Active",
      dataIndex: "IsActive",
      render: renderBoolean
    }
  ]

  return {
    columns,
    searchFunc: searchCertificate,
    tableName: "CertificateDefinitionTableColumns"
  }
}

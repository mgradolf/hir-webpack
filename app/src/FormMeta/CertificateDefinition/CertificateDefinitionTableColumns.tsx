import { searchCertificateDefinitions } from "~/ApiServices/Service/RegistrationService"
import { renderDate, renderDetailsLink, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getCertificateDefinitionTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "CertificateNumber",
      render: (text: any, record: any) => renderDetailsLink(`/${route}/certificate/${record.StudentCertificateID}`)
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
  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: searchCertificateDefinitions }
}

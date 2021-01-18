import { searchCertificateDefinitions } from "~/ApiServices/BizApi/certificate/certificateIF"
import { renderBoolean, renderDetailsLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getCertificateDefinitionTableColumns = (): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "",
      dataIndex: "CertificateNumber",
      render: (text: any, record: any) => renderDetailsLink(`/certificate/${record.StudentCertificateID}`)
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
  return {
    columns,
    responsiveColumnIndices,
    expandableColumnIndices,
    searchFunc: (Params: { [key: string]: any }) => searchCertificateDefinitions([Params])
  }
}

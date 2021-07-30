import { searchCertificate } from "~/ApiServices/Service/RegistrationService"
import { renderDate, renderDetailsLink, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"

export const getCertificateTableColumns = (isCourse: boolean): ITableConfigProp => {
  const route = isCourse ? "course" : "program"
  const columns: TableColumnType = [
    {
      dataIndex: "StudentCertificateID",
      render: (text: any, record: any) => renderDetailsLink(`/${route}/certificate/${text}`)
    },
    {
      title: "Issue Date",
      dataIndex: "IssueDate",
      render: renderDate
    },
    {
      title: "Certificate Name",
      dataIndex: "CertificateName"
    },
    {
      title: "Certificate Number",
      dataIndex: "CertificateNumber"
    },
    {
      title: "Student",
      dataIndex: "StudentName",
      render: (text, record) => renderLink(`/person/student/${record.StudentID}`, text)
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      render: (text, record) => renderLink(`/offering/${record.OfferingID}`, text)
    }
  ]

  return {
    columns,
    searchFunc: searchCertificate,
    tableName: "CertificateTableColumns"
  }
}

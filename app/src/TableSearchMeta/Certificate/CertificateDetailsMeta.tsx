import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"

export const getCertificateDetailsMeta = (certificate: { [key: string]: any }): CardContainer[] => {
  const certificateInfo: CardContainer = {
    title: certificate.CertificateName,
    contents: [
      { label: "Certificate Number", value: certificate.CertificateNumber, render: undefined },
      { label: "Valid", value: certificate.PublishOnWeb, render: renderBoolean },
      { label: "Issue Date", value: certificate.IssueDate, render: renderDate },
      { label: "Expiration Date", value: certificate.ExpirationDate, render: renderDate },
      { label: "Student ID", value: certificate.StudentSerialNum, render: undefined },
      { label: "Student", value: certificate.StudentName, render: undefined },
      { label: "Address", value: certificate.Address, render: undefined },
      { label: "Offering Title", value: certificate.OfferingName, render: undefined },
      { label: "Program Title ", value: certificate.ProgramName, render: undefined },
      { label: "Issuing Department", value: certificate.IssuingDepartment, render: undefined },
      { label: "Issuing School", value: certificate.IssuingSchool, render: undefined },
      { label: "Section Number", value: certificate.SectionNumber, render: undefined },
      { label: "Completion Date", value: certificate.CompletionDate, render: renderDate }
    ]
  }
  return [certificateInfo]
}

import React from "react"
import { searchCertificateParams } from "~/ApiServices/BizApi/query/queryIf"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { CertificateDefinitionFormModal } from "~/Component/Feature/CertificateDefinition/CertificateDefinitionFormModal"
import { CertificateDefPreview } from "~/Component/Feature/CertificateDefinition/CertificateDefPreview"
import { CertificateDefRemoveLink } from "~/Component/Feature/CertificateDefinition/CertificateDefRemoveLink"

export const getCertificateDefinitionDetailsMeta = (certificate: { [key: string]: any }): IDetailsMeta => {
  const meta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    title: certificate.Name,
    cardActions: [
      <CertificateDefinitionFormModal initialValues={certificate} editMode={true} />,
      <CertificateDefPreview CertificateID={certificate.CertificateID} />,
      <CertificateDefRemoveLink CertificateID={certificate.CertificateID} />
    ],
    contents: [
      { label: "Certificate Type", value: certificate.CertificateType, render: undefined },
      { label: "Department", value: certificate.OrganizationName, render: undefined },
      { label: "Published On Web", value: certificate.PublishOnWeb, render: renderBoolean },
      { label: "Active", value: certificate.IsActive, render: renderBoolean },
      { label: "Category", value: certificate.CertificateCategoryTypeName, render: undefined },
      { label: "Prefix Format", value: certificate.PrefixFormat, render: undefined },
      { label: "Template Name", value: certificate.TemplateFileName, render: undefined },
      { label: "Valid Months", value: certificate.ValidityMonths, render: undefined },
      { label: "Description ", value: certificate.Description, render: undefined }
    ]
  }
  meta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })
  meta.push({
    tabTitle: "Static parameter/value",
    tabType: "table",
    tabMeta: {
      tableProps: {
        columns: [
          { title: "Parameter Name", dataIndex: "Name" },
          { title: "Parameter Value", dataIndex: "Value" }
        ],
        searchFunc: searchCertificateParams,
        searchParams: { certificateID: certificate.CertificateID },
        refreshEventName: "REFRESH_CONTACT_TAB"
      }
    }
  })
  return { tabs: meta }
}

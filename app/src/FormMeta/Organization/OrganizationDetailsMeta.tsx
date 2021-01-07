import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
export const getOrganizationDetailsMeta = (organization: { [key: string]: any }): IDetailsMeta => {
  const tabMeta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Name", value: organization.Name },
      { label: "Short Name", value: organization.ShortName },
      { label: "Informal Name", value: organization.InformalName },
      { label: "Description", value: organization.Description },
      {
        label: "Parent Org",
        value: organization.ParentOrgName,
        render: (text: any) => <Link to={`/organization/${organization.ParentOrganizationId}`}>{text}</Link>
      },
      { label: "FEID", value: organization.FEID },
      { label: "Selected Gateway", value: organization.PaymentGatewayAccount },
      { label: "Employee Count", value: organization.EmployeeCount },
      { label: "School Code", value: organization.SchoolCodeID },
      { label: "School Name", value: organization.SchoolName }
    ]
  }

  tabMeta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  return {
    pageTitle: `${organization.Name}`,
    tabs: tabMeta
  }
}

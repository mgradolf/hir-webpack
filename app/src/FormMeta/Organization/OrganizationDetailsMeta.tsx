import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import { getTagsTabPageDetailsMeta } from "~/FormMeta/Tags/TagsTabPageDetailsMeta"
import { QuestionTaggingSearchMeta } from "~/FormMeta/QuestionTagging/QuestionTaggingSearchMeta"
import { getQuestionTaggingTableColumns } from "~/FormMeta/QuestionTagging/QuestionTaggingTableColumn"
import { getOrganizationCalendarTableColumns } from "~/FormMeta/Organization/OrganizationCalendarTableColumns"

export const getOrganizationDetailsMeta = (organization: { [key: string]: any }): IDetailsMeta => {
  const tabMeta: IDetailsTabMeta[] = []
  const Organization: CardContainer = {
    title: "Organization",
    contents: [
      { label: "Organization Type", value: organization.OrganizationType },
      { label: "Short Name", value: organization.ShortName },
      { label: "Informal Name", value: organization.InformalName },
      { label: "Description", value: organization.Description },
      {
        label: "Parent Org",
        value: organization.ParentOrgName,
        render: (text: any) => <Link to={`/data/organization/${organization.ParentOrganizationId}`}>{text}</Link>
      },
      { label: "FEID", value: organization.FEID },
      { label: "Employee Count", value: organization.EmployeeCount },
      {
        label: "School Name",
        value: organization.SchoolName,
        render: (name) => <Link to={`/school/${organization.SchoolCodeID}`}>{name}</Link>
      },
      { label: "Selected Gateway", value: organization.PaymentGatewayAccount }
    ]
  }

  const WebConfig: CardContainer = {
    title: "Web Configuration",
    contents: [
      { label: "Title", value: organization.WebTitle },
      { label: "Logo", value: organization.WebLogo },
      { label: "Published", value: organization.WebPublish, render: renderBoolean },
      { label: "Url", value: organization.WebLink, render: (link) => <a href={link}>{link}</a> }
    ]
  }

  tabMeta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [Organization, WebConfig]
    }
  })

  tabMeta.push({
    tabTitle: "Tags",
    tabType: "summary",
    tabMeta: [],
    multipleTabMetas: getTagsTabPageDetailsMeta({ EntityType: "Organization", EntityID: organization.OrganizationID })
      .tabs
  })

  tabMeta.push({
    tabTitle: "Tagged Questions",
    tabType: "searchtable",
    tabMeta: {
      searchMeta: QuestionTaggingSearchMeta,
      defaultFilter: { OrganizationID: organization.OrganizationID },
      initialFilter: { EventID: 2 },
      tableProps: {
        pagination: false,
        ...getQuestionTaggingTableColumns(true),
        searchParams: { OrganizationID: organization.OrganizationID },
        refreshEventName: "REFRESH_ORGANIZATION_TAGGED_QUESTION"
      }
    }
  })

  tabMeta.push({
    tabTitle: "Calender",
    tabType: "table",
    tabMeta: {
      tableProps: {
        pagination: false,
        ...getOrganizationCalendarTableColumns(true),
        searchParams: { OrganizationID: organization.OrganizationID },
        refreshEventName: "REFRESH_ORGANIZATION_CALENDER"
      }
    }
  })

  return {
    pageTitle: `${organization.Name}`,
    tabs: tabMeta
  }
}

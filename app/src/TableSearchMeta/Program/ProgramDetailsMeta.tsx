import React from "react"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import { getTagsTabPageDetailsMeta } from "~/TableSearchMeta/Tags/TagsTabPageDetailsMeta"
import { getSeatgroupTableColumns } from "~/TableSearchMeta/Seatgroup/SeatgroupTableColumns"
import { getProgramCatalogTableColumns } from "~/TableSearchMeta/Program/ProgramCatalogTableColumns"
import { getProgramApplicationTableColumns } from "~/TableSearchMeta/ProgramApplication/ProgramApplicationTableColumns"
import { getProgramEnrollmentTableColumns } from "~/TableSearchMeta/ProgramEnrollment/ProgramEnrollmentTableColumns"
import {
  REFRESH_PROGRAM_SEATGROUP_PAGE,
  REFRESH_PROGRAM_CATALOG_PAGE,
  REFRESH_PROGRAM_APPLICATION_PAGE,
  REFRESH_PROGRAM_ENROLLMENT_PAGE,
  REFRESH_PAGE
} from "~/utils/EventBus"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import AdmissionRequirementPage from "~/Pages/Manage/Program/Program/AdmissionRequirementPage"
import { ProgramFormOpenButton } from "~/Component/Feature/Program/Forms/ProgramForm"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { deleteProgramWithEvent, saveProgramWithEvent } from "~/ApiServices/BizApi/program/programIF"
import { InlineForm } from "~/Component/Common/Form/InlineForm"
import { getProgramStatusCodes } from "~/ApiServices/Service/RefLookupService"
import { getProgramNotificationTableColumns } from "~/TableSearchMeta/ProgramNotification/ProgramNotificationTableColumns"
import { getProgramOfferingRequirementsTableColumns } from "~/TableSearchMeta/ProgramOfferingRequirements/ProgramOfferingRequirementsTableColumns"
import { ProgramOfferingRequirementsGroupFormOpenButton } from "~/Component/Feature/ProgramOfferingRequirementsGroup/ProgramOfferingRequirementsGroupFormOpenButton"
import { getProgramFinancialTableColumns } from "~/TableSearchMeta/ProgramFinancial/ProgramFinancialTableColumns"
import { ProgramFinancialFormOpenButton } from "~/Component/Feature/ProgramFinancial/ProgramFinancialFormOpenButton"
import { MetaDrivenFormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { DATE_PICKER, NUMBER } from "~/Component/Common/Form/common"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"
import { Typography } from "antd"

export const getProgramDetailsMeta = (program: { [key: string]: any }): IDetailsMeta => {
  const info: CardContainer = {
    cardActions: [
      <ProgramFormOpenButton
        helpKey="programSummaryEditProgramForm"
        iconType="edit"
        editMode={true}
        ProgramID={program.ProgramID}
      />,
      <IconButton
        toolTip="Delete Program"
        iconType="remove"
        onClickRemove={() => deleteProgramWithEvent({ ProgramID: program.ProgramID })}
        redirectTo="/program"
      />
    ],
    title: "Program Details",
    contents: [
      { label: "Name", value: program.Name },
      {
        label: "Description",
        value: program.Description,
        render: (text: any) => (
          <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>{text}</Typography.Paragraph>
        )
      },
      {
        label: "Status",
        value: (
          <InlineForm
            fieldName="ProgramStatusCodeID"
            refreshEventName="REFRESH"
            inputType="DROPDOWN"
            displayKey="Name"
            valueKey="StatusID"
            defaultValue={program.ProgramStatusCodeID}
            updateFunc={(Params: { [key: string]: any }) =>
              saveProgramWithEvent({ ProgramID: program.ProgramID, ...Params })
            }
            refLookupService={getProgramStatusCodes}
          />
        ),
        cssClass: "highlight"
      },
      { label: "Start Date", value: program.ProgramStartDate, render: renderDate },
      { label: "End Date", value: program.ProgramEndDate, render: renderDate },
      { label: "Department", value: program.DepartmentName },
      { label: "Inquiry Recipient", value: program.SubmitInquiryToUserID },
      { label: "Certificate/License", value: program.CertificateName },
      { label: "Selected Gateway", value: program.PaymentGatewayAccountName },
      { label: "Default Gateway", value: program.DefaultPaymentGatewayAccountName },
      { label: "Number of Months from the first Offering taken", value: program.CompletionMonth }
    ]
  }

  const application: CardContainer = {
    title: "Application",
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formMeta={[
          { label: "Application Start Date", inputType: DATE_PICKER, fieldName: "ApplicationStartDate" },
          { label: "Application End Date", inputType: DATE_PICKER, fieldName: "ApplicationEndDate" }
        ]}
        formTitle="Edit Program Application"
        initialFormValue={{
          ApplicationStartDate: program.ApplicationStartDate,
          ApplicationEndDate: program.ApplicationEndDate
        }}
        defaultFormValue={{ ProgramID: program.ProgramID }}
        formSubmitApi={saveProgramWithEvent}
        refreshEventName={REFRESH_PAGE}
        helpkey="programSummaryEditProgramApplicationForm"
        buttonLabel={`Edit`}
        iconType="edit"
      />
    ],
    contents: [
      // { label: "Application Required", value: "" },
      { label: "Start Date", value: program.ApplicationStartDate, render: renderDate },
      { label: "End Date", value: program.ApplicationEndDate, render: renderDate }
    ]
  }

  const enrollment: CardContainer = {
    title: "Enrollment",
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formMeta={[
          { label: "Enrollment Start Date", inputType: DATE_PICKER, fieldName: "EnrollmentStartDate" },
          { label: "Enrollment End Date", inputType: DATE_PICKER, fieldName: "EnrollmentEndDate" },
          { label: "Seat Capacity", inputType: NUMBER, fieldName: "SeatCapacity" }
        ]}
        formTitle="Edit Program Enrollment"
        initialFormValue={{
          EnrollmentStartDate: program.EnrollmentStartDate,
          EnrollmentEndDate: program.EnrollmentEndDate,
          SeatCapacity: program.SeatCapacity
        }}
        defaultFormValue={{ ProgramID: program.ProgramID }}
        formSubmitApi={saveProgramWithEvent}
        refreshEventName={REFRESH_PAGE}
        buttonLabel={`Edit`}
        iconType="edit"
        helpkey="programSummaryEditProgramEnrollmentForm"
      />
    ],
    contents: [
      { label: "Start Date", value: program.EnrollmentStartDate, render: renderDate },
      { label: "End Date", value: program.EnrollmentEndDate, render: renderDate },
      { label: "Seat Capacity", value: program.SeatCapacity }
    ]
  }

  const catalogMeta: IDetailsTableTabProp = {
    blocks: [<HelpButton helpKey="programCatalogsTab" />],
    tableProps: {
      ...getProgramCatalogTableColumns(program.ProgramID),
      searchParams: { ProgramID: program.ProgramID },
      refreshEventName: REFRESH_PROGRAM_CATALOG_PAGE
    }
  }

  const applicationMeta: IDetailsTableTabProp = {
    blocks: [<HelpButton helpKey="programApplicationsTab" />],
    tableProps: {
      ...getProgramApplicationTableColumns(),
      searchParams: { programID: program.ProgramID },
      refreshEventName: REFRESH_PROGRAM_APPLICATION_PAGE
    }
  }

  const enrollmentMeta: IDetailsTableTabProp = {
    blocks: [<HelpButton helpKey="programEnrollmentsTab" />],
    tableProps: {
      ...getProgramEnrollmentTableColumns(),
      searchParams: { programID: program.ProgramID },
      refreshEventName: REFRESH_PROGRAM_ENROLLMENT_PAGE
    }
  }

  const seatgroupMeta: IDetailsTableTabProp = {
    blocks: [<HelpButton helpKey="programSeatGroupsTab" />],
    tableProps: {
      ...getSeatgroupTableColumns(false, undefined, undefined, program.ProgramID),
      searchParams: { ProgramID: program.ProgramID },
      refreshEventName: REFRESH_PROGRAM_SEATGROUP_PAGE
    }
  }

  const admissionRequirementMeta: IDetailsCustomTabProp = {
    component: AdmissionRequirementPage,
    props: { programID: program.ProgramID }
  }

  const summaryMeta: IDetailsSummary = {
    actions: [<HelpButton helpKey="programSummaryTab" />],
    summary: [info, application, enrollment]
  }

  return {
    pageTitle: `Program Code - ${program.ProgramCode}`,
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Catalogs",
        tabType: "table",
        tabMeta: catalogMeta
      },
      {
        tabTitle: "Seat Groups",
        tabType: "table",
        tabMeta: seatgroupMeta
      },
      {
        tabTitle: "Admission Requirements",
        tabType: "custom",
        tabMeta: admissionRequirementMeta
      },
      {
        tabTitle: "Applications",
        tabType: "table",
        tabMeta: applicationMeta
      },
      {
        tabTitle: "Enrollments",
        tabType: "table",
        tabMeta: enrollmentMeta
      },
      {
        tabTitle: "Tags",
        tabType: "summary",
        // // tabMeta: [],
        multipleTabMetas: getTagsTabPageDetailsMeta("Program", program.ProgramID).tabs
      },
      {
        tabTitle: "Notifications",
        tabType: "table",
        tabMeta: {
          actions: [],
          tableProps: {
            ...getProgramNotificationTableColumns(),
            searchParams: { ProgramID: program.ProgramID },
            refreshEventName: "REFRESH_NOTIFICATION_PROGRAM"
          }
        }
      },
      {
        tabTitle: "Offering Requirements",
        tabType: "table",
        tabMeta: {
          blocks: [
            <ProgramOfferingRequirementsGroupFormOpenButton
              editMode={false}
              OfferingGroup={{ ProgramID: program.ProgramID }}
            />,
            <HelpButton helpKey="programOfferingRequirementsTab" />
          ],
          tableProps: {
            ...getProgramOfferingRequirementsTableColumns(),
            searchParams: { ProgramID: program.ProgramID },
            refreshEventName: "REFRESH_PROGRAM_OFFERING_REQUIREMENT"
          }
        }
      },
      {
        tabTitle: "Program Financial",
        tabType: "table",
        tabMeta: {
          blocks: [
            <ProgramFinancialFormOpenButton editMode={false} ProgramFinancial={{ ProgramID: program.ProgramID }} />,
            <HelpButton helpKey="programProgramFinancialTab" />
          ],
          tableProps: {
            ...getProgramFinancialTableColumns(),
            searchParams: { ProgramID: program.ProgramID },
            refreshEventName: "REFRESH_PROGRAM_FINANCIAL"
          }
        }
      }
    ]
  }
}

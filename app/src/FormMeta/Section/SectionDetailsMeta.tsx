import React, { useState } from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/DetailsPage"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"
import SectionEditLink from "~/Component/Section/CreateEdit/SectionEditLink"
import SectionSchedulePage from "~/Pages/Section/Schedule/SchedulePage"
import {
  REFRESH_SECTION_BUDGET_PAGE,
  REFRESH_SECTION_DISCOUNT_PAGE,
  REFRESH_SECTION_REGISTRATION_PAGE,
  REFRESH_SECTION_SEATGROUP_PAGE
} from "~/utils/EventBus"
import { getRegistrationTableColumns } from "~/FormMeta/Registration/RegistrationTableColumns"
import { getSectionFinancialTableColumns } from "~/FormMeta/SectionFinancial/FinancialTableColumns"
import { Button } from "antd"
import CreateNewBudget from "~/Component/Section/Budget/BudgetFormModal"
import { getSectionSeatgroupTableColumns } from "~/FormMeta/SectionSeatgroup/SeatgroupTableColumns"
import CreateSeatGroup from "~/Component/Section/SeatGroup/SectionSeatGroupFormModal"
import { getSectionDiscountTableColumns } from "~/FormMeta/SectionDiscount/DiscountTableColumns"
import CreateNewDiscount from "~/Component/Section/Discount/DiscountFormModal"
import SectionCatalogPage from "~/Pages/Section/Catalog/CatalogPage"

export const getSectionDetailsMeta = (section: { [key: string]: any }): IDetailsMeta[] => {
  const sectionInfo: CardContainer = {
    title: section.OfferingName,
    cardActions: [<SectionEditLink section={section} PrimaryType={true} />],
    contents: [
      { label: "Description", value: section.Description, render: undefined },
      { label: "Status", value: section.StatusCode, render: undefined },
      { label: "URL", value: section.URL, render: undefined },
      { label: "Distance Learning", value: section.IsDistanceLearning, render: renderBoolean },
      { label: "StartDate", value: section.StartDate, render: renderDate },
      { label: "EndDate", value: section.EndDate, render: renderDate },
      { label: "Final Enrollment Date", value: section.FinalEnrollmentDate, render: renderDate },
      { label: "Billing Date", value: section.BillingDate, render: renderDate },
      { label: "Effective Creation Date", value: section.EffectiveCreationDate, render: renderDate },
      { label: "Effective Termination Date", value: section.EffectiveTerminationDate, render: renderDate },
      { label: "Fiscal Period", value: section.FiscalPeriodCodeName, render: undefined }
    ]
  }
  const enrollmentInfo: CardContainer = {
    title: "Enrollment",
    contents: [
      { label: "Current Enrollment", value: section.TotalEnrolledSeats, render: undefined },
      { label: "Minimum Enrollment", value: section.MinEnrollment, render: undefined },
      { label: "Maximum Enrollment", value: section.MaxEnrollment, render: undefined },
      { label: "Estimated Enrollment", value: section.TotalEstimatedEnrollments, render: undefined },
      { label: "Total Seats", value: section.TotalSeats, render: undefined },
      { label: "Total Seat Groups", value: section.TotalSeatGroups, render: undefined },
      { label: "Total Seats Used", value: section.TotalUsedSeats, render: undefined },
      { label: "Total Seats Available", value: section.TotalAvailableSeats, render: undefined }
    ]
  }

  const gradeInfo: CardContainer = {
    title: "Grades and Credits",
    contents: [
      { label: "Grade Scale", value: section.GradeScaleTypeName, render: undefined },
      { label: "Credit Type", value: section.CreditTypeName, render: undefined },
      { label: "Credit Hours", value: section.CreditHours, render: undefined },
      { label: "Clock Hours", value: section.ClockHours, render: undefined },
      { label: "Load Hours", value: section.LoadHours, render: undefined },
      { label: "CEUs", value: section.CEUHours, render: undefined },
      { label: "Expected Attendance", value: section.AttendanceExpected, render: undefined },
      { label: "Attendance Unit", value: section.AttendanceUnit, render: undefined }
    ]
  }

  const FinancialFormModalOpenButton = (props: { SectionID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal && setShowModal(true)}>
            + Create Budget Financials
          </Button>
        )}
        {showModal && <CreateNewBudget sectionId={props.SectionID} closeModal={() => setShowModal(false)} />}
      </>
    )
  }

  const SeatgroupFormModalOpenButton = (props: { SectionID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal && setShowModal(true)}>
            + Create Seat Group
          </Button>
        )}
        {showModal && <CreateSeatGroup sectionId={props.SectionID} closeModal={() => setShowModal(false)} />}
      </>
    )
  }

  const DiscountFormModalOpenButton = (props: { SectionID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal && setShowModal(true)}>
            + Add Discount Program
          </Button>
        )}
        {showModal && <CreateNewDiscount sectionId={props.SectionID} closeModal={() => setShowModal(false)} />}
      </>
    )
  }

  const summaryMeta: IDetailsSummary = {
    summary: [sectionInfo, enrollmentInfo, gradeInfo]
  }

  const scheduleMeta: IDetailsCustomTabProp = {
    component: SectionSchedulePage,
    props: { sectionID: section.SectionID }
  }

  const financialMeta: IDetailsTableTabProp = {
    blocks: [<FinancialFormModalOpenButton SectionID={section.SectionID} />],
    tableProps: {
      ...getSectionFinancialTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: REFRESH_SECTION_BUDGET_PAGE
    }
  }

  const seatgroupMeta: IDetailsTableTabProp = {
    blocks: [<SeatgroupFormModalOpenButton SectionID={section.SectionID} />],
    tableProps: {
      ...getSectionSeatgroupTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: REFRESH_SECTION_SEATGROUP_PAGE
    }
  }

  const discountMeta: IDetailsTableTabProp = {
    blocks: [<DiscountFormModalOpenButton SectionID={section.SectionID} />],
    tableProps: {
      ...getSectionDiscountTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: REFRESH_SECTION_DISCOUNT_PAGE
    }
  }

  const catalogMeta: IDetailsCustomTabProp = {
    component: SectionCatalogPage,
    props: { sectionID: section.SectionID }
  }

  const registrationMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getRegistrationTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: REFRESH_SECTION_REGISTRATION_PAGE
    }
  }

  return [
    {
      title: "Summary",
      type: "summary",
      meta: summaryMeta
    },
    {
      title: "Schedules",
      type: "custom",
      meta: scheduleMeta
    },
    {
      title: "Financials",
      type: "table",
      meta: financialMeta
    },
    {
      title: "Seat Groups",
      type: "table",
      meta: seatgroupMeta
    },
    {
      title: "Discounts",
      type: "table",
      meta: discountMeta
    },
    {
      title: "Catalogs",
      type: "custom",
      meta: catalogMeta
    },
    {
      title: "Registrations",
      type: "table",
      meta: registrationMeta
    }
  ]
}

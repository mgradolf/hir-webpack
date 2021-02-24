import React, { useState } from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean, renderDate } from "~/Component/Common/ResponsiveTable"
import SectionEditLink from "~/Component/Section/CreateEdit/SectionEditLink"
import SectionSchedulePage from "~/Pages/Manage/Courses/Section/Schedule/SchedulePage"
import { getRegistrationTableColumns } from "~/TableSearchMeta/Registration/RegistrationTableColumns"
import { getSectionFinancialTableColumns } from "~/TableSearchMeta/SectionFinancial/FinancialTableColumns"
import { Button } from "antd"
import { getSeatgroupTableColumns } from "~/TableSearchMeta/Seatgroup/SeatgroupTableColumns"
import CreateSeatGroup from "~/Component/Section/SeatGroup/SectionSeatGroupFormModal"
import { getSectionDiscountTableColumns } from "~/TableSearchMeta/SectionDiscount/DiscountTableColumns"
import { getNoticeTableColumns } from "~/TableSearchMeta/Notice/NoticeTableColumns"
import SectionCatalogPage from "~/Pages/Manage/Courses/Section/Catalog/CatalogPage"
import { getSectionProductTableColumns } from "~/TableSearchMeta/SectionProduct/ProductTableColumns"
import { ProductAddButton } from "~/Component/Section/Product/ProductAddButton"
import { getRequestTableColumns } from "~/TableSearchMeta/Request/RequestTableColumns"
import { getWaitlistEntriesTableColumns } from "~/TableSearchMeta/WaitlistEntries/WaitlistEntryTableColumns"
import { WaitlistEntryCreateEditFormModal } from "~/Component/Section/WaitlistEntries/CreateEdit/FormModal"
import SectionNoShowPage from "~/Pages/Manage/Courses/Section/NoShowPage"
import { getTagsTabPageDetailsMeta } from "~/TableSearchMeta/Tags/TagsTabPageDetailsMeta"
import { getGeneralCommentTableColumns } from "~/TableSearchMeta/SectionComment/GeneralCommentTableColumns"
import { getInstructorCommentTableColumns } from "~/TableSearchMeta/SectionComment/InstructorCommentTableColumns"
import { COMMENT_TYPES } from "~/utils/Constants"
import CommentCreateModalOpenButton from "~/Component/Comment/CommentAddLink"
import { AddDiscountButton } from "~/Component/Discount/AddDiscountButton"
import { SectionRemoveButton } from "~/Component/Section/CreateEdit/SectionRemoveButton"
import { getEnrollmentTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentTableColumns"
import { getOrderItemTableColumns } from "~/TableSearchMeta/OrderItem/OrderItemsTableColumns"
import { getAcademicActivityLogTableColumns } from "~/TableSearchMeta/Academic/AcademicActivityTableColumns"
import { getEnrollmentActivityLogTableColumns } from "~/TableSearchMeta/EnrollmentActivity/EnrollmentActivityTableColumns"
import FinancialMenu from "~/TableSearchMeta/Financial/FinancialMenu"
import { QuestionTaggingSearchMeta } from "~/TableSearchMeta/QuestionTagging/QuestionTaggingSearchMeta"
import { getQuestionTaggingTableColumns } from "~/TableSearchMeta/QuestionTagging/QuestionTaggingTableColumn"

export const REFRESH_SECTION_BUDGET_PAGE = "REFRESH_SECTION_BUDGET_PAGE"

export const getSectionDetailsMeta = (section: { [key: string]: any }): IDetailsMeta => {
  const sectionInfo: CardContainer = {
    cardActions: [<SectionEditLink section={section} PrimaryType={true} />, <SectionRemoveButton Section={section} />],
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

  const WaitlistEntryFormModalOpenButton = (props: { SectionID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal && setShowModal(true)}>
            + Add Waitlist Entry
          </Button>
        )}
        {showModal && (
          <WaitlistEntryCreateEditFormModal SectionID={props.SectionID} closeModal={() => setShowModal(false)} />
        )}
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
    blocks: [<FinancialMenu dataLoaded={section} />],
    tableProps: {
      ...getSectionFinancialTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: REFRESH_SECTION_BUDGET_PAGE
    }
  }

  const seatgroupMeta: IDetailsTableTabProp = {
    blocks: [<SeatgroupFormModalOpenButton SectionID={section.SectionID} />],
    tableProps: {
      ...getSeatgroupTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_SEATGROUP_PAGE_1"
    }
  }

  const discountMeta: IDetailsTableTabProp = {
    blocks: [<AddDiscountButton sectionId={section.SectionID} />],
    tableProps: {
      ...getSectionDiscountTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_DISCOUNT_PAGE_1"
    }
  }

  const catalogMeta: IDetailsCustomTabProp = {
    component: SectionCatalogPage,
    props: { sectionID: section.SectionID }
  }

  const notificationMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getNoticeTableColumns(section.SectionID),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_NOTIFICATION_PAGE_1"
    }
  }

  const productMeta: IDetailsTableTabProp = {
    blocks: [<ProductAddButton SectionId={section.SectionID} />],
    tableProps: {
      ...getSectionProductTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_PRODUCT_PAGE_1"
    }
  }

  const registrationMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getRegistrationTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_REGISTRATION_PAGE_1"
    }
  }

  const orderItemMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getOrderItemTableColumns(false, section.SectionID),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_ORDER_PAGE_1"
    }
  }

  const requestMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getRequestTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_REQUEST_PAGE_1"
    }
  }

  const waitlistEntriesMeta: IDetailsTableTabProp = {
    blocks: [<WaitlistEntryFormModalOpenButton SectionID={section.SectionID} />],
    tableProps: {
      ...getWaitlistEntriesTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_WAITLIST_ENTRIES_PAGE_1"
    }
  }

  const noShowMeta: IDetailsCustomTabProp = {
    component: SectionNoShowPage,
    props: { SectionID: section.SectionID }
  }

  const enrollmentMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getEnrollmentTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_REGISTRATION_ENROLLMENT_HISTORY_PAGE_1"
    }
  }

  const academicActivityMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getAcademicActivityLogTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_REGISTRATION_ACADEMIC_ACTIVITY_PAGE_1"
    }
  }

  const enrollmentActivityMeta: IDetailsTableTabProp = {
    tableProps: {
      ...getEnrollmentActivityLogTableColumns(),
      searchParams: { SectionIDs: [section.SectionID] },
      refreshEventName: "REFRESH_REGISTRATION_ENROLLMENT_ACTIVITY_PAGE_1"
    }
  }

  return {
    pageTitle: `Section - ${section.OfferingName}`,
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Schedules",
        tabType: "custom",
        tabMeta: scheduleMeta
      },
      {
        tabTitle: "Budget",
        tabType: "summary",
        tabMeta: [],
        multipleTabMetas: [
          {
            tabTitle: "Financials",
            tabType: "table",
            tabMeta: financialMeta
          },
          {
            tabTitle: "Discounts",
            tabType: "table",
            tabMeta: discountMeta
          },
          {
            tabTitle: "Products",
            tabType: "table",
            tabMeta: productMeta
          },
          {
            tabTitle: "Order Items",
            tabType: "table",
            tabMeta: orderItemMeta
          }
        ]
      },
      {
        tabTitle: "Seat Groups",
        tabType: "table",
        tabMeta: seatgroupMeta
      },
      {
        tabTitle: "Catalogs",
        tabType: "custom",
        tabMeta: catalogMeta
      },
      {
        tabTitle: "Tags",
        tabType: "summary",
        tabMeta: [],
        multipleTabMetas: getTagsTabPageDetailsMeta({}, "Section", section.SectionID).tabs
      },
      {
        tabTitle: "Tagged Questions",
        tabType: "searchtable",
        tabMeta: {
          searchMeta: QuestionTaggingSearchMeta,
          defaultFormValue: { SectionID: section.SectionID },
          initialFormValue: { EventID: 2 },
          tableProps: {
            pagination: false,
            ...getQuestionTaggingTableColumns(true),
            searchParams: { SectionID: section.SectionID },
            refreshEventName: "REFRESH_SECTION_TAGGED_QUESTION"
          }
        }
      },
      {
        tabTitle: "Notifications",
        tabType: "table",
        tabMeta: notificationMeta
      },
      {
        tabTitle: "Registrations",
        tabType: "table",
        tabMeta: [],
        multipleTabMetas: [
          {
            tabTitle: "Roster",
            tabType: "table",
            tabMeta: registrationMeta
          },
          {
            tabTitle: "History",
            tabType: "table",
            tabMeta: enrollmentMeta
          },
          {
            tabTitle: "Waitlist Entries",
            tabType: "table",
            tabMeta: waitlistEntriesMeta
          },
          {
            tabTitle: "No Shows",
            tabType: "custom",
            tabMeta: noShowMeta
          },
          {
            tabTitle: "Academic",
            tabType: "table",
            tabMeta: academicActivityMeta
          },
          {
            tabTitle: "Enrollment",
            tabType: "table",
            tabMeta: enrollmentActivityMeta
          }
        ]
      },
      {
        tabTitle: "Requests",
        tabType: "table",
        tabMeta: requestMeta
      },
      {
        tabTitle: "Comments",
        tabType: "table",
        tabMeta: [],
        multipleTabMetas: [
          {
            tabTitle: "General",
            tabType: "table",
            tabMeta: {
              blocks: [
                <CommentCreateModalOpenButton SectionID={section.SectionID} CommentType={COMMENT_TYPES.GENERAL} />
              ],
              tableProps: {
                pagination: false,
                ...getGeneralCommentTableColumns(),
                searchParams: { SectionID: section.SectionID },
                refreshEventName: "REFRESH_SECTION_GENERAL_COMMENT_PAGE"
              }
            }
          },
          {
            tabTitle: "Instructor",
            tabType: "table",
            tabMeta: {
              blocks: [
                <CommentCreateModalOpenButton SectionID={section.SectionID} CommentType={COMMENT_TYPES.INSTRUCTOR} />
              ],
              tableProps: {
                pagination: false,
                ...getInstructorCommentTableColumns(),
                searchParams: { SectionID: section.SectionID },
                refreshEventName: "REFRESH_SECTION_INSTRUCTOR_COMMENT_PAGE"
              }
            }
          }
        ]
      }
    ]
  }
}

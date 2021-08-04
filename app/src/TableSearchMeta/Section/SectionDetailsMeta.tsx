import React, { useState } from "react"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"

import { IDetailsTableTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsTableTab"
import { renderBoolean, renderDate, renderLink } from "~/Component/Common/ResponsiveTable"
import { SectionEditLink } from "~/Component/Feature/Section/SectionEditLink"
import SectionSchedulePage from "~/Pages/Manage/Courses/Section/Schedule/SchedulePage"
import { getRegistrationTableColumns } from "~/TableSearchMeta/Registration/RegistrationTableColumns"
import { getSectionFinancialTableColumns } from "~/TableSearchMeta/SectionFinancial/FinancialTableColumns"
import { getSeatgroupTableColumns } from "~/TableSearchMeta/Seatgroup/SeatgroupTableColumns"
import CreateSeatGroup from "~/Component/Feature/Section/SeatGroup/SectionSeatGroupFormModal"
import { getSectionDiscountTableColumns } from "~/TableSearchMeta/SectionDiscount/DiscountTableColumns"
import { getNoticeTableColumns } from "~/TableSearchMeta/Notice/NoticeTableColumns"
import SectionCatalogPage from "~/Pages/Manage/Courses/Section/Catalog/CatalogPage"
import { getSectionProductTableColumns } from "~/TableSearchMeta/SectionProduct/ProductTableColumns"
import { ProductAddButton } from "~/Component/Feature/Section/Product/ProductAddButton"
import { getRequestTableColumns } from "~/TableSearchMeta/Request/RequestTableColumns"
import { getWaitlistEntriesTableColumns } from "~/TableSearchMeta/WaitlistEntries/WaitlistEntryTableColumns"
import SectionNoShowPage from "~/Pages/Manage/Courses/Section/NoShowPage"
import { getTagsTabPageDetailsMeta } from "~/TableSearchMeta/Tags/TagsTabPageDetailsMeta"
import { getGeneralCommentTableColumns } from "~/TableSearchMeta/SectionComment/GeneralCommentTableColumns"
import { getInstructorCommentTableColumns } from "~/TableSearchMeta/SectionComment/InstructorCommentTableColumns"
import { COMMENT_TYPES } from "~/utils/Constants"
import CommentCreateModalOpenButton from "~/Component/Feature/Comment/CommentAddLink"
import { AddDiscountButton } from "~/Component/Feature/Discount/AddDiscountButton"
import { SectionRemoveButton } from "~/Component/Feature/Section/SectionRemoveButton"
import { getEnrollmentTableColumns } from "~/TableSearchMeta/Enrollment/EnrollmentTableColumns"
import { getOrderItemTableColumns } from "~/TableSearchMeta/OrderItem/OrderItemsTableColumns"
import { getAcademicActivityLogTableColumns } from "~/TableSearchMeta/Academic/AcademicActivityTableColumns"
import { getEnrollmentActivityLogTableColumns } from "~/TableSearchMeta/EnrollmentActivity/EnrollmentActivityTableColumns"
import FinancialMenu from "~/TableSearchMeta/Financial/FinancialMenu"
import { QuestionTaggingSearchMeta } from "~/TableSearchMeta/QuestionTagging/QuestionTaggingSearchMeta"
import { getQuestionTaggingTableColumns } from "~/TableSearchMeta/QuestionTagging/QuestionTaggingTableColumn"
import { WaitlistEntryFormOpenButton } from "~/Component/Feature/WaitlistEntries/WaitlistEntryForm"
import { BasicInfoForm } from "~/Component/Feature/Section/Forms/SectionBasicInfoForm"
import { SectionEnrollmentForm } from "~/Component/Feature/Section/Forms/SectionEnrollmentForm"
import { MetaDrivenFormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { SectionGradesCreditsFormMeta } from "~/Component/Feature/Section/FormMeta/SectionGradesCreditsFormMeta"
import { updateSection } from "~/ApiServices/Service/SectionService"
import { REFRESH_PAGE } from "~/utils/EventBus"
import { SectionRefundEnquiryForm } from "~/Component/Feature/Section/Forms/SectionRefundEnquiryForm"
import { InlineForm } from "~/Component/Common/Form/InlineForm"
import { getPaymentGatewayAccounts, getSectionStatusCode } from "~/ApiServices/Service/RefLookupService"
import { AddSectionRoomButton } from "~/Component/Feature/Section/AddSectionRoomButton"
import { IconButton } from "~/Component/Common/Form/Buttons/IconButton"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

export const ENROLLMENT_DURATION_DEFAULT = {
  EnrollmentSpecificDate: "Enrollment Specific Date",
  FollowSectionDates: "Follow Section Dates"
}

export const REFRESH_SECTION_BUDGET_PAGE = "REFRESH_SECTION_BUDGET_PAGE"

export const getSectionDetailsMeta = (section: { [key: string]: any }): IDetailsMeta => {
  const sectionInfo: CardContainer = {
    title: "Basic Info",
    cardActions: [
      <SectionEditLink
        helpKey="sectionSummaryTabUpdateBasicInfoForm"
        tooltip="Update Basic Info"
        SectionID={section.SectionID}
        component={BasicInfoForm}
      />,
      <SectionRemoveButton Section={section} />
    ],
    contents: [
      {
        label: "Offering",
        value: renderLink(`/offering/${section.OfferingID}`, section.OfferingCode)
      },
      {
        label: "Status",
        value: (
          <InlineForm
            fieldName="SectionStatusCodeID"
            refreshEventName="REFRESH"
            inputType="DROPDOWN"
            displayKey="Name"
            valueKey="StatusID"
            defaultValue={section.StatusCode}
            updateFunc={(Params: { [key: string]: any }) => updateSection({ SectionID: section.SectionID, ...Params })}
            refLookupService={getSectionStatusCode}
          />
        ),
        cssClass: "highlight"
      },
      { label: "Description", value: section.Description, render: undefined },
      { label: "URL", value: section.URL, render: undefined },
      { label: "Creation Date", value: section.EffectiveCreationDate, render: renderDate },
      { label: "Creation Term", value: section.StartTermName, render: undefined },
      { label: "Termination Date", value: section.EffectiveTerminationDate, render: renderDate },
      { label: "Termination Term", value: section.EndTermName, render: undefined },
      { label: "Final Enrollment Date", value: section.FinalEnrollmentDate, render: renderDate },
      { label: "Billing Date", value: section.BillingDate, render: renderDate },
      { label: "Distance Learning", value: section.IsDistanceLearning, render: renderBoolean },
      {
        label: "Enrollment Duration Default",
        value:
          section.DefaultEnrollmentDuration === null
            ? ENROLLMENT_DURATION_DEFAULT.FollowSectionDates
            : section.DefaultEnrollmentDuration === "EnrollmentSpecificDate"
            ? ENROLLMENT_DURATION_DEFAULT.EnrollmentSpecificDate
            : ENROLLMENT_DURATION_DEFAULT.FollowSectionDates,
        render: undefined
      },
      { label: "Fiscal Period", value: section.FiscalPeriodCodeName, render: undefined },
      { label: "Other Section Type", value: section.SectionTypeName, render: undefined },
      {
        label: "Payment Gateway",
        value: (
          <InlineForm
            fieldName="PaymentGatewayAccountID"
            refreshEventName="REFRESH_PAGE"
            inputType="DROPDOWN"
            displayKey="Name"
            valueKey="ID"
            defaultValue={section.PaymentGatewayAccountID}
            updateFunc={(Params: { [key: string]: any }) => updateSection({ SectionID: section.SectionID, ...Params })}
            refLookupService={getPaymentGatewayAccounts}
          />
        )
      },
      {
        label: "Room",
        value: <AddSectionRoomButton Locations={section.RoomName} SectionID={section.SectionID} />
      }
    ]
  }
  const enrollmentInfo: CardContainer = {
    title: "Enrollment",
    cardActions: [
      <SectionEditLink
        tooltip="Update Entollment"
        helpKey="sectionSummaryTabUpdateEnrollmentForm"
        SectionID={section.SectionID}
        component={SectionEnrollmentForm}
      />
    ],
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
    cardActions: [
      <MetaDrivenFormModalOpenButton
        formTitle={`Update Grades & Credits`}
        helpkey="sectionSummaryTabUpdateGrades&CreditsForm"
        formMeta={SectionGradesCreditsFormMeta}
        formSubmitApi={updateSection}
        initialFormValue={{
          ...section
        }}
        buttonLabel={`Update Grades & Credits`}
        iconType="edit"
        defaultFormValue={{
          SectionID: section.SectionID
        }}
        refreshEventName={REFRESH_PAGE}
      />
    ],
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

  const refundInfo: CardContainer = {
    title: "Section Refund and Inquiry",
    cardActions: [
      <SectionEditLink
        helpKey="sectionSummaryTabUpdateRefund&InquiryForm"
        tooltip={`Update Refund & Inquiry`}
        SectionID={section.SectionID}
        component={SectionRefundEnquiryForm}
      />
    ],
    contents: [
      { label: "Refund Policy", value: section.RefundPolicyTypeName, render: undefined },
      { label: "Inquiry Recipient", value: section.SubmitInquiryToName, render: undefined }
    ]
  }

  const SeatgroupFormModalOpenButton = (props: { SectionID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <IconButton
            toolTip="Create Seat Group"
            iconType="create"
            onClick={() => setShowModal && setShowModal(true)}
          />
        )}
        {showModal && <CreateSeatGroup sectionId={props.SectionID} closeModal={() => setShowModal(false)} />}
      </>
    )
  }

  const summaryMeta: IDetailsSummary = {
    summary: [{ groupedContents: [sectionInfo, enrollmentInfo] }, { groupedContents: [gradeInfo, refundInfo] }],
    actions: [<HelpButton helpKey="sectionSummaryTab" />]
  }

  const scheduleMeta: IDetailsCustomTabProp = {
    component: SectionSchedulePage,
    props: { sectionID: section.SectionID }
  }

  const financialMeta: IDetailsTableTabProp = {
    blocks: [<FinancialMenu dataLoaded={section} />, <HelpButton helpKey="sectionBudgetFinancialsTab" />],
    tableProps: {
      ...getSectionFinancialTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: REFRESH_SECTION_BUDGET_PAGE
    }
  }

  const seatgroupMeta: IDetailsTableTabProp = {
    blocks: [
      <SeatgroupFormModalOpenButton SectionID={section.SectionID} />,
      <HelpButton helpKey="sectionSeatGroupsTab" />
    ],
    tableProps: {
      ...getSeatgroupTableColumns(false, undefined, section.SectionID, undefined),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_SEATGROUP_PAGE_1"
    }
  }

  const discountMeta: IDetailsTableTabProp = {
    blocks: [<AddDiscountButton sectionId={section.SectionID} />, <HelpButton helpKey="sectionBudgetDiscountsTab" />],
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
    blocks: [<HelpButton helpKey="sectionNotificationsTab" />],
    tableProps: {
      ...getNoticeTableColumns(section.SectionID),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_NOTIFICATION_PAGE_1"
    }
  }

  const productMeta: IDetailsTableTabProp = {
    blocks: [<ProductAddButton SectionId={section.SectionID} />, <HelpButton helpKey="sectionBudgetProductsTab" />],
    tableProps: {
      ...getSectionProductTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_PRODUCT_PAGE_1"
    }
  }

  const registrationMeta: IDetailsTableTabProp = {
    blocks: [<HelpButton helpKey="sectionRegistrationsRostersTab" />],
    tableProps: {
      ...getRegistrationTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_REGISTRATION_PAGE_1"
    }
  }

  const orderItemMeta: IDetailsTableTabProp = {
    blocks: [<HelpButton helpKey="sectionBudgetOrderItems" />],
    tableProps: {
      ...getOrderItemTableColumns(false, {
        helpKeyViewReturnItemsModal: "sectionBudgetOrderItemsViewReturnItemsForm",
        helpKeyIssueCreditModal: "sectionBudgetOrderItemsIssueCreditForm",
        helpKeyApplyDiscountModal: "sectionBudgetOrderItemsApplyDiscountsForm"
      }),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_ORDER_PAGE_1"
    }
  }

  const requestMeta: IDetailsTableTabProp = {
    blocks: [<HelpButton helpKey="sectionRequestsTab" />],
    tableProps: {
      ...getRequestTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_SECTION_REQUEST_PAGE_1"
    }
  }

  const waitlistEntriesMeta: IDetailsTableTabProp = {
    blocks: [
      section.TotalAvailableSeats === 0 ? (
        <WaitlistEntryFormOpenButton
          SectionNumber={section.SectionNumber}
          SectionID={section.SectionID}
          editMode={false}
        />
      ) : (
        <></>
      ),
      <HelpButton helpKey="sectionRegistrationsWaitlistTab" />
    ],
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
    blocks: [<HelpButton helpKey="sectionRegistrationsHistoryTab" />],
    tableProps: {
      ...getEnrollmentTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_REGISTRATION_ENROLLMENT_HISTORY_PAGE_1"
    }
  }

  const academicActivityMeta: IDetailsTableTabProp = {
    blocks: [<HelpButton helpKey="sectionRegistrationsAcademicTab" />],
    tableProps: {
      ...getAcademicActivityLogTableColumns(),
      searchParams: { SectionID: section.SectionID },
      refreshEventName: "REFRESH_REGISTRATION_ACADEMIC_ACTIVITY_PAGE_1"
    }
  }

  const enrollmentActivityMeta: IDetailsTableTabProp = {
    blocks: [<HelpButton helpKey="sectionRegistrationsEnrollmentTab" />],
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
        // tabMeta: [],
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
        // tabMeta: [],
        multipleTabMetas: getTagsTabPageDetailsMeta("Section", section.SectionID, {
          helpKeyTags: "sectionTagsTab",
          helpKeyParentTags: "sectionParentTagsTab"
        }).tabs
      },
      {
        tabTitle: "Tagged Questions",
        tabType: "searchtable",
        tabMeta: {
          blocks: [<HelpButton helpKey="sectionTaggedQuestionsTab" />],
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
        // tabMeta: [],
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
        // tabMeta: [],
        multipleTabMetas: [
          {
            tabTitle: "General",
            tabType: "table",
            tabMeta: {
              blocks: [
                <CommentCreateModalOpenButton SectionID={section.SectionID} CommentType={COMMENT_TYPES.GENERAL} />,
                <HelpButton helpKey="sectionCommentsGeneralTab" />
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
                <CommentCreateModalOpenButton SectionID={section.SectionID} CommentType={COMMENT_TYPES.INSTRUCTOR} />,
                <HelpButton helpKey="sectionCommentsInstructorTab" />
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

import { Button } from "antd"
import React, { useState } from "react"
import { getInstructorContractsTableColumns } from "~/TableSearchMeta/InstructorContracts/InstructorContractsTableColumns"
import CommentCreateModalOpenButton from "~/Component/Comment/CommentAddLink"
import { IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { CardContainer, IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderBoolean } from "~/Component/Common/ResponsiveTable"
import CreateNewFinancial from "~/Component/Feature/Financial/FinancialFormModal"
import OfferingAddButton from "~/Component/Offering/OfferingAddButton"
import { getFacultyCommentTableColumns } from "~/TableSearchMeta/InstructorComment/CommentTableColumns"
import { getInstructorScheduleTableColumns } from "~/TableSearchMeta/InstructorSchedule/ScheduleTableColumns"
import { getQualifiedInstructorTableColumns } from "~/TableSearchMeta/Offering/QualifiedInstructorTableColumns"
import { getOfferingFinancialTableColumns } from "~/TableSearchMeta/OfferingFinancial/OfferingFinancialTableColumns"
import {
  COMMENT_TYPES,
  DELETE_SUCCESSFULLY,
  FINANCIAL_FACULTY_TYPE_ID,
  FINANCIAL_TYPE_FACULTY
} from "~/utils/Constants"
import {
  eventBus,
  REFRESH_FACULTY_OFFERINGS_TAB,
  REFRESH_INSTRUCTOR_COMMENT_PAGE,
  REFRESH_PAGE
} from "~/utils/EventBus"
import { MetaDrivenFormModal } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModal"
import { pushInstructor, removeInstructor } from "~/ApiServices/Service/InstructorService"
import { InstructorFormMeta } from "~/Component/Instructor/FormMeta/InstructorFormMeta"
import InstructorScheduleFormModal from "~/Component/Instructor/Forms/InstructorScheduleFormModal"
import Notification from "~/utils/notification"

const InstructorFormModalOpenButton = (props: { facultyData: { [key: string]: any } }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
          Edit
        </Button>
      )}
      {showModal && (
        <MetaDrivenFormModal
          meta={InstructorFormMeta}
          metaName="InstructorFormMeta"
          title={"Update Instructor"}
          initialFormValue={props.facultyData}
          defaultFormValue={{
            PersonID: props.facultyData.PersonID,
            FacultyID: props.facultyData.FacultyID,
            oca: props.facultyData.oca
          }}
          formSubmitApi={pushInstructor}
          refreshEventAfterFormSubmission={REFRESH_PAGE}
          closeModal={() => setShowModal(false)}
        />
      )}
      <Button
        danger
        style={{ marginLeft: "5px" }}
        type="primary"
        onClick={async () => {
          const response = await removeInstructor({ FacultyID: props.facultyData.FacultyID })
          if (response && response.success) {
            Notification(DELETE_SUCCESSFULLY)
            eventBus.publish(REFRESH_PAGE)
          }
        }}
      >
        Remove
      </Button>
    </>
  )
}

const ScheduleFormModalOpenButton = (props: { PersonID: number }) => {
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {setShowModal && (
        <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
          + Add Schedule
        </Button>
      )}
      {showModal && <InstructorScheduleFormModal PersonID={props.PersonID} closeModal={() => setShowModal(false)} />}
    </>
  )
}

export const getInstructorMeta = (person: any, instructor: any): IDetailsTabMeta[] => {
  const tabMetas: IDetailsTabMeta[] = []

  const instructorInfo: CardContainer = {
    title: "Instructor Info",
    cardActions: [<InstructorFormModalOpenButton facultyData={instructor} />],
    contents: [
      { label: "Serial Num", value: instructor?.FacultySerialNum },
      { label: "Organization", value: instructor?.OrganizationName },
      { label: "Status", value: instructor?.InstitutionStatusCodeName },
      { label: "Type", value: instructor?.InstructorTypeName },
      { label: "Active", value: instructor?.IsActive, render: renderBoolean }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [instructorInfo]
  }

  const FinancialFormModalOpenButton = (props: { FacultyID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal && setShowModal(true)}>
            + Create Financial
          </Button>
        )}
        {showModal && (
          <CreateNewFinancial
            applyToID={props.FacultyID}
            financialType={FINANCIAL_TYPE_FACULTY}
            closeModal={() => setShowModal(false)}
          />
        )}
      </>
    )
  }

  tabMetas.push({ tabTitle: "Summary", tabType: "summary", tabMeta: summaryMeta })
  tabMetas.push({
    tabTitle: "Schedule",
    tabType: "table",
    tabMeta: {
      blocks: [<ScheduleFormModalOpenButton PersonID={instructor.PersonID} />],
      tableProps: {
        pagination: false,
        ...getInstructorScheduleTableColumns(instructor.PersonID),
        searchParams: { PersonID: person.PersonID },
        refreshEventName: "REFRESH_FACULTY_SCHEDULE_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Financials",
    tabType: "table",
    tabMeta: {
      blocks: [<FinancialFormModalOpenButton FacultyID={instructor.FacultyID} />],
      tableProps: {
        pagination: false,
        ...getOfferingFinancialTableColumns(instructor.FacultyID, FINANCIAL_FACULTY_TYPE_ID),
        searchParams: { FacultyID: instructor.FacultyID },
        refreshEventName: REFRESH_FACULTY_OFFERINGS_TAB
      }
    }
  })

  tabMetas.push({
    tabTitle: "Qualified Offerings",
    tabType: "table",
    tabMeta: {
      blocks: [<OfferingAddButton FacultyId={instructor.FacultyID} />],
      tableProps: {
        pagination: false,
        ...getQualifiedInstructorTableColumns(),
        searchParams: { FacultyID: instructor.FacultyID },
        refreshEventName: REFRESH_FACULTY_OFFERINGS_TAB
      }
    }
  })

  tabMetas.push({
    tabTitle: "Instructor Contracts",
    tabType: "table",
    tabMeta: {
      tableProps: {
        ...getInstructorContractsTableColumns(),
        searchParams: { FacultyID: instructor.FacultyID },
        refreshEventName: "REFRESH_FACULTY_CONTACT_TAB"
      }
    }
  })

  tabMetas.push({
    tabTitle: "Comments",
    tabType: "table",
    tabMeta: {
      blocks: [<CommentCreateModalOpenButton FacultyID={instructor.FacultyID} CommentType={COMMENT_TYPES.GENERAL} />],
      tableProps: {
        pagination: false,
        ...getFacultyCommentTableColumns(),
        searchParams: { FacultyID: instructor.FacultyID },
        refreshEventName: REFRESH_INSTRUCTOR_COMMENT_PAGE
      }
    }
  })
  return tabMetas
}

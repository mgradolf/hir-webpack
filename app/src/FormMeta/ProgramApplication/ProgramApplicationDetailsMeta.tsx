import { Button } from "antd"
import React, { useState } from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { IDetailsCustomTabProp } from "~/Component/Common/Page/DetailsPage2/DetailsCustomTab"
import { IDetailsSummary } from "~/Component/Common/Page/DetailsPage2/DetailsSummaryTab"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import {
  PROGRAM_APPLICATION_APPROVED,
  PROGRAM_APPLICATION_REJECTED,
  PROGRAM_APPLICATION_DECLINED,
  PROGRAM_APPLICATION_ENROLLED
} from "~/utils/Constants"
import ProgramApplicationStatusFormModal from "~/Component/ProgramApplication/ProgramApplicationStatusFormModal"
import ProgramApplicationTabDetailsPage from "~/Pages/Program/ProgramApplicationDetailsPage"
import ProgramApplicationNoteFormModal from "~/Component/ProgramApplication/ProgramApplicationNoteFormModal"

export const getProgramApplicationDetailsMeta = (programApplication: { [key: string]: any }): IDetailsMeta => {
  const AcceptFormModalOpenButton = (props: { ProgramAppID: number; CurrentStatusID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button
            type="primary"
            disabled={
              props.CurrentStatusID === PROGRAM_APPLICATION_ENROLLED ||
              props.CurrentStatusID === PROGRAM_APPLICATION_APPROVED
            }
            onClick={() => setShowModal && setShowModal(true)}
          >
            Accept
          </Button>
        )}
        {showModal && (
          <ProgramApplicationStatusFormModal
            ProgramAppID={props.ProgramAppID}
            StatusID={PROGRAM_APPLICATION_APPROVED}
            closeModal={() => setShowModal(false)}
          />
        )}
      </>
    )
  }

  const RejectFormModalOpenButton = (props: { ProgramAppID: number; CurrentStatusID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button
            type="primary"
            disabled={
              props.CurrentStatusID === PROGRAM_APPLICATION_ENROLLED ||
              props.CurrentStatusID === PROGRAM_APPLICATION_REJECTED
            }
            onClick={() => setShowModal && setShowModal(true)}
          >
            Reject
          </Button>
        )}
        {showModal && (
          <ProgramApplicationStatusFormModal
            ProgramAppID={props.ProgramAppID}
            StatusID={PROGRAM_APPLICATION_REJECTED}
            closeModal={() => setShowModal(false)}
          />
        )}
      </>
    )
  }

  const DeclinedFormModalOpenButton = (props: { ProgramAppID: number; CurrentStatusID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button
            danger
            type="primary"
            disabled={
              props.CurrentStatusID === PROGRAM_APPLICATION_ENROLLED ||
              props.CurrentStatusID === PROGRAM_APPLICATION_DECLINED
            }
            onClick={() => setShowModal && setShowModal(true)}
          >
            Declined
          </Button>
        )}
        {showModal && (
          <ProgramApplicationStatusFormModal
            ProgramAppID={props.ProgramAppID}
            StatusID={PROGRAM_APPLICATION_DECLINED}
            closeModal={() => setShowModal(false)}
          />
        )}
      </>
    )
  }

  const NoteFormModalOpenButton = (props: { ProgramAppID: number }) => {
    const [showModal, setShowModal] = useState(false)
    return (
      <>
        {setShowModal && (
          <Button type="primary" onClick={() => setShowModal && setShowModal(true)}>
            Add Note
          </Button>
        )}
        {showModal && (
          <ProgramApplicationNoteFormModal ProgramAppID={props.ProgramAppID} closeModal={() => setShowModal(false)} />
        )}
      </>
    )
  }

  const info: CardContainer = {
    cardActions: [
      <AcceptFormModalOpenButton
        CurrentStatusID={programApplication.StatusID}
        ProgramAppID={programApplication.ProgramAppID}
      />,
      <RejectFormModalOpenButton
        CurrentStatusID={programApplication.StatusID}
        ProgramAppID={programApplication.ProgramAppID}
      />,
      <DeclinedFormModalOpenButton
        CurrentStatusID={programApplication.StatusID}
        ProgramAppID={programApplication.ProgramAppID}
      />,
      <NoteFormModalOpenButton ProgramAppID={programApplication.ProgramAppID} />
    ],
    contents: [
      { label: "Application Date", value: programApplication.ApplicationDate, render: renderDate },
      { label: "Application Status", value: programApplication.StatusName },
      { label: "Notes", value: programApplication.CommentText }
    ]
  }

  const summaryMeta: IDetailsSummary = {
    summary: [info]
  }

  const detailsMeta: IDetailsCustomTabProp = {
    component: ProgramApplicationTabDetailsPage,
    props: { programID: programApplication.ProgramID, studentID: programApplication.StudentID }
  }

  return {
    pageTitle: `${programApplication.ProgramCode} - ${programApplication.StudentName}`,
    tabs: [
      {
        tabTitle: "Summary",
        tabType: "summary",
        tabMeta: summaryMeta
      },
      {
        tabTitle: "Details",
        tabType: "custom",
        tabMeta: detailsMeta
      }
    ]
  }
}

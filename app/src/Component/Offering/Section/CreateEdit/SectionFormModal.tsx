import * as React from "react"
import Modal from "~/Component/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showCreateSectionModal } from "~/Store/ModalState"
import { redirect } from "~/Store/ConnectedRoute"
import SectionCreateForm from "~/Component/Offering/Section/CreateEdit/SectionCreateForm"
import SectionEditForm from "~/Component/Offering/Section/CreateEdit/SectionEditForm"
import { AppState } from "~/Store"
import { useState, useEffect } from "react"
import { getSectionById } from "~/ApiServices/Service/EntityService"

interface ICreateNewSectionProps {
  OfferingID?: number
  SectionID?: number
  redirect?: (url: string) => void
  closeCreateOfferingModal?: () => void
}

function SectionModal(props: ICreateNewSectionProps) {
  const [showCreateForm, setShowCreateForm] = useState(!!props.OfferingID && !props.SectionID)
  const [showEditForm, setShowEditForm] = useState(!props.OfferingID && !!props.SectionID)
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [SectionID, setSectionID] = useState(props.SectionID)
  const [Section, setSection] = useState({})

  useEffect(() => {
    if (SectionID) {
      getSectionById(SectionID).then((x) => {
        if (x.success) {
          setSection(x.data)
        }
      })
    }
    // let section = {
    //   AttendanceExpected: null,
    //   AttendanceUnitID: null,
    //   BillingDate: null,
    //   BusinessID: null,
    //   CEUHours: null,
    //   CancelReasonCodeID: null,
    //   ClockHours: null,
    //   CreationDate: null,
    //   CreditHours: null,
    //   CreditTypeID: null,
    //   DefaultEnrollmentDuration: null,
    //   Description: "Default Section Type",
    //   EffectiveCreationDate: null,
    //   EffectiveTerminationDate: null,
    //   Email: null,
    //   EndDate: null,
    //   EndTermID: null,
    //   FinalEnrollmentDate: null,
    //   FiscalPeriodCodeID: null,
    //   GradeScaleTypeID: null,
    //   IsActive: true,
    //   IsDistanceLearning: false,
    //   IsGradesEntered: false,
    //   LectureLabRatio: null,
    //   LoadHours: null,
    //   MaxCEUCredit: null,
    //   MaxEnrollment: 0,
    //   MinEnrollment: 0,
    //   NoteID: null,
    //   OfferingID: 2,
    //   PaymentGatewayAccountID: null,
    //   RecurrenceRule: null,
    //   RefundPolicyTypeID: null,
    //   RoomID: null,
    //   SectionID: 11045,
    //   SectionNumber: "ML110-4.(4)",
    //   SectionStatusCodeID: 0,
    //   SectionStatusReleaseID: 1,
    //   SectionTypeID: 13,
    //   SectionUsageType: 1,
    //   ShowSiteOnly: false,
    //   StartDate: null,
    //   StartTermID: null,
    //   SubmitInquiryToUserID: null,
    //   TerminationDate: null,
    //   URL: null,
    //   oca: 1
    // }
    // setSection(section)
  }, [SectionID])
  return (
    <Modal
      showModal={true}
      width="800px"
      loading={false}
      apiCallInProgress={apiCallInProgress}
      children={
        <>
          {showCreateForm && (
            <SectionCreateForm
              OfferingID={Number(props.OfferingID)}
              handleCancel={() => props.closeCreateOfferingModal && props.closeCreateOfferingModal()}
              handleSelected={(sectionId: number) => {
                setSectionID(sectionId)
                console.log("section created")
                setShowCreateForm(false)
                setShowEditForm(true)
                // props.closeCreateOfferingModal && props.closeCreateOfferingModal()
              }}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
          {showEditForm && (
            <SectionEditForm
              Section={Section}
              handleCancel={() => props.closeCreateOfferingModal && props.closeCreateOfferingModal()}
              handleSubmit={() => {
                console.log("section edited")
                props.closeCreateOfferingModal && props.closeCreateOfferingModal()
              }}
              setApiCallInProgress={setApiCallInProgress}
            />
          )}
        </>
      }
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeCreateOfferingModal: () => dispatch(showCreateSectionModal(false)),
    redirect: (url: string) => dispatch(redirect(url))
  }
}
const mapStateToProps = (state: AppState) => {
  return {
    OfferingID: state.modalState.createSectionModal.config.OfferingID,
    SectionID: state.modalState.createSectionModal.config.SectionID
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SectionModal)

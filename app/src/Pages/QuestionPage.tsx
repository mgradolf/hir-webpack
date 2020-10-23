import React, { useState } from "react"
// import { connect } from "react-redux"
// import { Dispatch } from "redux"
// import { AppState } from "~/Store"
// import { redirect } from "~/Store/ConnectedRoute"
// import { showQuestionFindModal } from "~/Store/ModalState"
// import Modal from "~/Component/Common/Modal"
import QuestionSearch from "~/Component/Question/Search/QuestionSearch"
import QuestionSearchResultTable from "~/Component/Question/Search/QuestionSearchResultTable"
import { searchQuestions } from "~/ApiServices/Service/QuestionService"
// import { Button, Card } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import FormError from "~/Component/Common/FormError"
// import { eventBus, REFRESH_QUESTION_PAGE } from "~/utils/EventBus"

// interface IQuestionModal {
//   closeModal?: () => void
//   SectionID?: number
//   EventID?: number
//   TagTypeID?: number
//   TagID?: number
// }

export default function QuestionFindModal() {
  const [searchResult, setSearchResult] = useState<Array<any>>([])
  const [apiCallInProgress, setapiCallInProgress] = useState(false)
  // const [selectedQuestions, setSelectedQuestions] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])
  // const actions = []
  // actions.push(<Button onClick={props.closeModal}>Cancel</Button>)
  // actions.push(
  //   <Button
  //     onClick={() => {
  //       setapiCallInProgress(true)
  //       setErrorMessages([])
  //       addTagQuestions({
  //         Questions: selectedQuestions.map((x) => {
  //           return {
  //             EventID: props.EventID,
  //             TagID: props.TagID,
  //             PreferenceDefID: x["PreferenceDefID"]
  //           }
  //         })
  //       }).then((x) => {
  //         setapiCallInProgress(false)
  //         if (x.success && props.closeModal) {
  //           // eventBus.publish(REFRESH_QUESTION_PAGE)
  //           // props.closeModal()
  //         } else {
  //           setErrorMessages(x.error)
  //         }
  //       })
  //     }}
  //   >
  //     Submit
  //   </Button>
  // )
  return (
    // <Modal
    //   showModal={true}
    //   width="800px"
    //   loading={false}
    //   closable={true}
    //   closeModal={props.closeModal}
    //   children={
    //     <Card title="Offering Approval" actions={actions}>
    <div className="site-layout-content">
      <FormError errorMessages={errorMessages}></FormError>
      <QuestionSearch
        onFormSubmission={(Params: any) => {
          setapiCallInProgress(true)
          setErrorMessages([])
          searchQuestions(Params).then((x) => {
            setapiCallInProgress(false)
            if (x.success) {
              setSearchResult(x.data)
              document.getElementById("scrollHereOnSearchResult")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "start"
              })
            } else {
              setErrorMessages(x.error)
            }
          })
        }}
      />
      <span id="scrollHereOnSearchResult"></span>
      <QuestionSearchResultTable
        dataSource={searchResult}
        loading={apiCallInProgress}
        // // setSelectedQuestions={setSelectedQuestions}
      />
    </div>
    // </Card>
    // }
    // />
  )
}

// const mapDispatchToProps = (dispatch: Dispatch) => {
//   return {
//     closeModal: () => dispatch(showQuestionFindModal(false)),
//     redirect: (url: string) => dispatch(redirect(url))
//   }
// }

// const mapStateToProps = (state: AppState) => {
//   return {
//     SectionID: state.modalState.questionFindModal.config.SectionID,
//     EventID: state.modalState.questionFindModal.config.EventID,
//     TagTypeID: state.modalState.questionFindModal.config.TagTypeID,
//     TagID: state.modalState.questionFindModal.config.TagID
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(QuestionFindModal)

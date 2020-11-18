import { Button } from "antd"
import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { showStudentFinderModal } from "~/Store/ModalState"
import { IStudent } from "~/Component/Student/StudentFinderModal"

function StudentFinder(props: {
  AccountID: number
  onSelectStudent: (student: IStudent) => void
  style?: React.CSSProperties
}) {
  const dispatch = useDispatch()

  const showStudentFinder: () => void = useCallback(
    () =>
      dispatch(
        showStudentFinderModal(true, { AccountID: props.AccountID, onSelectStudentCallback: props.onSelectStudent })
      ),
    [dispatch, props.onSelectStudent, props.AccountID]
  )

  return (
    <Button style={props.style} aria-label="Student Select" onClick={showStudentFinder}>
      Select
    </Button>
  )
}

export default StudentFinder

import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showRequestResolutionModal } from "~/Store/ModalState"
import { Dispatch } from "redux"

interface ICreateActionButtonProp {
  openResolutionModal?: (taskJson: any, resolutionJson: any, extraDataSource: any) => void
  taskJson: any
  extraDataSource: any
  resolutionJson: any
}

function CreateActionButton(props: ICreateActionButtonProp) {
  return (
    <Button
      type="link"
      onClick={() =>
        props.openResolutionModal
          ? props.openResolutionModal(props.taskJson, props.resolutionJson, props.extraDataSource)
          : null
      }
    >
      {props.resolutionJson.Name}
    </Button>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openResolutionModal: (taskJson?: any, resolutionJson?: any, extraDataSource?: any) =>
      dispatch(showRequestResolutionModal(true, { taskJson, resolutionJson, extraDataSource }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)

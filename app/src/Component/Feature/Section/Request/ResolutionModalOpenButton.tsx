import React from "react"
import { Button } from "antd"
import { connect } from "react-redux"
import { showRequestResolutionModal } from "~/Store/ModalState"
import { Dispatch } from "redux"
import { REQUEST_RESOLUTION_NAMES } from "~/utils/Constants"
import { eventBus, EVENT_REQUEST_RETRY, EVENT_REQUEST_MAKE_PAYMENT } from "~/utils/EventBus"

interface ICreateActionButtonProp {
  openResolutionModal?: (taskJson: any, resolutionJson: any, extraDataSource: any) => void
  taskJson: any
  extraDataSource: any
  resolutionJson: any
}

function CreateActionButton(props: ICreateActionButtonProp) {
  return (
    <>
      {props.resolutionJson.Key === REQUEST_RESOLUTION_NAMES.RETRY && (
        <Button type="link" onClick={() => eventBus.publish(EVENT_REQUEST_RETRY)}>
          {props.resolutionJson.Name}
        </Button>
      )}
      {props.resolutionJson.Key === REQUEST_RESOLUTION_NAMES.MAKE_PAYMENT && (
        <Button type="link" onClick={() => eventBus.publish(EVENT_REQUEST_MAKE_PAYMENT)}>
          {props.resolutionJson.Name}
        </Button>
      )}
      {props.resolutionJson.Key !== REQUEST_RESOLUTION_NAMES.RETRY &&
        props.resolutionJson.Key !== REQUEST_RESOLUTION_NAMES.MAKE_PAYMENT && (
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
        )}
    </>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    openResolutionModal: (taskJson?: any, resolutionJson?: any, extraDataSource?: any) =>
      dispatch(showRequestResolutionModal(true, { taskJson, resolutionJson, extraDataSource }))
  }
}

export default connect(null, mapDispatchToProps)(CreateActionButton)

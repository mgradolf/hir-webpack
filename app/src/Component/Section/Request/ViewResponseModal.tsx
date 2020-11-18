import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { Card, Button, Typography } from "antd"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showRequestViewResponseModal } from "~/Store/ModalState"
import { redirect } from "~/Store/ConnectedRoute"
import Form from "antd/lib/form/Form"

interface IViewResponseProps {
  requestJson: any
  closeViewResponseModal?: () => void
}

function ViewResponse(props: IViewResponseProps) {
  const handleCancel = () => {
    if (props.closeViewResponseModal) {
      props.closeViewResponseModal()
    }
  }

  return (
    <Modal
      showModal={true}
      width="600px"
      children={
        <>
          <Card
            title="Response"
            actions={[
              <Button
                onClick={() => {
                  handleCancel()
                }}
              >
                Cancel
              </Button>
            ]}
          >
            <Form style={{ height: "40vh", overflowY: "scroll", padding: "10px" }}>
              <Typography.Text>{props.requestJson}</Typography.Text>
            </Form>
          </Card>
        </>
      }
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeViewResponseModal: () => dispatch(showRequestViewResponseModal(false)),
    redirect: (url: string) => dispatch(redirect(url))
  }
}

export default connect(undefined, mapDispatchToProps)(ViewResponse)

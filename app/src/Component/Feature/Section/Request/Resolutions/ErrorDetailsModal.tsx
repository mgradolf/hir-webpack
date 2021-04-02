import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { Card, Button, Typography } from "antd"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showRequestResolutionModal } from "~/Store/ModalState"
import { redirect } from "~/Store/ConnectedRoute"
import Form from "antd/lib/form/Form"

interface IErrorDetailsProps {
  taskJson: any
  closeErrorDetailsModal?: () => void
}

function ErrorDetailsModal(props: IErrorDetailsProps) {
  const handleCancel = () => {
    if (props.closeErrorDetailsModal) {
      props.closeErrorDetailsModal()
    }
  }

  return (
    <Modal
      showModal={true}
      width="800px"
      children={
        <>
          <Card
            title="Error Details"
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
            <Form style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}>
              <Typography.Text>{props.taskJson.Issues[0].StackTrace}</Typography.Text>
            </Form>
          </Card>
        </>
      }
    />
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeErrorDetailsModal: () => dispatch(showRequestResolutionModal(false)),
    redirect: (url: string) => dispatch(redirect(url))
  }
}

export default connect(undefined, mapDispatchToProps)(ErrorDetailsModal)

import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import { Card, Button, Typography } from "antd"
import Form from "antd/lib/form/Form"

interface IViewResponseProps {
  requestJson: any
  closeModal?: () => void
}

export default function ViewResponseModal(props: IViewResponseProps) {

  const handleCancel = () => {
    if (props.closeModal) {
      props.closeModal()
    }
  }

  return (
    <Modal
      width="800px"
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
            <Form style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}>
              <Typography.Text>{props.requestJson}</Typography.Text>
            </Form>
          </Card>
        </>
      }
    />
  )
}
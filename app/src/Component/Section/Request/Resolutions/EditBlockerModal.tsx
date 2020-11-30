import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showRequestResolutionModal } from "~/Store/ModalState"
import { Card, Button, Form, Input, Select } from "antd"
import { IParamsToBeDispatched } from "~/Pages/Request/RequestDetailsPage"
import { eventBus, EVENT_REQUEST_RESOLUTION } from "~/utils/EventBus"
import { REQUEST_PROCESS_ACTION_NAME } from "~/utils/Constants"

const layout = {
  labelCol: { span: 6 }
}

interface IEditBLockerModal {
  taskJson?: any
  resolutionJson?: any
  closeEditBlockerModal?: () => void
}

function EditBLockerModal(props: IEditBLockerModal) {
  const [form] = Form.useForm()
  const actionOptions = props.resolutionJson.Options
  const initialAnswer = props.taskJson.UpdatedResponse !== undefined ? props.taskJson.UpdatedResponse : {}

  const onFormSubmission = async () => {
    try {
      await form.validateFields()

      props.taskJson["UpdatedResponse"] = form.getFieldsValue()

      const params: any = form.getFieldsValue()
      params["DependencyKey"] = props.taskJson.Issues[0].DependencyKey
      params["TaskKey"] = props.taskJson.Key
      params["ProcessActionName"] = REQUEST_PROCESS_ACTION_NAME.EDIT

      const blocker: IParamsToBeDispatched = {
        ValueUpdate: true,
        Params: params
      }

      eventBus.publish(EVENT_REQUEST_RESOLUTION, blocker)
      props.closeEditBlockerModal && props.closeEditBlockerModal()
    } catch (errorInfo) {
      console.log("Failed:", errorInfo)
    }
  }

  return (
    <Modal showModal={true} width="800px" closable={true}>
      <Card
        title="Remove Blocker"
        actions={[
          <Button type="ghost" onClick={props.closeEditBlockerModal}>
            Cancel
          </Button>,
          <Button type="primary" onClick={onFormSubmission}>
            Update
          </Button>
        ]}
      >
        <Form
          initialValues={initialAnswer}
          form={form}
          style={{ height: "40vh", overflowY: "scroll", padding: "10px" }}
        >
          <Form.Item
            label="Action"
            {...layout}
            name="BlockerStateID"
            rules={[{ required: true, message: "Please select your action!" }]}
          >
            <Select aria-label="Action">
              {actionOptions.map((x: any) => {
                return (
                  <Select.Option key={x.ID} value={x.ID}>
                    {x.Description}
                  </Select.Option>
                )
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="Note"
            {...layout}
            name="Note"
            rules={[{ required: true, message: "Please input your note!" }]}
          >
            <Input.TextArea rows={4} aria-label="Note" />
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeEditBlockerModal: () => dispatch(showRequestResolutionModal(false))
  }
}

export default connect(undefined, mapDispatchToProps)(EditBLockerModal)

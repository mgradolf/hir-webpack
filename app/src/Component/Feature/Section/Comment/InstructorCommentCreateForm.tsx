import React, { useEffect, useState } from "react"
import { Button, Card, Col, Form, message, Row, Select } from "antd"
import { findFaculty } from "~/ApiServices/Service/SectionService"
import { addSectionFacultyComment } from "~/ApiServices/Service/CommentService"
import { eventBus, REFRESH_SECTION_INSTRUCTOR_COMMENT_PAGE } from "~/utils/EventBus"
import { FormDropDown } from "~/Component/Common/Form/FormDropDown"
import { getCommentCategories } from "~/ApiServices/Service/RefLookupService"
import { FormTextArea } from "~/Component/Common/Form/FormTextArea"
import { CREATE_SUCCESSFULLY } from "~/utils/Constants"

interface IInstructorCommentCreateForm {
  SectionID?: number
  onClose?: () => void
  setApiCallInProgress: (flag: boolean) => void
}
export default function InstructorCommentCreateForm(props: IInstructorCommentCreateForm) {
  const [formInstance] = Form.useForm()
  const [faulties, setFaulties] = useState<any[]>([])

  useEffect(() => {
    findFaculty({ SectionID: props.SectionID }).then((x) => {
      if (x.success) setFaulties(x.data)
    })
  }, [props.SectionID])

  const submit = async () => {
    await formInstance.validateFields()

    props.setApiCallInProgress(true)
    addSectionFacultyComment({ ...formInstance.getFieldsValue(), SectionID: props.SectionID }).then((x) => {
      if (x.success) {
        message.success(CREATE_SUCCESSFULLY)
        eventBus.publish(REFRESH_SECTION_INSTRUCTOR_COMMENT_PAGE)
        props.onClose && props.onClose()
      }
      props.setApiCallInProgress(false)
    })
  }

  return (
    <Card
      title="Create Instructor Comment"
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" danger onClick={props.onClose}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={submit}>
              Submit
            </Button>
          </Col>
        </Row>
      ]}
    >
      <Form form={formInstance}>
        <FormDropDown
          labelColSpan={8}
          wrapperColSpan={14}
          label={"Category"}
          ariaLabel={"Comment category select"}
          formInstance={formInstance}
          fieldName={"CommentCategoryID"}
          refLookupService={getCommentCategories}
          displayKey="Name"
          valueKey="ID"
          rules={[{ required: true, message: "Please select category!" }]}
        />
        <Form.Item
          label="Instructor"
          name="FacultyID"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          rules={[{ required: true, message: "Please select instructor!" }]}
        >
          <Select>
            {faulties.map((x, i) => (
              <Select.Option key={i} value={x.FacultyID}>
                {x.FirstName} {x.LastName}, ID: {x.FacultyID}, Role: {x.FacultyRoleInSection}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <FormTextArea
          label={"Comments"}
          formInstance={formInstance}
          fieldName="CommentText"
          labelColSpan={8}
          wrapperColSpan={14}
          rules={[{ required: true, message: "Please enter comment!" }]}
        />
      </Form>
    </Card>
  )
}

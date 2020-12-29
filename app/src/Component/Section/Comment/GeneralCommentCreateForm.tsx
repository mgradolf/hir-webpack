import React from "react"
import { Button, Card, Form, Select } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { addSectionComment, addStudentComment, addFacultyComment } from "~/ApiServices/Service/CommentService"
import { eventBus, REFRESH_SECTION_GENERAL_COMMENT_PAGE, REFRESH_STUDENT_COMMENT_PAGE, REFRESH_INSTRUCTOR_COMMENT_PAGE } from "~/utils/EventBus"

interface IGeneralCommentCreateForm {
  SectionID?: number
  StudentID?: number
  FacultyID?: number
  commentCatagories: any[]
  onClose?: () => void
  setApiCallInProgress: (flag: boolean) => void
}
export default function GeneralCommentCreateForm(props: IGeneralCommentCreateForm) {
  const [formInstance] = Form.useForm()

  const submit = () => {
    props.setApiCallInProgress(true)

    let params = { ...formInstance.getFieldsValue() }
    if (props.SectionID) {
      params["SectionID"] = props.SectionID
      addSectionComment(params).then((x) => {
        if (x.success) {
          eventBus.publish(REFRESH_SECTION_GENERAL_COMMENT_PAGE)
          props.onClose && props.onClose()
        }
        props.setApiCallInProgress(false)
      })
    }
    else if (props.StudentID) {
      params["StudentID"] = props.StudentID
      addStudentComment(params).then((x) => {
        if (x.success) {
          eventBus.publish(REFRESH_STUDENT_COMMENT_PAGE)
          props.onClose && props.onClose()
        }
        props.setApiCallInProgress(false)
      })
    }
    else if (props.FacultyID) {
      params["FacultyID"] = props.FacultyID
      addFacultyComment(params).then((x) => {
        if (x.success) {
          eventBus.publish(REFRESH_INSTRUCTOR_COMMENT_PAGE)
          props.onClose && props.onClose()
        }
        props.setApiCallInProgress(false)
      })
    }
  }

  return (
    <Card
      title="Create General Comment"
      actions={[<Button onClick={props.onClose}>Cancel</Button>, <Button onClick={submit}>Submit</Button>]}
    >
      <Form form={formInstance}>
        <Form.Item label="Category" name="CommentCategoryID" labelCol={{ span: 6 }}>
          <Select>
            {props.commentCatagories.map((x, i) => (
              <Select.Option key={i} value={x.ID}>
                {x.Name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Commments" name="CommentText" labelCol={{ span: 6 }}>
          <TextArea></TextArea>
        </Form.Item>
      </Form>
    </Card>
  )
}

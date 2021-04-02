import { Button, Card, Form, Select } from "antd"
import React, { useState } from "react"
import { COMMENT_TYPES } from "~/utils/Constants"

interface ICommmentTypeSelectForm {
  closeModal?: () => void
  onSelect: (type: string) => void
}
export default function CommentTypeSelectForm(props: ICommmentTypeSelectForm) {
  const [selectedCommentType, setSelectedCommentType] = useState("")
  return (
    <Card
      title="Create Comments"
      actions={[
        <Button onClick={props.closeModal}>Cancel</Button>,
        <Button onClick={() => props.onSelect(selectedCommentType)} disabled={selectedCommentType === ""}>
          Submit
        </Button>
      ]}
    >
      <Form>
        <Form.Item label="Select a Comment Type">
          <Select onSelect={(value: any) => setSelectedCommentType(value)}>
            <Select.Option key="1" value={COMMENT_TYPES.GENERAL}>
              {COMMENT_TYPES.GENERAL}
            </Select.Option>
            <Select.Option key="2" value={COMMENT_TYPES.INSTRUCTOR}>
              {COMMENT_TYPES.INSTRUCTOR}
            </Select.Option>
            <Select.Option key="3" value={COMMENT_TYPES.ENROLLMENT}>
              {COMMENT_TYPES.ENROLLMENT}
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Card>
  )
}

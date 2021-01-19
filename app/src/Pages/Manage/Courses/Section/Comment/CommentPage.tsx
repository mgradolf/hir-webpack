import React, { useEffect, useState } from "react"
import { Col, Row, Select, Form } from "antd"
import {
  findEnrollmentCommentHistory,
  findFacultyComments,
  findGeneralCommentHistory
} from "~/ApiServices/Service/SectionService"
import CommentCreateModalOpenButton from "~/Component/Section/Comment/CommentCreateModalOpenButton"
import { ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { COMMENT_TYPES } from "~/utils/Constants"

import Title from "antd/lib/typography/Title"
import { eventBus, REFRESH_SECTION_COMMENT_PAGE } from "~/utils/EventBus"

export default function SectionCommentPage(props: { sectionID: number }) {
  const [searchParams] = useState<{ [key: string]: any }>({ SectionID: props.sectionID })
  const [commentType, setCommentType] = useState(COMMENT_TYPES.GENERAL)

  const genralColumns: TableColumnType = [
    {
      title: "Date/Time",
      dataIndex: "CreationDate"
    },
    {
      title: "Category",
      dataIndex: "CommentCategory"
    },
    {
      title: "Comment",
      dataIndex: "CommentText"
    },
    {
      title: "Entered By",
      dataIndex: "FormattedName"
    }
  ]
  const instructorColumns: TableColumnType = [...genralColumns, { title: "Faculty", dataIndex: "FacultyName" }]
  const enrollmentColumns: TableColumnType = [...genralColumns, { title: "Student", dataIndex: "StudentName" }]

  useEffect(() => {
    eventBus.subscribe(REFRESH_SECTION_COMMENT_PAGE, () => {
      const type = commentType
      setCommentType("")
      setTimeout(() => {
        setCommentType(type)
      }, 0)
    })
    return () => {
      eventBus.unsubscribe(REFRESH_SECTION_COMMENT_PAGE)
    }
  }, [commentType])
  return (
    <div className="site-layout-content">
      <Row>
        <Col span={12}>
          <Form.Item label="Commment Type">
            <Select onSelect={(value: any) => setCommentType(value)} defaultValue={COMMENT_TYPES.GENERAL}>
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
        </Col>
        <Col span={12} style={{ textAlignLast: "end" }}>
          <CommentCreateModalOpenButton SectionID={props.sectionID} />
        </Col>
      </Row>

      {commentType === COMMENT_TYPES.GENERAL && (
        <ResponsiveTable
          refreshEventName={REFRESH_SECTION_COMMENT_PAGE}
          title={() => <Title level={3}>General Comments</Title>}
          columns={genralColumns}
          searchFunc={findGeneralCommentHistory}
          searchParams={searchParams}
          rowKey="index"
        />
      )}
      {commentType === COMMENT_TYPES.INSTRUCTOR && (
        <ResponsiveTable
          refreshEventName={REFRESH_SECTION_COMMENT_PAGE}
          title={() => <Title level={3}>Faculty Comments</Title>}
          columns={instructorColumns}
          searchFunc={findFacultyComments}
          searchParams={searchParams}
          rowKey="index"
        />
      )}
      {commentType === COMMENT_TYPES.ENROLLMENT && (
        <ResponsiveTable
          refreshEventName={REFRESH_SECTION_COMMENT_PAGE}
          title={() => <Title level={3}>Enrollmment Comments</Title>}
          columns={enrollmentColumns}
          searchFunc={findEnrollmentCommentHistory}
          searchParams={searchParams}
          rowKey="index"
        />
      )}
    </div>
  )
}

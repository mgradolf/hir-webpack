import React, { useState } from "react"
import { RouteComponentProps } from "react-router"
import { Row, Col, Typography, Button } from "antd"
import { renderEmail, ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { AddInstructorButton } from "~/Component/Feature/Offering/QualifiedInstructor/AddInstructorButton"
import { getQualifiedInstructors, updateInstructors } from "~/ApiServices/Service/OfferingService"
import styles from "~/Pages/Manage/Courses/Offering/QualifiedInstructor/QualifiedInstructor.module.scss"
import { eventBus, REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE } from "~/utils/EventBus"

const { Title } = Typography

function OfferingQualifiedInstructorPage(props: RouteComponentProps<{ offeringID: string }>) {
  const offeringID = props.match.params.offeringID
  const [instructorIDs, setInstructorIDs] = useState<number[]>([])
  const [loading, setLoading] = useState(false)

  const removeInstructor = (event: any, instructorID: any) => {
    console.log(instructorIDs)
    setLoading(true)
    const IDs = instructorIDs.filter((x) => x !== instructorID)
    console.log(IDs, instructorIDs, instructorID)
    updateInstructors({ OfferingID: Number(offeringID), InstructorIDs: IDs })
      .then((result) => {
        if (result && result.success) {
          eventBus.publish(REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      render: renderEmail
    },
    {
      title: "Telephone",
      dataIndex: "telephone"
    },
    {
      title: "Address",
      dataIndex: "Address"
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Button type="link" onClick={(e) => removeInstructor(e, record.instructorID)}>
          Remove
        </Button>
      )
    }
  ]
  const expandableRowRender = (data: { [key: string]: any }, display: boolean): JSX.Element => {
    return (
      <>
        {display && (
          <div style={{ border: "1px solid", padding: "5px" }}>
            <Row>
              <Col span="8">Email:</Col>
              <Col span="16">{data.email}</Col>
            </Row>
            <Row>
              <Col span="8">Telephone:</Col>
              <Col span="16">{data.telephone}</Col>
            </Row>
            <Row>
              <Col span="8">Address:</Col>
              <Col span="16">{data.address}</Col>
            </Row>
          </div>
        )}
      </>
    )
  }

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Title level={3}>Manage Offering Instructors</Title>
        </Col>
        <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
          <AddInstructorButton OfferingID={parseInt(offeringID)} />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={`${styles.paddingTop10px}  ${styles.margin0px}`}>
        <Col className={`gutter-row ${styles.offeringInstructorDetails}`} xs={24} sm={24} md={24}>
          <ResponsiveTable
            dataLoaded={(data: any[]) => {
              console.log("dataLoaded ", data)
              setInstructorIDs(data)
            }}
            loading={loading}
            columns={columns}
            searchFunc={getQualifiedInstructors}
            searchParams={offeringID}
            bordered
            expandableRowRender={expandableRowRender}
            breakpoints={["md", "lg", "xl", "xxl"]}
            responsiveColumnIndices={[1, 2, 3]}
            refreshEventName={REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE}
          />
        </Col>
      </Row>
    </div>
  )
}

export default OfferingQualifiedInstructorPage

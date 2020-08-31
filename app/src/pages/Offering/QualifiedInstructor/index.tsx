import React, { useState, useEffect } from "react"
import { RouteComponentProps } from "react-router"

import { Row, Col, Table, Typography, Button } from "antd"

import OfferingInstructorModalOpenButton from "~/component/Offering/QualifiedInstructor/OfferingInstructorModalOpenButton"
import { getQualifiedInstructors, updateInstructors } from "~/ApiServices/Service/OfferingService"
import styles from "~/pages/Offering/QualifiedInstructor/QualifiedInstructor.module.scss"

const { Title } = Typography

function OfferingQualifiedInstructorPage(props: RouteComponentProps<{ id: string }>) {
  const columns = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Email",
      dataIndex: "email"
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
      render: (record: any) => (
        <Button type="link" onClick={(e) => removeInstructor(e, record.instructorID)}>
          Remove
        </Button>
      )
    }
  ]

  const [loading, setLoading] = useState<boolean>(false)
  const [offeringInstructorList, setOfferingInstructorList] = useState<Array<any>>([])
  const [pendingRowDataSelection, setPendingRowDataSelection] = useState<Array<any>>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<Array<any>>([])

  const offeringID = props.match.params.id

  async function removeInstructor(event: any, instructorID: any) {
    const allRowData = selectedRowKeys
    const index = allRowData.indexOf(instructorID)
    allRowData.splice(index, 1)

    setLoading(true)
    const result = await updateInstructors(Number(offeringID), allRowData)

    if (result && result.success) {
      setLoading(false)
      setPendingRowDataSelection(allRowData)
    }
  }

  useEffect(() => {
    const loadOfferingInstructors = async function () {
      setLoading(true)

      const result = await getQualifiedInstructors(Number(offeringID))

      if (result && result.success) {
        const selectedRowData = []
        for (let i = 0; i < result.data.length; i++) {
          selectedRowData.push(result.data[i].instructorID)
        }
        setLoading(false)
        setOfferingInstructorList(result.data)
        setSelectedRowKeys(selectedRowData)
      }
    }
    loadOfferingInstructors()
  }, [offeringID, pendingRowDataSelection])

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col className="gutter-row" xs={24} sm={24} md={12}>
          <Title level={3}>Manage Offering Instructors</Title>
        </Col>
        <Col className={`gutter-row ${styles.textAlignRight}`} xs={24} sm={24} md={12}>
          <OfferingInstructorModalOpenButton offeringId={parseInt(offeringID)} />
        </Col>
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className={styles.paddingTop10px}>
        <Col className={`gutter-row ${styles.offeringInstructorDetails}`} xs={24} sm={24} md={24}>
          <Table
            columns={columns}
            dataSource={offeringInstructorList}
            loading={loading}
            bordered
            rowKey="instructorID"
            pagination={{ position: ["topLeft"] }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default OfferingQualifiedInstructorPage

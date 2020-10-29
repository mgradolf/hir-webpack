import React from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { Space, Row, Col } from "antd"
import ResponsiveTable, { RecordType } from "~/Component/Common/ResponsiveTable"
import SectionMenu from "~/Component/Section/SectionMenu"
import { ColumnsType } from "antd/lib/table"
import { searchSection } from "~/ApiServices/BizApi/course/courseIF"

interface ITableWrapperProps {
  id?: string
  searchParams: { [key: string]: any }
  isModal?: boolean
  rowSelection?: any
  offeringID?: number
}

export default function SectionTable(props: ITableWrapperProps) {
  const columns: ColumnsType<RecordType> = [
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      key: "SectionNumber",
      render: (text: any, record: any) =>
        props.isModal ? (
          text
        ) : (
          <Link
            to={
              props.offeringID
                ? `/offering/${props.offeringID}/section/${record.SectionID}`
                : `/section/${record.SectionID}`
            }
          >
            {text}
          </Link>
        ),
      sorter: (a: any, b: any) => a.SectionNumber.length - b.SectionNumber.length
    },
    {
      title: "Offering Name",
      dataIndex: "OfferingName",
      key: "OfferingName",
      sorter: (a: any, b: any) => a.OfferingName.length - b.OfferingName.length
    },
    {
      title: "Offering Code",
      dataIndex: "OfferingCode",
      key: "OfferingCode",
      sorter: (a: any, b: any) => a.OfferingCode.length - b.OfferingCode.length,
      render: (text: any, record: any) =>
        props.isModal ? text : <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
    },
    {
      title: "Creation Date",
      dataIndex: "CreationDate",
      key: "CreationDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Termination Date",
      dataIndex: "TerminationDate",
      key: "TerminationDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Instructors",
      dataIndex: "Faculty",
      key: "Faculty",
      render: (faculties: Array<any> | null) => {
        return (
          Array.isArray(faculties) &&
          faculties.map((x: any, index: number) => <div key={x.FacultyDescriptor + index}>- {x.FacultyDescriptor}</div>)
        )
      }
    },
    {
      title: "Status",
      dataIndex: "StatusCode",
      key: "StatusCode"
    },
    {
      title: "Start Date",
      dataIndex: "StartDate",
      key: "StartDate",
      render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
    },
    {
      title: "Locations",
      dataIndex: "Locations",
      key: "Locations",
      render: (locations: Array<string | null> | null) => {
        return Array.isArray(locations) && locations.map((x: any) => (x ? <span>{x}</span> : null))
      }
    }
  ]

  if (!props.isModal) {
    columns.push({
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <SectionMenu section={record} />
        </Space>
      )
    })
  }

  function expandableRowRender(data: any, mobileView: boolean) {
    return (
      <div style={{ border: "1px solid", padding: "5px" }}>
        <Row>
          <Col span="10">Meets On:</Col>
          <Col span="14">{data.MeetsOn}</Col>
        </Row>
        {mobileView && (
          <Row>
            <Col span="10">Creation Date:</Col>
            <Col span="14">{data.CreationDate !== null ? moment(data.CreationDate).format("YYYY-MM-DD") : ""}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Termination Date:</Col>
            <Col span="14">
              {data.TerminationDate !== null ? moment(data.TerminationDate).format("YYYY-MM-DD") : ""}
            </Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Offering Name:</Col>
            <Col span="14">{data.OfferingName}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Instructors:</Col>
            <Col span="14">
              {Array.isArray(data.Faculty) && data.Faculty.map((x: any) => <div>- {x.FacultyDescriptor}</div>)}
            </Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Status:</Col>
            <Col span="14">{data.StatusCode}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Start Date:</Col>
            <Col span="14">{data.StartDate !== null ? moment(data.StartDate).format("YYYY-MM-DD") : ""}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Meets On:</Col>
            <Col span="14">{data.MeetsOn}</Col>
          </Row>
        )}
        {mobileView && (
          <Row>
            <Col span="10">Locations:</Col>
            <Col span="14">
              {Array.isArray(data.Locations) && data.Locations.map((x: any) => (x ? <span>{x}</span> : null))}
            </Col>
          </Row>
        )}
      </div>
    )
  }

  return (
    <ResponsiveTable
      columns={columns}
      searchFunc={searchSection}
      searchParams={props.searchParams}
      bordered
      breakpoints={["md", "lg", "xl", "xxl"]}
      responsiveColumnIndices={[1, 2, 3, 5, 6, 7, 8]}
      expandableRowRender={expandableRowRender}
      rowKey="SectionID"
      pagination={{ position: ["topLeft"], pageSize: 20 }}
      isModal={props.isModal}
      rowSelection={props.rowSelection}
    />
  )
}

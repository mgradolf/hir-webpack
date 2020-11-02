import React, { useState } from "react"
import { Button, Space } from "antd"
import SearchPage from "~/Component/Common/Page/SearchPage"
import SectionSearchFilterMeta from "~/FormMeta/Section/SectionSearchFilterMeta"
import { ColumnsType } from "antd/lib/table"
import { RecordType } from "~/Component/Common/ResponsiveTable"
import { Link, RouteComponentProps } from "react-router-dom"
import moment from "moment"
import SectionMenu from "~/Component/Section/SectionMenu"
import { searchSection } from "~/ApiServices/BizApi/course/courseIF"
import SectionFormModal from "~/Component/Section/CreateEdit/SectionFormModal"

export default function Offering(props: RouteComponentProps<{ offeringID: string }>) {
  const offeringID = Number(props.match.params.offeringID)
  const [showModal, setShowModal] = useState(false)
  const columns: ColumnsType<RecordType> = [
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      key: "SectionNumber",
      render: (text: any, record: any) => (
        <Link to={offeringID ? `/offering/${offeringID}/section/${record.SectionID}` : `/section/${record.SectionID}`}>
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
      render: (text: any, record: any) => <Link to={`/offering/${record.OfferingID}`}>{text}</Link>
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
    },
    {
      title: "Action",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <SectionMenu section={record} />
        </Space>
      )
    }
  ]

  return (
    <SearchPage
      blocks={[
        <>
          {setShowModal && (
            <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal && setShowModal(true)}>
              + Create Section
            </Button>
          )}
          {showModal && <SectionFormModal OfferingID={offeringID} closeModal={() => setShowModal(false)} />}
        </>
      ]}
      hideSearchField={false}
      title="Manage Sections"
      meta={SectionSearchFilterMeta}
      tableProps={{
        columns: columns,
        searchFunc: searchSection,
        responsiveColumnIndices: [1, 2, 3, 4, 5],
        pagination: { position: ["topLeft"], pageSize: 20 },
        rowKey: "OfferingID"
      }}
    ></SearchPage>
  )
}

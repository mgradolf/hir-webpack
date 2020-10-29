import React, { useState } from "react"
import { Card, Button, Form, Input, Row, Col } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import SearchFilters from "~/Component/Common/SearchFilters"
import OfferingSearchFilterMeta from "~/FormMeta/Section/SectionSearchFilterMeta"
import ResponsiveTable, { RecordType } from "~/Component/Common/ResponsiveTable"
import { searchSection } from "~/ApiServices/BizApi/course/courseIF"
import moment from "moment"
import { ColumnsType } from "antd/lib/table"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"

interface ISectionLookupModal {
  closeModal: (sections?: any[]) => void
}

function SectionLookupModal(props: ISectionLookupModal) {
  const columns: ColumnsType<RecordType> = [
    {
      title: "Section Number",
      dataIndex: "SectionNumber",
      key: "SectionNumber",
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
      sorter: (a: any, b: any) => a.OfferingCode.length - b.OfferingCode.length
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
  const [searchParams, setSearchParams] = useState({})
  const [selectedSections, setSelectedSections] = useState<any[]>([])
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(selectedRows)
      setSelectedSections(selectedRows)
    }
  }
  return (
    <Modal width="1000px">
      <Card
        title="Select offerings"
        actions={[
          <Button type="ghost" onClick={() => props.closeModal()}>
            Cancel
          </Button>,
          <Button
            type="primary"
            disabled={selectedSections.length === 0}
            onClick={() => props.closeModal(selectedSections)}
          >
            Select
          </Button>
        ]}
      >
        <div className="modal-card">
          <SearchFilters
            meta={OfferingSearchFilterMeta}
            isModalView={true}
            isCheckeble={false}
            initialFilter={searchParams}
            title={""}
            visible
            toggleVisiibility={() => {
              setSelectedSections([])
            }}
            onApplyChanges={(newSearchParams, newSearchParamsCount) => {
              setSearchParams(newSearchParams)
            }}
          />
          <ResponsiveTable
            columns={columns}
            searchFunc={searchSection}
            searchParams={[searchParams]}
            isModal
            rowKey="SectionID"
            rowSelection={rowSelection}
          />
        </div>
      </Card>
    </Modal>
  )
}

export function SectionLookupOpenButton(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  const [showModal, setShowModal] = useState(false)
  const [selectedSection, setSelectedSection] = useState<{ [key: string]: any }>({})
  return (
    <Form.Item label="Section" labelCol={{ span: 6 }}>
      <Row>
        <Col span="auto">
          <Input value={selectedSection.SectionNumber} readOnly />
        </Col>
        <Col>
          <Button onClick={() => setShowModal(true)}>Lookup</Button>
        </Col>
      </Row>
      {showModal && (
        <SectionLookupModal
          closeModal={(sections) => {
            if (sections && sections.length > 0) {
              setSelectedSection(sections[0])
              props.filterValueChanged({ SectionID: sections[0].SectionID })
            }
            setShowModal(false)
          }}
        />
      )}
    </Form.Item>
  )
}

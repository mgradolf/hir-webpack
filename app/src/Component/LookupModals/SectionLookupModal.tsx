import React, { useEffect, useState } from "react"
import { Card, Button, Form, Input, Row, Col } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import SearchFilters from "~/Component/Common/SearchFilters"
import OfferingSearchFilterMeta from "~/FormMeta/Section/SectionSearchFilterMeta"
import { renderDate, ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { searchSection } from "~/ApiServices/BizApi/course/courseIF"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
import { FormInstance } from "antd/lib/form"
import { getEntityById } from "~/ApiServices/Service/EntityService"

interface ISectionLookupModal {
  closeModal: (sections?: any[]) => void
}

export function SectionLookupModal(props: ISectionLookupModal) {
  const columns: TableColumnType = [
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
      render: renderDate
    },
    {
      title: "Termination Date",
      dataIndex: "TerminationDate",
      key: "TerminationDate",
      render: renderDate
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
      render: renderDate
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
            hideFilters={() => {
              setSelectedSections([])
            }}
            onApplyChanges={(newSearchParams, newSearchParamsCount) => {
              setSearchParams(newSearchParams)
            }}
          />
          <ResponsiveTable
            columns={columns}
            searchFunc={searchSection}
            searchParams={searchParams}
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
  const [selectedSection, setSelectedSection] = useState<any>({})
  const [disabled, setDisabled] = useState(props.extraProps && props.extraProps.SectionID)

  useEffect(() => {
    if (props.extraProps && props.extraProps.SectionID) {
      getEntityById("Section", props.extraProps.SectionID).then((x) => {
        if (x.success) {
          setDisabled(true)
          setSelectedSection(x.data)
          props.filterValueChanged({
            [props.fieldName]: x.data.SectionID
          })
        }
      })
    }
  }, [props])
  return (
    <Form.Item colon={false} label="Section" labelCol={{ span: 8 }}>
      <Row>
        <Col span={12}>
          <Input value={selectedSection.SectionNumber} readOnly />
        </Col>
        <Col span={4}>
          <Button onClick={() => setShowModal(true)} {...disabled}>
            Lookup
          </Button>
        </Col>
      </Row>
      {showModal && (
        <SectionLookupModal
          closeModal={(sections) => {
            if (sections && sections.length > 0) {
              setSelectedSection(sections[0])
              props.filterValueChanged({
                [props.fieldName]:
                  props.extraProps && props.extraProps.isArray ? [sections[0].SectionID] : sections[0].SectionID
              })
            }
            setShowModal(false)
          }}
        />
      )}
    </Form.Item>
  )
}

interface ISectionLookupFormField {
  fieldName?: string
  isArray?: boolean
  formInstance?: FormInstance
  setSectionID?: (id: number) => void
}
export function SectionLookupFormField(props: ISectionLookupFormField) {
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
              props.formInstance &&
                props.fieldName &&
                props.formInstance.setFieldsValue({
                  [props.fieldName]: props.isArray ? [sections[0].SectionID] : sections[0].SectionID
                })
              props.setSectionID && props.setSectionID(sections[0].SectionID)
            }
            setShowModal(false)
          }}
        />
      )}
    </Form.Item>
  )
}

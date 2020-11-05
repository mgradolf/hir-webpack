import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import SearchFilters from "~/Component/Common/SearchFilters"
import { Row, Card, Button, Form, Col, Input } from "antd"
import PersonTable from "~/Component/Person/PersonTable"
import FilterOpenButton from "~/Component/Person/PersonFilterOpenButton"
import PersonSearchFilterMeta from "~/FormMeta/Person/PersonSearchFilterMeta"
import { searchPersons } from "~/ApiServices/BizApi/person/persongIF"
import { useEffect } from "react"
import { IFilterFieldComponent, IFilterGenericComponentProps } from "~/Component/Common/SearchFilters/common"
const { useState } = React

interface IPersonLookupModal {
  isArray?: boolean
  closeModal: (persons?: Array<{ [key: string]: any }>) => void
}

enum ModalPages {
  FilterPage,
  PersonList
}

export default function PersonLookupModal(props: IPersonLookupModal) {
  const [filterData, updateFilterData] = useState<{ [key: string]: any }>({})
  const [filterCount, updateFilterCount] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [persons, setPersons] = useState<any[]>([])
  const [modalSelectedPage, setModalPage] = useState<ModalPages>(ModalPages.FilterPage)
  const [selectedPersons, setSelectedPersons] = useState<Array<{ [key: string]: any }>>([])

  useEffect(() => {
    setLoading(true)
    searchPersons(filterData).then((x) => {
      if (x.success) setPersons(x.data)
      setLoading(false)
    })
  }, [filterData])

  const rowSelection = {
    type: props.isArray ? "checkbox" : "radio",
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedPersons(selectedRows)
    },
    getCheckboxProps: (record: { name: string }) => ({
      name: record.name
    })
  }

  return (
    <Modal width="1000px" zIndex={101}>
      {(modalSelectedPage === ModalPages.FilterPage && (
        <Row justify="center">
          <SearchFilters
            meta={PersonSearchFilterMeta}
            isModalView={true}
            initialFilter={filterData}
            title="Person Filter"
            visible
            onApplyChanges={(newFilterValues, newFilterCount) => {
              updateFilterData({
                ...filterData,
                ...newFilterValues
              })

              updateFilterCount(newFilterCount)
              setModalPage(ModalPages.PersonList)
            }}
          />
        </Row>
      )) ||
        (modalSelectedPage === ModalPages.PersonList && (
          <Card
            title="Select Person"
            actions={[
              <Button type="ghost" onClick={() => props.closeModal()}>
                Cancel
              </Button>,
              <Button
                type="primary"
                disabled={selectedPersons.length === 0}
                onClick={() => props.closeModal && props.closeModal(selectedPersons)}
              >
                Select
              </Button>
            ]}
          >
            <FilterOpenButton
              filterCount={filterCount as number}
              filterColumnVisible={false}
              toggleFilter={() => setModalPage(ModalPages.FilterPage)}
              hideCreateButton
            />

            <PersonTable dataSource={persons} loading={loading} isModal={true} rowSelection={rowSelection} />
          </Card>
        )) || <></>}
    </Modal>
  )
}

export function PersonLookupOpenButton(props: IFilterGenericComponentProps<IFilterFieldComponent>) {
  const [showModal, setShowModal] = useState(false)
  const [selectedPersons, setSelectedPerson] = useState<{ [key: string]: any }>({})
  return (
    <Form.Item label="Section" labelCol={{ span: 6 }}>
      <Row>
        <Col span="auto">
          <Input value={selectedPersons.PersonDescriptor} readOnly />
        </Col>
        <Col>
          <Button onClick={() => setShowModal(true)}>Lookup</Button>
        </Col>
      </Row>
      {showModal && (
        <PersonLookupModal
          {...(props.extraProps && { isArray: props.extraProps.isArray })}
          closeModal={(persons) => {
            if (persons && persons.length > 0) {
              setSelectedPerson(persons[0])
              props.filterValueChanged({
                [props.fieldName]:
                  props.extraProps && props.extraProps.isArray ? [persons[0].PersonID] : persons[0].PersonID
              })
            }
            setShowModal(false)
          }}
        />
      )}
    </Form.Item>
  )
}

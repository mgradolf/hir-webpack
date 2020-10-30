import * as React from "react"
import Modal from "~/Component/Common/Modal/index2"
import SearchFilters from "~/Component/Common/SearchFilters"
import { Row, Card, Button } from "antd"
import { eventBus, EVENT_PERSON_SELECTED_FOR_WAITLIST_ENTRY_CREATION } from "~/utils/EventBus"
import PersonTable from "~/Component/Person/PersonTable"
import FilterOpenButton from "~/Component/Person/PersonFilterOpenButton"
import PersonSearchFilterMeta from "~/FormMeta/Person/PersonSearchFilterMeta"
import { searchPersons } from "~/ApiServices/BizApi/person/persongIF"
import { useEffect } from "react"
import { IParamsToBeDispatched } from "~/FormMeta/WaitlistEntries/WaitlistSearchCustomLookupFilter"
import { WAITLIST_ENTRIES_LOOKUP_TYPES } from "~/utils/Constants"
const { useState } = React

interface IPersonLookupModal {
  type: string
  closePersonLookupModal: (flag: boolean) => void
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
  const [selectedPerson, setSelectedPerson] = useState<{ [key: string]: any }>({})

  useEffect(() => {
    setLoading(true)
    searchPersons(filterData).then((x) => {
      if (x.success) setPersons(x.data)
      setLoading(false)
    })
  }, [filterData])

  const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedPerson(selectedRows[0])
    },
    getCheckboxProps: (record: { name: string }) => ({
      name: record.name
    })
  }

  function handleSelect() {
    const selected: IParamsToBeDispatched = {
      NameToDisplay: "",
      Params: {}
    }
    selected.NameToDisplay = selectedPerson.PersonDescriptor
    switch (props.type) {
      case WAITLIST_ENTRIES_LOOKUP_TYPES.PURCHASER:
        selected.Params = { RequesterPersonID: selectedPerson.PersonID }
        break
      case WAITLIST_ENTRIES_LOOKUP_TYPES.STUDENT:
        selected.Params = { RecipientPersonID: selectedPerson.PersonID }
        break
      case WAITLIST_ENTRIES_LOOKUP_TYPES.PURCHASER_STUDENT:
        selected.Params = {
          RequesterRecipientPersonID1: selectedPerson.PersonID,
          RequesterRecipientPersonID2: selectedPerson.PersonID
        }
        break
    }

    eventBus.publish(EVENT_PERSON_SELECTED_FOR_WAITLIST_ENTRY_CREATION, selected)
    props.closePersonLookupModal && props.closePersonLookupModal(false)
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
            hideFilters={() => props.closePersonLookupModal && props.closePersonLookupModal(false)}
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
              <Button type="ghost" onClick={() => props.closePersonLookupModal(false)}>
                Cancel
              </Button>,
              <Button type="primary" disabled={selectedPerson.length === 0} onClick={handleSelect}>
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

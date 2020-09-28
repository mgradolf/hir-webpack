import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showAddInstructorFromOfferingModal } from "~/Store/ModalState"
import { Row, Col, Card, Button } from "antd"
import { eventBus, REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE } from "~/utils/EventBus"
import onlyUnique from "~/utils/util"
import InstructorSearchFilters from "~/Component/Common/SearchFilters"
import { updateInstructors } from "~/ApiServices/Service/OfferingService"
import { QualifiedInstructorTable } from "./QualifiedInstructorTable"
import { FilterOpenButton } from "~/Component/Offering/OfferingFilterOpenButton"
import InstructorSearchFiltersMeta from "~/FormMeta/Offering/QualifiedInstructorSearchFilterMeta"
import { useInstructorFilterState, useInstructors } from "~/Hooks/Offering/QualifiedInstructors"

const { useState } = React

interface IInstructorProps {
  offeringID: number
  rowData: Array<any>
  closeAddInstructorFromInstructorModal: () => void
}

enum ModalPages {
  FilterPage,
  InstructorsList
}

function AddInstructorFromInstructorModal({
  offeringID,
  rowData,
  closeAddInstructorFromInstructorModal
}: IInstructorProps) {
  const { filterData, updateFilterData } = useInstructorFilterState()
  const [loading, instructorItems] = useInstructors(filterData)
  const [filterCount, updateFilterCount] = useState<number>(0)

  const [modalSelectedPage, setModalPage] = useState<ModalPages>(ModalPages.FilterPage)
  const [selectedInstructors, setSelectedInstructors] = useState<any[]>([])

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedInstructors(selectedRows)
    },
    getCheckboxProps: (record: { name: string }) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name
    })
  }

  function handleSelect() {
    const selectedInstructorIds = selectedInstructors.map((instructor) => instructor.FacultyID)
    rowData.push(...selectedInstructorIds)

    const uniqueRowData = rowData.filter(onlyUnique)
    updateInstructors(offeringID, uniqueRowData)
      .then(() => eventBus.publish(REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE))
      .finally(closeAddInstructorFromInstructorModal)
  }

  const actions = []
  actions.push(<Button onClick={closeAddInstructorFromInstructorModal}>Cancel</Button>)
  actions.push(
    <Button disabled={selectedInstructors.length === 0} onClick={handleSelect}>
      Select
    </Button>
  )

  return (
    <Modal showModal={true} width="1000px">
      {(modalSelectedPage === ModalPages.FilterPage && (
        <Row justify="center">
          <InstructorSearchFilters
            data={filterData}
            visible
            isModalView
            meta={InstructorSearchFiltersMeta}
            title="Instructor Filter"
            toggleVisiibility={() => {
              closeAddInstructorFromInstructorModal()
              setSelectedInstructors([])
            }}
            onApplyChanges={(newFilterValues, newFilterCount) => {
              updateFilterData({ ...filterData, ...newFilterValues })
              updateFilterCount(newFilterCount)
              setModalPage(ModalPages.InstructorsList)
            }}
          />
        </Row>
      )) ||
        (modalSelectedPage === ModalPages.InstructorsList && (
          <Card title={"Select Instructors"} actions={actions}>
            <FilterOpenButton
              filterCount={filterCount}
              filterColumnVisible={false}
              toggleFilter={() => setModalPage(ModalPages.FilterPage)}
              hideCreateButton
            />
            <Col style={{ height: "65vh" }}>
              <QualifiedInstructorTable
                dataSource={instructorItems}
                loading={loading}
                isModal
                rowSelection={rowSelection}
              />
            </Col>
          </Card>
        )) || <></>}
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeAddInstructorFromInstructorModal: () => dispatch(showAddInstructorFromOfferingModal(false))
  }
}

export default connect(undefined, mapDispatchToProps)(AddInstructorFromInstructorModal)

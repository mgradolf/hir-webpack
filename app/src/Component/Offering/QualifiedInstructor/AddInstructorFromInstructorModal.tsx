import * as React from "react"
import Modal from "~/Component/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showAddInstructorFromOfferingModal } from "~/store/ModalState"
import { FilterColumn, IFilterValues } from "~/Component/Offering/QualifiedInstructor/QualifiedInstructorFilterColumn"
import { Row, Table, Col, Grid, Card, Button } from "antd"
import { eventBus, REFRESH_OFFERING_QUALIFIED_INSTRUCTOR_PAGE } from "~/utils/EventBus"
import onlyUnique from "~/utils/util"
import { searchFaculties } from "~/ApiServices/BizApi/faculty/facultyIf"
import { Breakpoint } from "antd/lib/_util/responsiveObserve"
import moment from "moment"
import { updateInstructors } from "~/ApiServices/Service/OfferingService"
import { QualifiedInstructorTable } from "./QualifiedInstructorTable"
import { SelectedFilters } from "~/Component/Offering"
import { useInstructorFilterState, useInstructors } from "../offeringUtils"

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

  console.log("offeirng ID: " + offeringID)
  console.log("Row data: " + rowData)

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
          <FilterColumn
            data={filterData}
            visible
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
          <Card title={"Add Instructors"} actions={actions}>
            <SelectedFilters
              filterCount={filterCount}
              filterColumnVisible={false}
              toggleFilter={() => setModalPage(ModalPages.FilterPage)}
              hideCreateButton
            />
            <Col style={{ height: "65vh", overflowY: "scroll", padding: "10px" }}>
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

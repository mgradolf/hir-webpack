import { Row, Card, Col } from "antd"
import React, { useState } from "react"
import Modal from "~/Component/Modal"
import { FilterColumn, SelectedFilters } from "~/Component/Offering"
import { QualifiedInstructorTable } from "~/Component/Offering/QualifiedInstructor/QualifiedInstructorTable"

enum ModalPages {
  FilterPage,
  ProgramList
}

function AddProgramModal(props: any) {
  const [modalSelectedPage, setModalPage] = useState<ModalPages>(ModalPages.FilterPage)
  // return (
  //   <Modal showModal={true} width="1000px">
  //     {(modalSelectedPage === ModalPages.FilterPage && (
  //       <Row justify="center">
  //         <FilterColumn
  //           data={filterData}
  //           visible
  //           toggleVisiibility={() => {
  //             closeAddInstructorFromInstructorModal()
  //             setSelectedInstructors([])
  //           }}
  //           onApplyChanges={(newFilterValues, newFilterCount) => {
  //             updateFilterData({ ...filterData, ...newFilterValues })
  //             updateFilterCount(newFilterCount)
  //             setModalPage(ModalPages.ProgramList)
  //           }}
  //         />
  //       </Row>
  //     )) ||
  //       (modalSelectedPage === ModalPages.InstructorsList && (
  //         <Card title={"Select Instructors"} actions={actions}>
  //           <SelectedFilters
  //             filterCount={filterCount}
  //             filterColumnVisible={false}
  //             toggleFilter={() => setModalPage(ModalPages.FilterPage)}
  //             hideCreateButton
  //           />
  //           <Col style={{ height: "65vh" }}>
  //             <ProgramListTable
  //               dataSource={instructorItems}
  //               loading={loading}
  //               isModal
  //               rowSelection={rowSelection}
  //             />
  //           </Col>
  //         </Card>
  //       )) || <></>}
  //   </Modal>
  // )
  return null
}

export default AddProgramModal

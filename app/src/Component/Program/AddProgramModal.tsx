import { Row, Card, Col, Button } from "antd"
import React, { useState, useCallback } from "react"
import Modal from "~/Component/Common/Modal"
import ProgramSearchFilter from "~/Component/Common/SearchFilters"
import ProgramSearchFilterMeta from "~/FormMeta/Program/ProgramSearchFilterMeta"
import ProgramListTable from "~/Component/Program/ProgramListTable"
import { FilterOpenButton } from "~/Component/Offering/OfferingFilterOpenButton"
import { useSearchFilterState, useSearchProgram } from "~/Hooks/Program"
import { RecordType } from "~/Component/Common/ResponsiveTable"
import zIndex from "~/utils/zIndex"
import { useDispatch, useSelector } from "react-redux"

import { showAddProgramModal } from "~/Store/ModalState"
import { AppState } from "~/Store"

enum ModalPages {
  FilterPage,
  ProgramList
}

function AddProgramModal() {
  const { filterData, updateFilterData } = useSearchFilterState()
  const [loading, programItems] = useSearchProgram(filterData)
  const [filterCount, updateFilterCount] = useState<number>(0)
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null)
  const dispatch = useDispatch()

  const closeAddProgramModal = useCallback(() => dispatch(showAddProgramModal(false)), [dispatch])
  const { formInstance, valueKey, displayKey } = useSelector(
    (state: AppState) => state.modalState.addProgramModal.config
  )
  const [modalSelectedPage, setModalPage] = useState<ModalPages>(ModalPages.FilterPage)

  const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys: any, selectedRows: any[]) => {
      setSelectedProgram(selectedRows[0])
    }
  }

  console.log("PROGRAM ID OF SELECTED PROGRAM", selectedProgram)
  console.log("VALUEKEY", valueKey)
  console.log("FORM DATA FROM NESTED MODAL", formInstance.getFieldsValue())

  const cardActions = [
    <Button onClick={closeAddProgramModal}>Cancel</Button>,
    <Button
      disabled={selectedProgram === null}
      onClick={() => {
        formInstance.setFieldsValue({
          [valueKey]: selectedProgram.ProgramID,
          [displayKey]: selectedProgram.ProgramCode
        })
        closeAddProgramModal()
      }}
    >
      Select
    </Button>
  ]

  return (
    <Modal showModal={true} width="1000px" zIndex={zIndex.defaultModal + 1}>
      {(modalSelectedPage === ModalPages.FilterPage && (
        <Row justify="center">
          <ProgramSearchFilter
            title="Program Filter"
            isModalView
            meta={ProgramSearchFilterMeta}
            data={(filterData as unknown) as RecordType}
            visible
            toggleVisiibility={() => {
              closeAddProgramModal()
              setSelectedProgram(null)
            }}
            onApplyChanges={(newFilterValues, newFilterCount) => {
              updateFilterData({ ...filterData, ...newFilterValues })
              updateFilterCount(newFilterCount)
              setModalPage(ModalPages.ProgramList)
            }}
          />
        </Row>
      )) ||
        (modalSelectedPage === ModalPages.ProgramList && (
          <Card title="Select Program" actions={cardActions}>
            <FilterOpenButton
              filterCount={filterCount}
              filterColumnVisible={false}
              toggleFilter={() => setModalPage(ModalPages.FilterPage)}
              hideCreateButton
            />
            <Col style={{ height: "65vh" }}>
              <ProgramListTable dataSource={programItems} loading={loading} isModal rowSelection={rowSelection} />
            </Col>
          </Card>
        )) || <></>}
    </Modal>
  )
}

export default AddProgramModal

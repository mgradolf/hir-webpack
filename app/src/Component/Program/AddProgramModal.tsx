import { Card, Col, Button } from "antd"
import React, { useState, useCallback, useEffect } from "react"
import Modal from "~/Component/Common/Modal"
import { CustomForm } from "~/Component/Common/Form"
import { ProgramSearchMeta } from "~/TableSearchMeta/Program/ProgramSearchMeta"
import ProgramListTable from "~/Component/Program/ProgramListTable"
import { FilterOpenButton } from "~/Component/Offering/OfferingFilterOpenButton"
import { IProgramFilterValues, useSearchFilterState, useSearchProgram } from "~/Hooks/Program"
import zIndex from "~/utils/zIndex"
import { useDispatch, useSelector } from "react-redux"

import { showAddProgramModal } from "~/Store/ModalState"
import { AppState } from "~/Store"

function AddProgramModal() {
  const { filterData, updateFilterData, initialData } = useSearchFilterState()
  const [loading, programItems] = useSearchProgram(filterData)
  const [filterCount, updateFilterCount] = useState<number>(0)
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null)
  const dispatch = useDispatch()

  const closeAddProgramModal = useCallback(() => dispatch(showAddProgramModal(false)), [dispatch])
  const { formInstance, valueKey, displayKey } = useSelector(
    (state: AppState) => state.modalState.addProgramModal.config
  )

  const rowSelection = {
    type: "radio",
    onChange: (selectedRowKeys: any, selectedRows: any[]) => {
      setSelectedProgram(selectedRows[0])
    }
  }

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

  useEffect(() => {
    function scrollToProgramList() {
      const programListElement = document.getElementById("programList")
      if (programListElement) {
        programListElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "start"
        })
      }
    }

    if (programItems.length > 0) {
      scrollToProgramList()
    }
  }, [programItems])

  return (
    <Modal showModal={true} width="800px" zIndex={zIndex.defaultModal + 1}>
      <Card title="Select Program" actions={cardActions} style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <CustomForm
          meta={ProgramSearchMeta}
          initialFormValue={(filterData === null ? initialData : (filterData as unknown)) as { [key: string]: any }}
          hideFilters={() => {
            closeAddProgramModal()
            setSelectedProgram(null)
          }}
          onApplyChanges={(newFilterValues, newFilterCount) => {
            updateFilterData({ ...(filterData as IProgramFilterValues), ...newFilterValues })
            updateFilterCount(newFilterCount)
          }}
        />
        {programItems.length > 0 && (
          <Col>
            <FilterOpenButton filterCount={filterCount} filterColumnVisible={false} showCountOnly />

            <Col style={{ height: "65vh" }}>
              <ProgramListTable
                id="programList"
                dataSource={programItems}
                loading={loading}
                isModal
                rowSelection={rowSelection}
              />
            </Col>
          </Col>
        )}
      </Card>
    </Modal>
  )
}

export default AddProgramModal

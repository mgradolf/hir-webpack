import * as React from "react"
import Modal from "~/Component/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showAddOfferingFromRequisiteGroupModal } from "~/store/ModalState"
import { FilterColumn, IFilterValues } from "~/Component/Offering"
import { Row, Col, Card, Button } from "antd"
import { eventBus, REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventBus"
import { addOfferingIntoRequisiteGroup } from "~/ApiServices/BizApi/course/requisiteIf"
import { useOfferings, useOfferingFilterState } from "~/Hooks/Offering"
import { OfferingTable } from "~/Component/Offering/OfferingTable"
import { SelectedFilters } from "~/Component/Offering/SelectedFilters"

const { useState } = React

interface IOfferingRequisiteGroupProps {
  offeringID: number
  requisiteGroupID: number
  closeAddOfferingFromRequisiteGroupModal: () => void
}

enum ModalPages {
  FilterPage,
  OfferingsList
}

function AddOfferingFromRequisiteGroupModal({
  offeringID,
  requisiteGroupID,
  closeAddOfferingFromRequisiteGroupModal
}: IOfferingRequisiteGroupProps) {
  const { filterData, updateFilterData } = useOfferingFilterState()
  const [filterCount, updateFilterCount] = useState<number>(0)

  const [loading, offeringItems] = useOfferings(filterData as IFilterValues)
  const [modalSelectedPage, setModalPage] = useState<ModalPages>(ModalPages.FilterPage)
  const [selectedOfferings, setSelectedOfferings] = useState<any[]>([])

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedOfferings(selectedRows)
    },
    getCheckboxProps: (record: { name: string }) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name
    })
  }

  function handleSelect() {
    const selectedOfferingIds = selectedOfferings.map((offering) => offering.OfferingID)
    addOfferingIntoRequisiteGroup([selectedOfferingIds, requisiteGroupID])
    closeAddOfferingFromRequisiteGroupModal()
    eventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
  }

  return (
    <Modal showModal={true} width="1000px">
      {(modalSelectedPage === ModalPages.FilterPage && (
        <Row justify="center">
          <FilterColumn
            isModalView={true}
            data={filterData}
            visible
            toggleVisiibility={() => {
              closeAddOfferingFromRequisiteGroupModal()
              setSelectedOfferings([])
            }}
            onApplyChanges={(newFilterValues, newFilterCount) => {
              updateFilterData({
                ...filterData,
                ...newFilterValues
              })

              updateFilterCount(newFilterCount)
              setModalPage(ModalPages.OfferingsList)
            }}
          />
        </Row>
      )) ||
        (modalSelectedPage === ModalPages.OfferingsList && (
          <Card
            title="Select offerings"
            actions={[
              <Button type="ghost" onClick={closeAddOfferingFromRequisiteGroupModal}>
                Cancel
              </Button>,
              <Button type="primary" disabled={selectedOfferings.length === 0} onClick={handleSelect}>
                Select
              </Button>
            ]}
          >
            <SelectedFilters
              filterCount={filterCount as number}
              filterColumnVisible={false}
              toggleFilter={() => setModalPage(ModalPages.FilterPage)}
              hideCreateButton
            />
            <Col style={{ height: "65vh" }}>
              <OfferingTable dataSource={offeringItems} loading={loading} isModal rowSelection={rowSelection} />
            </Col>
          </Card>
        )) || <></>}
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeAddOfferingFromRequisiteGroupModal: () => dispatch(showAddOfferingFromRequisiteGroupModal(false))
  }
}

export default connect(undefined, mapDispatchToProps)(AddOfferingFromRequisiteGroupModal)

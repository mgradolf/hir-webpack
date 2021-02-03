import * as React from "react"
import Modal from "~/Component/Common/Modal"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { showAddOfferingFromRequisiteGroupModal } from "~/Store/ModalState"
import { CustomForm } from "~/Component/Common/Form"
import { Row, Card, Button } from "antd"
import { eventBus, REFRESH_OFFERING_REQUISITE_GROUP_PAGE } from "~/utils/EventBus"
import { addOfferingIntoRequisiteGroup } from "~/ApiServices/BizApi/course/requisiteIf"
import { FilterOpenButton } from "~/Component/Offering/OfferingFilterOpenButton"
import { OfferingSearchMeta } from "~/FormMeta/Offering/OfferingSearchMeta"
import { getOfferingTableColumns } from "~/FormMeta/Offering/OfferingTableColumns"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"

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
  const [searchParams, setSearchParams] = useState<{ [key: string]: any }>({})
  const [filterCount, updateFilterCount] = useState<number>(0)
  const [modalSelectedPage, setModalPage] = useState<ModalPages>(ModalPages.FilterPage)
  const [selectedOfferings, setSelectedOfferings] = useState<any[]>([])

  const rowSelection: any = {
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
    addOfferingIntoRequisiteGroup({
      SelectedOfferingIds: selectedOfferingIds,
      RequisiteGroupID: requisiteGroupID
    }).then((x) => {
      if (x.success) {
        closeAddOfferingFromRequisiteGroupModal()
        eventBus.publish(REFRESH_OFFERING_REQUISITE_GROUP_PAGE)
      } else {
        // handle error
      }
    })
  }

  return (
    <Modal showModal={true} width="1000px">
      <div style={{ padding: "10px", height: "65vh" }}>
        {(modalSelectedPage === ModalPages.FilterPage && (
          <Row justify="center">
            <CustomForm
              meta={OfferingSearchMeta}
              initialFilter={{}}
              hideFilters={() => {
                closeAddOfferingFromRequisiteGroupModal()
                setSelectedOfferings([])
              }}
              onApplyChanges={(newFilterValues, newFilterCount) => {
                setSearchParams(newFilterValues)

                updateFilterCount(newFilterCount)
                setModalPage(ModalPages.OfferingsList)
              }}
            />
          </Row>
        )) ||
          (modalSelectedPage === ModalPages.OfferingsList && (
            <Card
              title=""
              actions={[
                <Button type="ghost" onClick={closeAddOfferingFromRequisiteGroupModal}>
                  Cancel
                </Button>,
                <Button type="primary" disabled={selectedOfferings.length === 0} onClick={handleSelect}>
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
              <ResponsiveTable
                {...getOfferingTableColumns(true)}
                searchParams={searchParams}
                rowSelection={rowSelection}
                isModal={true}
              />
            </Card>
          )) || <></>}
      </div>
    </Modal>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    closeAddOfferingFromRequisiteGroupModal: () => dispatch(showAddOfferingFromRequisiteGroupModal(false))
  }
}

export default connect(undefined, mapDispatchToProps)(AddOfferingFromRequisiteGroupModal)

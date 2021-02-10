import { TableRowSelection } from "antd/lib/table/interface"
import React, { useState } from "react"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { CustomForm } from "~/Component/Common/Form"
import { NUMBER } from "~/Component/Common/Form/common"
import { Button } from "antd"
import NoShowDeleteModal from "~/Component/Section/NoShowDeleteModal"
import { getSectionNoShowTableColumns } from "~/FormMeta/SectionNoShow/NoShowTableColumns"
import { REFRESH_SECTION_NO_SHOW_PAGE } from "~/utils/EventBus"

export default function SectionNoShowPage(props: { SectionID: number }) {
  const [searchParams, setSearchParams] = useState({ SectionID: props.SectionID })
  const [selectedRows, setSelectedRows] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)

  const rowSelection: TableRowSelection<any> = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(selectedRows)
      setSelectedRows(
        selectedRows.map((x: any) => {
          return {
            StudentID: x.StudentID,
            SeatGroupID: x.SeatGroupID
          }
        })
      )
    },
    getCheckboxProps: (record: { StudentFirstName: string }) => ({
      name: record.StudentFirstName
    })
  }

  return (
    <div className="site-layout-content">
      <NoShowDeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedRows={selectedRows}
        SectionID={props.SectionID}
      />
      <CustomForm
        meta={[
          {
            label: "Order ID",
            inputType: NUMBER,

            fieldName: "OrderID",
            ariaLabel: "OrderID"
          }
        ]}
        hideFilters={() => {
          console.log("meo")
        }}
        onApplyChanges={(newValues: any, appliedFilterCount: number) => {
          newValues.SectionID = props.SectionID
          setSearchParams(newValues)
        }}
        initialFormValue={{}}
      />
      <Button
        style={{ float: "right", zIndex: 10 }}
        danger
        onClick={() => setShowModal(true)}
        disabled={selectedRows.length === 0}
      >
        Drop/Delete
      </Button>
      <ResponsiveTable
        {...getSectionNoShowTableColumns()}
        refreshEventName={REFRESH_SECTION_NO_SHOW_PAGE}
        searchParams={searchParams}
        rowKey="OrderDate"
        rowSelection={{
          type: "checkbox",
          ...rowSelection
        }}
      />
    </div>
  )
}

import { TableRowSelection } from "antd/lib/table/interface"
import moment from "moment"
import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchNoShowProcessings } from "~/ApiServices/Service/RegistrationService"
import NoShowTable from "~/Component/Common/ResponsiveTable"
import SearchFilter from "~/Component/Common/SearchFilters"
import { NUMBER } from "~/Component/Common/SearchFilters/common"
import { Button } from "antd"
import NoShowDeleteModal from "~/Component/Section/NoShowDeleteModal"
export default function NoShow(props: RouteComponentProps<{ sectionID: string }>) {
  const SectionID = Number(props.match.params.sectionID)
  const [searchParams, setSearchParams] = useState({ SectionID })
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
    }),
    columnTitle: "Select"
  }

  return (
    <div className="site-layout-content">
      <NoShowDeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedRows={selectedRows}
        SectionID={SectionID}
      />
      <SearchFilter
        meta={[
          {
            label: "Order Id",
            inputType: NUMBER,
            defaultValue: "",
            fieldName: "OrderID",
            ariaLabel: "OrderID"
          }
        ]}
        isCheckeble={false}
        isModalView={true}
        visible={true}
        title="Search No Show Items"
        hideFilters={() => {
          console.log("meo")
        }}
        onApplyChanges={(newValues: any, appliedFilterCount: number) => {
          newValues.SectionID = SectionID
          setSearchParams(newValues)
        }}
        initialFilter={{}}
      />
      <Button
        style={{ float: "right", zIndex: 10 }}
        danger
        onClick={() => setShowModal(true)}
        disabled={selectedRows.length === 0}
      >
        Drop/Delete
      </Button>
      <NoShowTable
        searchFunc={searchNoShowProcessings}
        searchParams={searchParams}
        rowKey="OrderDate"
        columns={[
          { title: "Student First Name", dataIndex: "StudentFirstName" },
          { title: "Last Name", dataIndex: "StudentLastName" },
          { title: "Order ID", dataIndex: "OrderID" },
          {
            title: "Order Date",
            dataIndex: "OrderDate",
            render: (text: any) => (text !== null ? moment(text).format("YYYY-MM-DD") : "")
          },
          { title: "Section Number", dataIndex: "SectionNumber" },
          { title: "Quantity", dataIndex: "Quantity" },
          { title: "Total Amount", dataIndex: "TotalAmount" }
        ]}
        rowSelection={{
          type: "checkbox",
          ...rowSelection
        }}
      />
    </div>
  )
}

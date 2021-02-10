import { renderBoolean, renderLink, TableColumnType } from "~/Component/Common/ResponsiveTable"

export const MasterPLCalculatorBudgetTableColumns: TableColumnType = [
  {
    title: "Section",
    dataIndex: "offeringBudget_SectionNumber",
    render: (text: any, record: any) => renderLink(`/section/${record.offeringBudget_SectionID}`, text)
  },
  // {
  //   title: "Type",
  //   dataIndex: "Type"
  // },
  {
    title: "Item",
    dataIndex: "offeringBudget_itemName"
  },
  {
    title: "Description",
    dataIndex: "offeringBudget_Description"
  },
  {
    title: "Basis",
    dataIndex: "offeringBudget_itemBasis"
  },
  {
    title: "Amount",
    dataIndex: "Amount"
  },
  {
    title: "Quantity",
    dataIndex: "offeringBudget_Quantity"
  },
  {
    title: "Income (Est)",
    dataIndex: "offeringBudget_Income"
  },
  {
    title: "Expense (Est)",
    dataIndex: "offeringBudget_Expense"
  }
]

export const MasterPLCalculatorSeatGroupsTableColumns: TableColumnType = [
  {
    title: "Section",
    dataIndex: "SectionNumber",
    render: (text: any, record: any) => renderLink(`/section/${record.SectionId}`, text)
  },
  {
    title: "Seat Group",
    dataIndex: "Name",
    render: (text: any, record: any) => renderLink(`/seat-group/${record.SeatGroupID}`, text)
  },
  {
    title: "Retail",
    dataIndex: "IsDefault",
    render: renderBoolean
  },
  {
    title: "Number of Seats",
    dataIndex: "NumberOfSeats"
  },
  {
    title: "Estimated Enrollment",
    dataIndex: "EstimatedEnrollment"
  },
  {
    title: "Actual Enrollment",
    dataIndex: "ActualEnrollment"
  }
]

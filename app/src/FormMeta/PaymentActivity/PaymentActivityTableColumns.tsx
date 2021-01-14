import { getPaymentActivity } from "~/ApiServices/Service/ActivityService"
import { renderDate, renderDecimal, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/FormMeta/ITableConfigProp"

export const getPaymentActivityTableColumns = (isModal = false, SectionID?: number): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "BankName", dataIndex: "BankName" },
    { title: "PaymentRelationshipTypeID", dataIndex: "PaymentRelationshipTypeID" },
    { title: "ActivityModifiedDate", dataIndex: "ActivityModifiedDate", render: renderDate },
    { title: "CreditCardRegion", dataIndex: "CreditCardRegion" },
    { title: "IntegrationDate", dataIndex: "IntegrationDate", render: renderDate },
    { title: "oca", dataIndex: "oca" },
    { title: "CreditCardHolderName", dataIndex: "CreditCardHolderName" },
    { title: "CreateDate", dataIndex: "CreateDate", render: renderDate },
    { title: "CreditCardAddress2", dataIndex: "CreditCardAddress2" },
    { title: "CreditCardCode", dataIndex: "CreditCardCode" },
    { title: "CreditCardAddress1", dataIndex: "CreditCardAddress1" },
    { title: "CreditCardCity", dataIndex: "CreditCardCity" },
    { title: "PersonID", dataIndex: "PersonID" },
    { title: "PaymentParentID", dataIndex: "PaymentParentID" },
    { title: "PersonAddress3", dataIndex: "PersonAddress3" },
    { title: "PersonAddress2", dataIndex: "PersonAddress2" },
    { title: "TotalPaymentAmount", dataIndex: "TotalPaymentAmount", render: renderDecimal },
    { title: "CreditCardAddress3", dataIndex: "CreditCardAddress3" },
    { title: "CreatedBy", dataIndex: "CreatedBy" },
    { title: "PersonAddress", dataIndex: "PersonAddress" },
    { title: "PersonRegion", dataIndex: "PersonRegion" },
    { title: "BusinessName", dataIndex: "BusinessName" },
    { title: "PaymentDate", dataIndex: "PaymentDate", render: renderDate },
    { title: "OPCStatusCodeID", dataIndex: "OPCStatusCodeID" },
    { title: "CompletedDate", dataIndex: "CompletedDate", render: renderDate },
    { title: "BankAccountType", dataIndex: "BankAccountType" },
    { title: "CreditCardPostalCode", dataIndex: "CreditCardPostalCode" },
    { title: "BankRoutingNumber", dataIndex: "BankRoutingNumber" },
    { title: "PaymentTypeID", dataIndex: "PaymentTypeID" },
    { title: "PersonCity", dataIndex: "PersonCity" },
    { title: "BusinessID", dataIndex: "BusinessID" },
    { title: "BankAccountNumber", dataIndex: "BankAccountNumber" },
    { title: "POAmount", dataIndex: "POAmount", render: renderDecimal },
    { title: "AccountName", dataIndex: "AccountName" },
    { title: "TransactionNumber", dataIndex: "TransactionNumber" },
    { title: "PaymentID", dataIndex: "PaymentID" },
    { title: "CreditCardCountry", dataIndex: "CreditCardCountry" },
    { title: "BusinessFEID", dataIndex: "BusinessFEID" },
    { title: "CreditCardNumber", dataIndex: "CreditCardNumber" },
    { title: "PersonName", dataIndex: "PersonName" },
    { title: "ExportID", dataIndex: "ExportID" },
    { title: "AccountID", dataIndex: "AccountID" },
    { title: "PurchaseOrderNumber", dataIndex: "PurchaseOrderNumber" },
    { title: "ActivityID", dataIndex: "ActivityID" },
    { title: "SourceID", dataIndex: "SourceID" },
    { title: "POExpirationDate", dataIndex: "POExpirationDate", render: renderDate },
    { title: "ActivityOperation", dataIndex: "ActivityOperation" },
    { title: "CheckNumber", dataIndex: "CheckNumber" },
    { title: "ActivityModifiedByUID", dataIndex: "ActivityModifiedByUID" },
    { title: "PersonPostalCode", dataIndex: "PersonPostalCode" },
    { title: "ActivityModifiedByName", dataIndex: "ActivityModifiedByName" },
    { title: "BankAccountName", dataIndex: "BankAccountName" },
    { title: "ExpirationDate", dataIndex: "ExpirationDate", render: renderDate },
    { title: "OPCStatusReleaseID", dataIndex: "OPCStatusReleaseID" },
    { title: "PersonCountry", dataIndex: "PersonCountry" }
  ]

  const responsiveColumnIndices: number[] = []
  const expandableColumnIndices: number[] = []
  return { columns, responsiveColumnIndices, expandableColumnIndices, searchFunc: getPaymentActivity }
}

import React from "react"
import { Button, message } from "antd"
import { getProductFinancials } from "~/ApiServices/Service/ProductService"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { removePackageFinancial } from "~/ApiServices/Service/PackageService"
import { eventBus, REFRESH_PACKAGE_FINANCIAL_PAGE } from "~/utils/EventBus"
import { DELETE_SUCCESSFULLY } from "~/utils/Constants"

export const getProductFinancialsTableColumns = (isModal = false): ITableConfigProp => {
  const removeFinancial = (ProductFinancialID: number) => {
    removePackageFinancial({ ProductFinancialID }).then((response) => {
      if (response && response.success) {
        message.success(DELETE_SUCCESSFULLY)
        eventBus.publish(REFRESH_PACKAGE_FINANCIAL_PAGE)
      }
    })
  }

  const columns: TableColumnType = [
    { title: "Description", dataIndex: "Description" },
    { title: "GL Acount", dataIndex: "GLAccountName" },
    { title: "Income", dataIndex: "ItemUnitAmount" },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Button danger type="primary" onClick={() => removeFinancial(record.ProductFinancialID)}>
          Remove
        </Button>
      )
    }
  ]
  return { columns, searchFunc: getProductFinancials, responsiveColumnIndices: [], expandableColumnIndices: [] }
}

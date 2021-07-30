import React from "react"
import { Button, Tooltip } from "antd"
import { getProductFinancials } from "~/ApiServices/Service/ProductService"
import { TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { removePackageFinancial } from "~/ApiServices/Service/PackageService"
import { eventBus, REFRESH_PACKAGE_FINANCIAL_PAGE } from "~/utils/EventBus"
import { DeleteOutlined } from "@ant-design/icons"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"

export const getProductFinancialsTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    { title: "Description", dataIndex: "Description" },
    { title: "GL Acount", dataIndex: "GLAccountName" },
    { title: "Income", dataIndex: "ItemUnitAmount" },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Tooltip title="Remove">
          <Button
            danger
            type="primary"
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={() =>
              showDeleteConfirm(() => {
                return removePackageFinancial({ ProductFinancialID: record.ProductFinancialID }).then((x) => {
                  if (x.success) {
                    eventBus.publish(REFRESH_PACKAGE_FINANCIAL_PAGE)
                  }
                  return x
                })
              })
            }
          />
        </Tooltip>
      )
    }
  ]
  return { columns, searchFunc: getProductFinancials, tableName: "ProductFinancialsTableColumns" }
}

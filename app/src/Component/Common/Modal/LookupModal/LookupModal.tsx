import React, { useState } from "react"
import { Card, Button } from "antd"
import Modal from "~/Component/Common/Modal/index2"
import { MetaDrivenForm } from "~/Component/Common/Form/MetaDrivenForm"
import { ResponsiveTable, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { IApiResponse } from "@packages/api/lib/utils/Interfaces"
import zIndex from "~/utils/zIndex"
import { IField } from "~/Component/Common/Form/common"

interface ILookupModal {
  title: string
  closeModal: (items?: any[]) => void
  searchFunc: (Params: { [key: string]: any }) => Promise<IApiResponse>
  responsiveColumnIndices?: number[]
  expandableColumnIndices?: number[]
  isArray?: boolean
  columns: TableColumnType
  meta: IField[]
  metaName: string
  defaultFormValue?: { [key: string]: any }
  initialFormValue?: { [key: string]: any }
  zIndex?: boolean
}

export function LookupModal(props: ILookupModal) {
  const [searchParams, setSearchParams] = useState<{ [key: string]: any } | undefined>(
    props.initialFormValue ? { ...props.initialFormValue, ...props.defaultFormValue } : undefined
  )
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const rowSelection: any = {
    type: props.isArray ? "checkbox" : "radio",
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setSelectedItems(selectedRows)
    }
  }
  return (
    <Modal width="1000px" zIndex={props.zIndex ? zIndex.defaultModal + 1 : undefined}>
      <Card
        title={props.title}
        actions={[
          <Button type="ghost" onClick={() => props.closeModal()}>
            Cancel
          </Button>,
          <Button type="primary" disabled={selectedItems.length === 0} onClick={() => props.closeModal(selectedItems)}>
            Select
          </Button>
        ]}
      >
        <div className="modal-card">
          <MetaDrivenForm
            meta={props.meta}
            metaName={props.metaName}
            initialFormValue={searchParams}
            onApplyChanges={(newSearchParams, newSearchParamsCount) => {
              console.log(props.defaultFormValue, newSearchParams)
              setSearchParams({ ...props.defaultFormValue, ...newSearchParams })
            }}
            stopProducingQueryParams={true}
          />
          <ResponsiveTable
            columns={props.columns}
            searchFunc={props.searchFunc}
            searchParams={searchParams}
            isModal={true}
            rowSelection={rowSelection}
            responsiveColumnIndices={props.responsiveColumnIndices}
            expandableColumnIndices={props.expandableColumnIndices}
          />
        </div>
      </Card>
    </Modal>
  )
}

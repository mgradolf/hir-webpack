import React from "react"
import { Button, Dropdown, Menu, Tooltip } from "antd"
import { DownOutlined } from "@ant-design/icons"
import { IApiResponse, RESPONSE_TYPE } from "@packages/api/lib/utils/Interfaces"

export const DownloadButton = (props: {
  searchFunc: (Params: any, Header: any) => Promise<IApiResponse>
  searchParams: { [key: string]: any }
  setDownloading: (flag: boolean) => void
  downloading: boolean
}) => {
  const downloadData = (fileType: string) => {
    let header = {}
    switch (fileType) {
      case RESPONSE_TYPE.EXCEL:
        header = { ResponseType: "application/vnd.ms-excel" }
        break
      case RESPONSE_TYPE.CSV:
        header = { ResponseType: "text/csv" }
        break
    }

    props.setDownloading(true)

    props.searchFunc(props.searchParams, header).then((x) => {
      props.setDownloading(false)
    })
  }
  return (
    <Tooltip title="Download Table Data">
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item>
              <Button type="link" onClick={() => downloadData(RESPONSE_TYPE.CSV)}>
                CSV
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button type="link" onClick={() => downloadData(RESPONSE_TYPE.EXCEL)}>
                Excel
              </Button>
            </Menu.Item>
          </Menu>
        }
        trigger={["click"]}
      >
        <Button
          type="primary"
          shape="circle"
          style={{ marginTop: "10px", marginRight: "10px", marginBottom: "10px" }}
          icon={<DownOutlined disabled={props.downloading} onClick={(e) => e.preventDefault()} />}
        />
      </Dropdown>
    </Tooltip>
  )
}

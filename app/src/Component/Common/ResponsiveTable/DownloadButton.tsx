import React from "react"
import { Button, Dropdown, Menu } from "antd"
import { DownCircleFilled } from "@ant-design/icons"
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
      <DownCircleFilled
        style={{
          color: "#1990ff",
          fontSize: "20px",
          paddingTop: "10px",
          paddingRight: "10px",
          paddingBottom: "10px"
        }}
        disabled={props.downloading}
        onClick={(e) => e.preventDefault()}
      />
    </Dropdown>
  )
}

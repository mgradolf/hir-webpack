import { renderLink, sortByString, TableColumnType } from "~/Component/Common/ResponsiveTable"
import { ITableConfigProp } from "~/TableSearchMeta/ITableConfigProp"
import { getReportList } from "~/ApiServices/Service/ReportService"

let ReportList: any[] = []
export const getReportListTableColumns = (isModal = false): ITableConfigProp => {
  const columns: TableColumnType = [
    {
      title: "Name",
      dataIndex: "ReportLabel",
      render: (text: any, record: any) => renderLink(`/report/${record.ReportName}`, text),
      sorter: (a, b) => sortByString(a?.ReportLabel, b?.ReportLabel)
    },
    {
      title: "Folder",
      dataIndex: "Folder",
      sorter: (a, b) => sortByString(a?.Folder, b?.Folder)
    },
    {
      title: "Description",
      dataIndex: "ReportDescription"
    }
  ]

  return {
    columns,
    searchFunc: (Params: { [key: string]: any }) => {
      if (ReportList.length > 0) {
        const result = ReportList.filter((x) => {
          let ReportMatched = false
          try {
            ReportMatched =
              Params.ReportLabel &&
              x.ReportLabel &&
              x.ReportLabel.toLowerCase().search(Params.ReportLabel.toLowerCase()) > -1
          } catch (error) {
            ReportMatched = true
          }
          let FolderMatched = false
          try {
            FolderMatched = Params.Folder && x.Folder && Params.Folder === x.Folder
          } catch (error) {
            FolderMatched = true
          }

          if (Object.keys(Params).length) return !!(FolderMatched || ReportMatched)
          else return true
        })
        return Promise.resolve({
          code: 200,
          success: true,
          error: false,
          data: result
        })
      }
      return getReportList({}).then((x: any) => {
        if (x.success) {
          x.data = x?.data?.Reports.map((x: any) => {
            if (x.ReportDescription) {
              x.ReportDescription = x.ReportDescription.replace(/(<([^>]+)>)/gi, "")
            }
            return x
          })
          ReportList = x.data
        }
        return x
      })
    }
  }
}

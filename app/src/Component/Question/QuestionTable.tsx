// import { Select } from "antd"
// import { ColumnsType } from "antd/lib/table/interface"
import React from "react"
// import { RouteComponentProps } from "react-router-dom"

interface QuestionTable {
  dataSource: Array<any>
  groups: Array<any>
  loading: boolean
  updateRow?: (params: { [key: string]: string }) => void
}

interface IQuestionTable {
  allQuestions: Array<{ [key: string]: any }>
}
export default function QuestionTable(props: IQuestionTable) {
  console.log("allQuestions ", props.allQuestions)
  // const columns: ColumnsType<{ [key: string]: string }> = [
  //   {
  //     title: "Group",
  //     dataIndex: "1"
  // render: (value: any, record: any) => {
  //   return (
  //     <Select
  //       aria-label={props.ariaLabel}
  //       style={{ width: 250 }}
  //       value={value}
  //       onChange={(value) => filterValueChanged(props.fieldName, value)}
  //     >
  //       {props.options &&
  //         props.options.map(({ label, value }, i) => (
  //           <Select.Option value={value} key={`${value}_${i}`}>
  //             {label}
  //           </Select.Option>
  //         ))}
  //     </Select>
  //   )
  // }
  //   }
  // ]
  return <div></div>
}

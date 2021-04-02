import React from "react"
import { renderBoolean } from "."

export const ExpandableRowRender = (props: {
  columns: any[]
  expandableColumnIndices?: number[]
  responsiveColumnIndices?: number[]
  record: { [key: string]: any }
  mobileView: boolean
}): JSX.Element => {
  const _columns: any = props.columns
  const expandableRowElements = props.expandableColumnIndices ? (
    <>
      {props.expandableColumnIndices
        .filter((index) => index <= _columns.length)
        .map((index, i) => {
          const _index = index - 1
          const title = _columns[_index].title
          const text = props.record[_columns[_index].dataIndex]
          return (
            <React.Fragment key={i}>
              {title && text && (
                <li>
                  <span>{title} : </span>
                  <span>
                    {" "}
                    {_columns[_index] && _columns[_index].render ? _columns[_index].render(text, props.record) : text}
                  </span>
                </li>
              )}
            </React.Fragment>
          )
        })}
    </>
  ) : null
  const responsiveExpandableRowElements =
    props.responsiveColumnIndices && props.responsiveColumnIndices.length > 0 && props.mobileView ? (
      <>
        {props.responsiveColumnIndices
          .filter((index) => {
            return !props.expandableColumnIndices?.includes(index) || index <= _columns.length
          })
          .map((index, i) => {
            const _index = index - 1
            const title = _columns[_index].title
            let text: any = props.record[_columns[_index].dataIndex]
            if (Array.isArray(text)) text = text.toString()
            else if (typeof text === "boolean") text = renderBoolean(text)
            return (
              <React.Fragment key={i}>
                {title && text && (
                  <li>
                    <span>{title} : </span>
                    <span>
                      {" "}
                      {_columns[_index] && _columns[_index].render ? _columns[_index].render(text, props.record) : text}
                    </span>
                  </li>
                )}
              </React.Fragment>
            )
          })}
      </>
    ) : null

  return (
    <ul>
      {expandableRowElements}
      {responsiveExpandableRowElements}
    </ul>
  )
}

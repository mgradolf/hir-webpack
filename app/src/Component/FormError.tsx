import React from "react"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { Typography } from "antd"
import { red } from "@ant-design/colors"

interface IFormError {
  errorMessages: Array<ISimplifiedApiErrorMessage>
}
export default function (props: IFormError) {
  return (
    <>
      {props.errorMessages.length > 0 && (
        <div
          role="alert"
          style={{ backgroundColor: "#ffecec", color: red.primary, padding: "10px 30px", width: "100%" }}
        >
          <h1>Error</h1>
          <ol>
            {props.errorMessages.map((error, index) => {
              return (
                <li key={index + 1000}>
                  <Typography.Text type="danger">{error.message}</Typography.Text>
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </>
  )
}

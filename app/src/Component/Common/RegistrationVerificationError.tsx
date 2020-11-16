import React, { useEffect } from "react"
import { Button, Typography } from "antd"
import { red } from "@ant-design/colors"
import { REGISTRATION_VERIFICATION_NAME } from "~/utils/Constants"

interface IFormError {
  errorMessages: Array<any>
  onWaive: (name: any, requestName: Array<any>) => void
  onAnswer: () => void
  onDetails: (name: any, requestName: Array<any>) => void
}

export default function (props: IFormError) {
  useEffect(() => {
    document.getElementById("errorMessages")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start"
    })
  }, [props.errorMessages])
  return (
    <>
      {Array.isArray(props.errorMessages) && props.errorMessages.length > 0 && (
        <div
          id="errorMessages"
          role="alert"
          style={{
            backgroundColor: "#ffecec",
            color: red.primary,
            padding: "10px 30px",
            width: "100%",
            marginBottom: "15px"
          }}
        >
          <h3>Registration Verification Error</h3>
          <ol>
            {props.errorMessages.map((error, index) => {
              return (
                <li style={{ marginBottom: "10px" }} key={index + 1000}>
                  <Typography.Text type="danger">{error.Name}</Typography.Text>
                  {error.IsWaive && (
                    <Button style={{ marginLeft: "20px" }} onClick={() => props.onWaive(error.Name, error.RequestName)}>
                      Waive
                    </Button>
                  )}
                  {error.Name === REGISTRATION_VERIFICATION_NAME.REGISTRATION_QUESTION_CHECK && (
                    <Button style={{ marginLeft: "20px" }} type="primary" onClick={props.onAnswer}>
                      Answer
                    </Button>
                  )}
                  {error.Details !== null && (
                    <Button
                      type="primary"
                      style={{ marginLeft: "20px" }}
                      onClick={() => props.onDetails(error.Name, error.RequestName)}
                    >
                      Details
                    </Button>
                  )}
                  {!error.IsWaive && error.Details === null && (
                    <Typography.Text style={{ marginLeft: "20px" }} type="danger">
                      Failed!
                    </Typography.Text>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </>
  )
}

import React, { useEffect, useState } from "react"
import { Form, Select, Row, Col, message, Card, Button, Spin } from "antd"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { createorUpdateMultipleAccountEmail, findAccountEmails } from "~/ApiServices/BizApi/account/accountIF"
import { getSystemEvent } from "~/ApiServices/Service/RefLookupService"
import { SAVE_SUCCESSFULLY } from "~/utils/Constants"
import { FormError } from "~/Component/Common/Form/FormError"
import { HelpButton } from "~/Component/Common/Form/Buttons/HelpButton"

interface IAccountEmailSetupFormProps {
  AccountID: number
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 }
}

const btnLayout = {
  wrapperCol: { span: 16 }
}

export function AccountEmailSetupForm(props: IAccountEmailSetupFormProps) {
  const [systemEvents, setSystemEvents] = useState<any[]>([])
  const [emailComponents] = useState(["", "Approved", "Denied", "Pending"])
  const [emailMap, setEmailMap] = useState<{ [key: string]: any }>({})
  const [apiCallInProgress, setApiCallInProgress] = useState(false)
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  useEffect(() => {
    if (props.AccountID) {
      setApiCallInProgress(true)
      findAccountEmails({ AccountID: props.AccountID }).then((x) => {
        setApiCallInProgress(false)
        if (x.success) {
          x.data.map((y: any) => {
            emailMap[y.SystemEventID] = y.EmailComponent
            return emailMap
          })
          setEmailMap(emailMap)
        }
      })
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    getSystemEvent().then((x) => {
      if (x.success) setSystemEvents(x.data.filter((item: any) => item.SystemEventSource === "account"))
    })
  }, [])

  const onFormSubmission = async () => {
    const params: any[] = []
    Object.keys(emailMap).map((x: any) => {
      const temp = {
        AccountID: props.AccountID,
        SystemEventID: parseInt(x),
        EmailComponent: emailMap[x]
      }
      params.push(temp)
      return params
    })
    setErrorMessages([])
    setApiCallInProgress(true)
    createorUpdateMultipleAccountEmail(params).then((x) => {
      setApiCallInProgress(false)
      if (x.success) {
        message.success(SAVE_SUCCESSFULLY)
      } else {
        setErrorMessages(x.error)
      }
    })
  }

  return (
    <>
      <Row justify="end">
        <HelpButton helpKey="accountQuestionSetup" />
      </Row>
      <Card title={"Account Email Setup"}>
        <Spin spinning={apiCallInProgress}>
          <Row>
            <Col key={1000} xs={24} sm={24} md={24}>
              <FormError errorMessages={errorMessages} />
              {systemEvents.map((x, index) => {
                return (
                  <Form.Item key={index + 1} label={x.Name} {...layout}>
                    <Select
                      defaultValue={emailMap[x.ID]}
                      onSelect={(selectedValue) => {
                        if (selectedValue !== "") {
                          emailMap[x.ID] = selectedValue
                        }
                      }}
                    >
                      {emailComponents.map((x, index) => (
                        <Select.Option key={index + 1} value={x}>
                          {x}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                )
              })}
              <Form.Item {...btnLayout} style={{ textAlign: "right" }}>
                <Button type="primary" onClick={onFormSubmission}>
                  Save
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Spin>
      </Card>
    </>
  )
}

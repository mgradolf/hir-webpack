import React, { useState } from "react"
import { Card, Button, Row, Col, Form, Input, Divider, Typography, Spin, message } from "antd"
import { analyzeAccount, mergeAccount } from "~/ApiServices/Service/MergeService"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { MERGE_SUCCESSFULLY } from "~/utils/Constants"
import { AccountLookup } from "~/Component/Common/Form/FormLookupFields/AccountLookup"
import "~/Sass/global/index.scss"

interface IAccountMergeFormProps {
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export default function AccountMergeForm(props: IAccountMergeFormProps) {
  const [primaryFormInstance] = Form.useForm()
  const [duplicateFormInstance] = Form.useForm()

  const [loading, setLoading] = useState<boolean>(false)
  const [isMergable, setIsMergable] = useState<boolean>(false)
  const [mAnalyze, setManalyze] = useState<{ [key: string]: any }>({})
  const [mergeAnalyze, setMergeAnalyze] = useState<{ [key: string]: any }>({})
  const [primaryAccount, setPrimaryAccount] = useState<{ [key: string]: any }>({})
  const [duplicateAccount, setDuplicateAccount] = useState<{ [key: string]: any }>({})
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  let index = 0

  const onAnalyze = () => {
    setLoading(true)
    analyzeAccount({ PrimaryAccountID: primaryAccount.AccountID, DuplicateAccountID: duplicateAccount.AccountID }).then(
      (response) => {
        if (response.success) {
          setManalyze(response.data)
          setIsMergable(true)

          const analysisMap: { [key: string]: any } = {
            MergeType: response.data.MergeType
          }
          const analyzeMap: { [key: string]: any } = {}
          const mergeAnalysis: { [key: string]: any } = response.data.MergeAnalysis
          if (mergeAnalysis !== null && mergeAnalysis !== undefined) {
            Object.keys(mergeAnalysis).map((analysis: any) => {
              if (Object.keys(mergeAnalysis[analysis]).length > 0) {
                Object.keys(mergeAnalysis[analysis]).map((details: any) => {
                  if (mergeAnalysis[analysis][details]["Move"] !== undefined) {
                    if (mergeAnalysis[analysis][details]["Move"].length > 0) {
                      let analysisMsg = ""
                      if (mergeAnalysis[analysis][details]["Move"].length > 1) {
                        analysisMsg =
                          mergeAnalysis[analysis][details]["Move"].length + " records are going to be moved."
                      } else {
                        analysisMsg = mergeAnalysis[analysis][details]["Move"].length + " record is going to be moved."
                      }
                      analyzeMap[analysis] = analysisMsg
                    }
                  } else if (mergeAnalysis[analysis][details]["Delete"] !== undefined) {
                    if (mergeAnalysis[analysis][details]["Delete"].length > 0) {
                      let analysisMsg = ""
                      if (mergeAnalysis[analysis][details]["Delete"].length > 1) {
                        analysisMsg =
                          mergeAnalysis[analysis][details]["Delete"].length + " records are going to be deleted."
                      } else {
                        analysisMsg =
                          mergeAnalysis[analysis][details]["Delete"].length + " record is going to be deleted."
                      }
                      analyzeMap[analysis] = analysisMsg
                    }
                  }
                  return analyzeMap
                })
              }
              return analysisMap
            })
          }
          analysisMap["MergeAnalysis"] = analyzeMap
          setMergeAnalyze(analysisMap)
        } else {
          console.log(response.error)
          setErrorMessages(response.error)
        }
        setLoading(false)
      }
    )
  }

  const onMerge = () => {
    mergeAccount({
      ...mAnalyze,
      PrimaryAccountID: primaryAccount.AccountID,
      DuplicateAccountID: duplicateAccount.AccountID
    }).then((response: any) => {
      if (response.success) {
        message.success(MERGE_SUCCESSFULLY)
      } else {
        console.log(response.error)
        setErrorMessages(response.error)
      }
    })
  }

  const onSelectedPrimaryAccount = (accounts: any) => {
    setErrorMessages([])
    setPrimaryAccount(accounts[0])
  }

  const onSelectedDuplicateAccount = (accounts: any) => {
    setErrorMessages([])
    setDuplicateAccount(accounts[0])
  }

  return (
    <Card
      title={`Account Merge`}
      actions={[
        <Row justify="end" gutter={[8, 8]} style={{ marginRight: "10px" }}>
          <Col>
            <Button type="primary" aria-label="Cancel" danger onClick={() => props.closeModal && props.closeModal()}>
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              aria-label="Submit"
              disabled={primaryAccount.AccountID === duplicateAccount.AccountID}
              onClick={onAnalyze}
            >
              Analyze
            </Button>
          </Col>
          <Col>
            <Button disabled={!isMergable} type="primary" aria-label="Submit" onClick={onMerge}>
              Merge
            </Button>
          </Col>
        </Row>
      ]}
      extra={[
        <Button
          disabled={!isMergable}
          type="primary"
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(mAnalyze))
            message.success("Copy to clipboard success!")
          }}
        >
          Copy To Clipboard
        </Button>
      ]}
    >
      <Row style={{ maxHeight: "80vh", overflowY: "scroll" }}>
        <Col xs={24} sm={24} md={24}>
          <Row>
            <OldFormError errorMessages={errorMessages} />
            <Col xs={24} sm={24} md={12}>
              <Form>
                <Form.Item>
                  <AccountLookup
                    onSelectedItems={onSelectedPrimaryAccount}
                    fieldName="AccountID"
                    label="Primary Account"
                    formInstance={primaryFormInstance}
                  />
                </Form.Item>
                <Divider orientation="left">Primary</Divider>
                <Form.Item label="Primary Contact" {...layout}>
                  <Input disabled aria-label="Primary Contact" value={primaryAccount.ContactName} />
                </Form.Item>
                <Form.Item label="Account Name" {...layout}>
                  <Input disabled aria-label="Account Name" value={primaryAccount.AccountName} />
                </Form.Item>
                <Form.Item label="Email Address" {...layout}>
                  <Input disabled aria-label="Email Address" value={primaryAccount.EmailAddress} />
                </Form.Item>
                <Form.Item label="Phone Number" {...layout}>
                  <Input disabled aria-label="Phone Number" value={primaryAccount.TelephoneNumber} />
                </Form.Item>
                <Form.Item label="Tax ID" {...layout}>
                  <Input disabled aria-label="Tax ID" value={primaryAccount.TaxID} />
                </Form.Item>
              </Form>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form>
                <Form.Item>
                  <AccountLookup
                    onSelectedItems={onSelectedDuplicateAccount}
                    fieldName="AccountID"
                    label="Duplicate Account"
                    formInstance={duplicateFormInstance}
                  />
                </Form.Item>
                <Divider orientation="left">Duplicate</Divider>
                <Form.Item label="Primary Contact" {...layout}>
                  <Input disabled aria-label="Primary Contact" value={duplicateAccount.ContactName} />
                </Form.Item>
                <Form.Item label="Account Name" {...layout}>
                  <Input disabled aria-label="Account Name" value={duplicateAccount.AccountName} />
                </Form.Item>
                <Form.Item label="Email Address" {...layout}>
                  <Input disabled aria-label="Email Address" value={duplicateAccount.EmailAddress} />
                </Form.Item>
                <Form.Item label="Phone Number" {...layout}>
                  <Input disabled aria-label="Phone Number" value={duplicateAccount.TelephoneNumber} />
                </Form.Item>
                <Form.Item label="Tax ID" {...layout}>
                  <Input disabled aria-label="Tax ID" value={duplicateAccount.TaxID} />
                </Form.Item>
              </Form>
            </Col>
          </Row>

          <Divider orientation="left">Analyze</Divider>

          <Spin size="large" spinning={loading}>
            <Row style={{ marginLeft: "20px" }}>
              {mergeAnalyze.MergeAnalysis !== undefined &&
                mergeAnalyze.MergeAnalysis !== null &&
                Object.keys(mergeAnalyze.MergeAnalysis).length > 0 &&
                Object.keys(mergeAnalyze.MergeAnalysis).map((analysis: any) => {
                  index++
                  return (
                    <Col key={1000 + index} style={{ marginTop: "10px", marginBottom: "10px" }} xs={24} sm={24} md={24}>
                      <Typography.Title level={4}>{analysis}</Typography.Title>
                      <Typography.Text>{mergeAnalyze.MergeAnalysis[analysis]}</Typography.Text>
                    </Col>
                  )
                })}
            </Row>
          </Spin>
        </Col>
      </Row>
    </Card>
  )
}

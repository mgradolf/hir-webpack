import React, { useState } from "react"
import { Card, Button, Row, Col, Form, Input, Divider, Typography, Spin } from "antd"
import { PersonLookup } from "~/Component/Common/Form/FormLookupFields/PersonLookup"

import { analyze, merge } from "~/ApiServices/Service/MergeService"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import { OldFormError } from "~/Component/Common/OldForm/OldFormError"
import { MERGE_SUCCESSFULLY } from "~/utils/Constants"
import Notification from "~/utils/notification"
import "~/Sass/global/index.scss"

interface IPersonMergeFormProps {
  initialFormValue: { [key: string]: any }
  closeModal?: () => void
  setApiCallInProgress: (flag: boolean) => void
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 14 }
}

export default function PersonMergeForm(props: IPersonMergeFormProps) {
  const [duplicateFormInstance] = Form.useForm()

  const [loading, setLoading] = useState<boolean>(false)
  const [isMergable, setIsMergable] = useState<boolean>(false)
  const [mAnalyze, setManalyze] = useState<{ [key: string]: any }>({})
  const [mergeAnalyze, setMergeAnalyze] = useState<{ [key: string]: any }>({})
  const [primaryPerson] = useState<{ [key: string]: any }>(props.initialFormValue || {})
  const [duplicatePerson, setDuplicatePerson] = useState<{ [key: string]: any }>({})
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  let index = 0

  const onAnalyze = () => {
    setLoading(true)
    analyze({ PrimaryPersonID: primaryPerson.PersonID, DuplicatePersonID: duplicatePerson.PersonID }).then(
      (response) => {
        if (response.success) {
          setManalyze(response.data)
          setIsMergable(response.data.IsPersonFullMerged)

          const analysisMap: { [key: string]: any } = {
            MergeType: response.data.MergeType,
            IsPersonFullMerged: response.data.IsPersonFullMerged
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
    merge({ ...mAnalyze, PrimaryPersonID: primaryPerson.PersonID, DuplicatePersonID: duplicatePerson.PersonID }).then(
      (response: any) => {
        if (response.success) {
          Notification(MERGE_SUCCESSFULLY)
        } else {
          console.log(response.error)
          setErrorMessages(response.error)
        }
      }
    )
  }

  const onSelectedDuplicatePerson = (persons: any) => {
    setErrorMessages([])
    setDuplicatePerson(persons[0])
  }

  return (
    <Card
      title={`Person Merge`}
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
              disabled={
                Object.keys(duplicatePerson).length === 0 || primaryPerson.PersonID === duplicatePerson.PersonID
              }
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
            Notification("Copy to clipboard success!")
          }}
        >
          Copy To Clipboard
        </Button>
      ]}
    >
      <Row style={{ maxHeight: "66vh", overflowY: "scroll" }}>
        <Col xs={24} sm={24} md={24}>
          <Row>
            <OldFormError errorMessages={errorMessages} />
            <Col xs={24} sm={24} md={12}>
              <Form>
                <Form.Item
                  label="Primary Person"
                  style={{ paddingBottom: "24px" }}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Input disabled aria-label="Primary Person" value={primaryPerson.SortName} />
                </Form.Item>
                <Divider orientation="left">Primary</Divider>
                <Form.Item label="Name" {...layout}>
                  <Input disabled aria-label="Name" value={primaryPerson.SortName} />
                </Form.Item>
                <Form.Item label="Birthday" {...layout}>
                  <Input disabled aria-label="Birthday" value={primaryPerson.Birthday} />
                </Form.Item>
                <Form.Item label="Email" {...layout}>
                  <Input disabled aria-label="Email" value={primaryPerson.EmailAddress} />
                </Form.Item>
                <Form.Item label="Phone" {...layout}>
                  <Input disabled aria-label="Phone" value={primaryPerson.TelephoneNumber} />
                </Form.Item>
                <Form.Item label="Address" {...layout}>
                  <Input disabled aria-label="Address" value={primaryPerson.Address} />
                </Form.Item>
                <Form.Item label="ERP ID" {...layout}>
                  <Input disabled aria-label="ERP ID" value={primaryPerson.ERPID} />
                </Form.Item>
                <Form.Item label="SSN" {...layout}>
                  <Input disabled aria-label="SSN" value={primaryPerson.GovID} />
                </Form.Item>
              </Form>
            </Col>

            <Col xs={24} sm={24} md={12}>
              <Form>
                <Form.Item>
                  <PersonLookup
                    onSelectedItems={onSelectedDuplicatePerson}
                    fieldName="PersonID"
                    label="Duplicate Person"
                    formInstance={duplicateFormInstance}
                  />
                </Form.Item>
                <Divider orientation="left">Duplicate</Divider>
                <Form.Item label="Name" {...layout}>
                  <Input disabled aria-label="Name" value={duplicatePerson.SortName} />
                </Form.Item>
                <Form.Item label="Birthday" {...layout}>
                  <Input disabled aria-label="Birthday" value={duplicatePerson.Birthday} />
                </Form.Item>
                <Form.Item label="Email" {...layout}>
                  <Input disabled aria-label="Email" value={duplicatePerson.EmailAddress} />
                </Form.Item>
                <Form.Item label="Phone" {...layout}>
                  <Input disabled aria-label="Phone" value={duplicatePerson.TelephoneNumber} />
                </Form.Item>
                <Form.Item label="Address" {...layout}>
                  <Input disabled aria-label="Address" value={duplicatePerson.Address} />
                </Form.Item>
                <Form.Item label="ERP ID" {...layout}>
                  <Input disabled aria-label="ERP ID" value={duplicatePerson.ERPID} />
                </Form.Item>
                <Form.Item label="SSN" {...layout}>
                  <Input disabled aria-label="SSN" value={duplicatePerson.GovID} />
                </Form.Item>
              </Form>
            </Col>
          </Row>

          <Divider orientation="left">Analyze</Divider>

          <Spin size="large" spinning={loading}>
            <Row style={{ marginLeft: "20px" }}>
              <Col style={{ marginTop: "12px", marginBottom: "12px" }} xs={24} sm={24} md={24}>
                <Typography.Title level={4} type={mergeAnalyze.IsPersonFullMerged ? "secondary" : "danger"}>
                  {mergeAnalyze.MergeType}
                </Typography.Title>
              </Col>
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

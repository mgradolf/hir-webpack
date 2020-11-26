import "~/Sass/utils.scss"
import React, { useState, useEffect } from "react"
import { Button, Form, Spin, Table } from "antd"
import { ISSUE_CERTIFICATE_SAVE_SUCCESS } from "~/utils/Constants"
import { issueCertificate, previewCertificate, searchCertificate } from "~/ApiServices/Service/RegistrationService"
import Notification from "~/utils/notification"
import { ICertificateFieldNames } from "~/Component/Registration/Interfaces"
import { ISimplifiedApiErrorMessage } from "@packages/api/lib/utils/HandleResponse/ProcessedApiError"
import CertificateForm from "../Certificate/CertificateForm"
import { RESPONSE_TYPE } from "@packages/api/lib/utils/Interfaces"
import { renderDate } from "~/Component/Common/ResponsiveTable"

interface ICertificateFormProps {
  initialFormValue: { [key: string]: any }
  fieldNames: ICertificateFieldNames
}

export default function IssueCertificateForm(props: ICertificateFormProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [certificateItems, setCertificateItems] = useState<Array<any>>([])
  const [errorMessages, setErrorMessages] = useState<Array<ISimplifiedApiErrorMessage>>([])

  props.initialFormValue["IsProgram"] = false

  useEffect(() => {
    ; (async function () {
      setLoading(true)
      const result = await searchCertificate({
        SectionID: props.initialFormValue.SectionID,
        StudentID: props.initialFormValue.StudentID
      })
      if (result.success && result.data) {
        setCertificateItems(result.data)
      }
      setLoading(false)
    })()
  }, [props.initialFormValue])

  const viewCertificate = async () => {
    await form.validateFields()
    const params = form.getFieldsValue()
    params[RESPONSE_TYPE.PDF] = true

    console.log("Params: ", params)
    setLoading(true)
    const response = await previewCertificate(params)
    if (response.data) {
      const file = new Blob(
        [response.data],
        { type: 'application/pdf' }
      );
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL)
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
    setLoading(false)
  }

  const onFormSubmission = async () => {
    await form.validateFields()
    const params = form.getFieldsValue()

    setLoading(true)
    setErrorMessages([])
    const response = await issueCertificate(params)
    if (response && response.success) {
      Notification(ISSUE_CERTIFICATE_SAVE_SUCCESS)
    } else {
      setErrorMessages(response.error)
      console.log(response.error)
      console.log(errorMessages)
    }
    setLoading(false)
  }

  const columns = [
    {
      title: "Certificat Number",
      dataIndex: "CertificateNumber"
    },
    {
      title: "Certificat Name",
      dataIndex: "CertificateName"
    },
    {
      title: "Valid",
      dataIndex: "PublishOnWeb",
      render: (text: any) => (text ? "Yes" : "No")
    },
    {
      title: "Issue Date",
      dataIndex: "IssueDate",
      render: renderDate
    },
    {
      title: "Expiration Date",
      dataIndex: "ExpirationDate",
      render: renderDate
    }
  ]

  return (
    <Spin size="large" spinning={loading}>
      <CertificateForm
        fieldNames={props.fieldNames}
        formInstance={form}
        initialFormValue={props.initialFormValue}
        setApiCallInProgress={setLoading}
        errorMessages={errorMessages}
      />

      {Object.keys(certificateItems).length > 0 && (
        <Table
          className="issue-certificate-data-table"
          rowKey="StudentCertificateID"
          bordered
          dataSource={certificateItems}
          pagination={false}
          columns={columns}
        />
      )}

      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Button type="primary" onClick={onFormSubmission}>Save Certificate</Button>
        <Button type="primary" onClick={viewCertificate} style={{ marginLeft: "16px" }}>Preview Certificate</Button>
      </div>
    </Spin>
  )
}

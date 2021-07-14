import React from "react"
import { Button } from "antd"
import { FilePdfOutlined } from "@ant-design/icons"
import { RESPONSE_TYPE } from "@packages/api/lib/utils/Interfaces"
import { previewCertificate } from "~/ApiServices/Service/CertificateService"

interface ICertificateDefPreviewProp {
  CertificateID: number
}

export function CertificateDefPreview(props: ICertificateDefPreviewProp) {
  const preview = () => {
    const params: { [key: string]: any } = {
      CertificateID: props.CertificateID
    }
    params[RESPONSE_TYPE.PDF] = true

    previewCertificate(params).then((response) => {
      if (response.success && response.data) {
        const file = new Blob([response.data], { type: "application/pdf" })
        const fileURL = URL.createObjectURL(file)
        window.open(fileURL)
      } else {
        console.log(response.error)
      }
    })
  }

  return <Button type="primary" shape="circle" icon={<FilePdfOutlined />} onClick={preview} />
}

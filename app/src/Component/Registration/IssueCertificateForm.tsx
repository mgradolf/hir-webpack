import "~/Sass/utils.scss"
import React, { useState, useEffect } from "react"
import { Button, Row, Col } from "antd"
import { searchCertificate } from "~/ApiServices/Service/RegistrationService"
import { ResponsiveTable } from "~/Component/Common/ResponsiveTable"
import { ICertificateFieldNames } from "~/Component/Registration/Interfaces"
import CertificateFormModal from "~/Component/Certificate/CertificateFormModal"
import { getCertificateTableColumns } from "~/FormMeta/Certificate/CertificateTableColumns"

interface ICertificateFormProps {
  initialFormValue: { [key: string]: any }
  fieldNames: ICertificateFieldNames
}

export default function IssueCertificateForm(props: ICertificateFormProps) {
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [certificateItems, setCertificateItems] = useState<Array<any>>([])

  props.initialFormValue["IsProgram"] = false

  useEffect(() => {
    ;(async function () {
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

  return (
    <div className="site-layout-content">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col style={{ textAlign: "right" }} xs={24} sm={24} md={24}>
          <Button type="primary" style={{ float: "right" }} onClick={() => setShowModal(true)}>
            + Issue Certificate
          </Button>
          {showModal && (
            <CertificateFormModal
              isProgram={false}
              closeModal={() => setShowModal(false)}
              initialFormValue={props.initialFormValue}
            />
          )}
        </Col>
      </Row>

      <ResponsiveTable {...getCertificateTableColumns()} loading={loading} dataSource={certificateItems} />
    </div>
  )
}

import React, { useEffect, useState } from "react"
import { Button } from "antd"
import { showDeleteConfirm } from "~/Component/Common/Modal/Confirmation"
import { Redirect } from "react-router"
import { DeleteOutlined } from "@ant-design/icons"
import { canDeleteCertificate, deleteCertificate } from "~/ApiServices/BizApi/certificate/certificateIF"

interface ICertificateDefRemoveLinkProp {
  CertificateID: number
}

export function CertificateDefRemoveLink(props: ICertificateDefRemoveLinkProp) {
  const [redirectAfterRemove, setRedirectAfterRemove] = useState<string>()
  const [canDelete, setCanDelete] = useState(false)

  useEffect(() => {
    ;(async () => {
      const response = await canDeleteCertificate({ CertificateID: props.CertificateID })
      if (response && response.success) {
        if (!response.data) {
          setCanDelete(true)
        }
      }
    })()
  }, [props.CertificateID])

  return (
    <>
      {redirectAfterRemove && <Redirect to={redirectAfterRemove} />}
      <Button
        danger
        disabled={!canDelete}
        type="primary"
        shape="circle"
        icon={<DeleteOutlined />}
        style={{ marginLeft: "5px" }}
        onClick={() =>
          showDeleteConfirm(() => {
            return deleteCertificate({ CertificateID: props.CertificateID }).then((x) => {
              if (x.success) {
                setRedirectAfterRemove(`/data/certificate`)
              }
              return x
            })
          })
        }
      />
    </>
  )
}

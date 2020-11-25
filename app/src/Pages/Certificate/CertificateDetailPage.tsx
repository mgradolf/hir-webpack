import { RESPONSE_TYPE } from "@packages/api/lib/utils/Interfaces"
import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchCertificate, previewCertificate } from "~/ApiServices/Service/RegistrationService"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { getCertificateDetailsMeta } from "~/FormMeta/Certificate/CertificateDetailsMeta"

export default function CertificateDetailsPage(
  props: RouteComponentProps<{ certificateID?: string; }>
) {
  const [certificateDetails, setCertificateDetails] = useState<{ [key: string]: any }>({})
  const [downloadUrl, setdownloadUrl] = useState<string>()
  const CertificateID = Number(props?.match?.params?.certificateID)

  let Param: { [key: string]: any }
  if (CertificateID) Param = { CertificateID: CertificateID }

  useEffect(() => {
    ; (async function () {
      const result = await searchCertificate({ CertificateID: CertificateID })
      if (result.success && result.data) {
        setCertificateDetails(result.data[0])
      }
    })()
  }, [CertificateID])

  useEffect(() => {
    ; (async function () {
      if (Object.keys(certificateDetails).length > 0) {
        const params = {
          CertificateID: certificateDetails.CertificateID,
          StudentID: certificateDetails.StudentID,
          IssueDate: certificateDetails.IssueDate,
          [RESPONSE_TYPE.PDF]: true
        }
        const result = await previewCertificate(params)
        const file = new Blob(
          [result.data],
          { type: 'application/pdf' }
        );
        const fileURL = URL.createObjectURL(file);
        setdownloadUrl(fileURL)
      }
    })()
  }, [certificateDetails])

  return (
    <>
      <StandardDetailsPage
        getDetailsMeta={getCertificateDetailsMeta}
        getDetailsFunc={() => {
          return searchCertificate(Param).then((x) => {
            if (x.success) {
              x.data = {
                ...x.data[0]
              }
            }
            return x
          })
        }}
      />
      {downloadUrl && (
        <iframe title={"Certificate"} style={{ marginTop: "20px", width: "100%", height: "100vh" }} src={downloadUrl} />
      )}
    </>
  )
}

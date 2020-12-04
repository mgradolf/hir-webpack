import React, { useEffect, useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { searchCertificate } from "~/ApiServices/Service/RegistrationService"
import { StandardDetailsPage } from "~/Component/Common/Page/DetailsPage/StandardDetailsPage"
import { getCertificateDetailsMeta } from "~/FormMeta/Certificate/CertificateDetailsMeta"
import { getToken } from "@packages/api/lib/utils/TokenStore"

export default function CertificateDetailsPage(props: RouteComponentProps<{ studentCertificateID?: string }>) {
  const [certificateDetails, setCertificateDetails] = useState<{ [key: string]: any }>({})
  const [downloadUrl, setDownloadUrl] = useState<string>()
  const studentCertificateID = Number(props?.match?.params?.studentCertificateID)

  let Param: { [key: string]: any }
  if (studentCertificateID) Param = { StudentCertificateID: studentCertificateID }

  useEffect(() => {
    ;(async function () {
      const result = await searchCertificate({ StudentCertificateID: studentCertificateID })
      if (result.success && result.data) {
        setCertificateDetails(result.data[0])
      }
    })()
  }, [studentCertificateID])

  useEffect(() => {
    ;(async function () {
      if (certificateDetails && Object.keys(certificateDetails).length > 0) {
        let urlParams = `/api/document?DocumentID=${certificateDetails.DocumentID}&`
        urlParams += "token=" + getToken()
        setDownloadUrl(urlParams)
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

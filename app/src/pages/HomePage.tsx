import React, { useState } from "react"
import { Link } from "react-router-dom"
// import { createOfferingWrap } from "~/ApiServices/Service/OfferingServiceWrap"
import { findCatalogWrap } from "~/ApiServices/BizApi/catalog/catalogIf"
import style2 from "~/sass/nested/div.module.scss"
import sum from "~/utils/sum"
import { logout } from "~/ApiServices/Login"

enum LoadingState {
  PENDING,
  INPROGRESS,
  SUCCESS,
  ERROR
}

export default function Home() {
  const [data, setdata] = useState({ name: null, country: null, ip: null })
  const [loading, setLoading] = useState(LoadingState.PENDING)

  const navigateToProfile = async function () {
    setLoading(LoadingState.INPROGRESS)
    const [response, error] = await findCatalogWrap({
      OfferingID: 6848
    })
    // const [response, error] = await createOfferingWrap({
    //   OfferingCode: true,
    //   Name: null,
    //   Description: null,
    //   OrganizationID: null,
    //   IsQuickAdmit: false,
    //   OfferingStatusCodeID: 0,
    //   OfferingStatusReleaseID: 1,
    //   OfferingTypeID: 1000,
    //   DefaultSectionTypeID: null,
    //   RecurrenceRule: null,
    //   StartTermID: null,
    //   EndTermID: null,
    //   CreationDate: "Wed Jun 17 00:00:00 BDT 2020",
    //   TerminationDate: "Wed Jun 17 00:00:00 BDT 2022",
    //   URL: null,
    //   HasApprovalProcess: true,
    //   CourseID: null,
    //   EffectiveCreationDate: null,
    //   EffectiveTerminationDate: null,
    //   SubmitInquiryToUserID: null,
    //   OfferingUsageType: 1,
    //   PaymentGatewayAccountID: null
    // })

    if (response) {
      setLoading(LoadingState.SUCCESS)
      setdata(response)
    } else if (error) {
      setLoading(LoadingState.ERROR)
      setTimeout(() => {
        setLoading(LoadingState.PENDING)
      }, 3 * 1000)
    } else {
      setLoading(LoadingState.PENDING)
    }
  }

  let content
  switch (loading) {
    case LoadingState.INPROGRESS:
      content = <p>checking authorization to profile page ....</p>
      break
    case LoadingState.SUCCESS:
      content = (
        <div>
          <div className={style2.Name}>You are from {data.name}</div>
          <div>Country code {data.country}</div>
          <div>ip {data.ip}</div>
          <div>
            {" this is some "}1 + 2 ={">"} {sum(1, 2)}
          </div>
          <Link to="/offering"></Link>
          <button onClick={navigateToProfile}>Call api</button>
        </div>
      )
      break
    case LoadingState.ERROR:
      content = <p>Something went wrong</p>
      break
    default:
      content = null
      break
  }

  return (
    <div>
      <h1>Home</h1>
      {/* <Link to="/profile">Profile</Link> */}
      {!(loading === LoadingState.INPROGRESS) && <button onClick={navigateToProfile}>Go to profile page</button>}
      {content}
      <br />
      <button onClick={logout}>Log out</button>
      <br />
      <Link to="/about">About</Link>
      <br />
      <Link to="/offering">Offering</Link>
      <br />
      <Link to="/sd32r24frfrgdfgf">Not found</Link>
    </div>
  )
}

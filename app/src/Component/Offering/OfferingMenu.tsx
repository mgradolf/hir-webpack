import React, { useEffect } from "react"
import GoToMenu from "~/Component/Common/GoToMenu"
interface IOfferingMenu {
  offering: { [key: string]: any }
}
export default function OfferingMenu(props: IOfferingMenu) {
  useEffect(() => {
    console.log(props)
  }, [props])
  const menus = [
    { title: "Offering Financial", url: `/offering/${props.offering.OfferingID}/financial` },
    { title: "Requisite Management", url: `/offering/${props.offering.OfferingID}/requisite` },
    { title: "Catalogs", url: `/offering/${props.offering.OfferingID}/catalog` },
    { title: "Offering Tag", url: `/offering/${props.offering.OfferingID}/tag` },
    { title: "Qualified Instructors", url: `/offering/${props.offering.OfferingID}/instructor` },
    { title: "Sections", url: `/offering/${props.offering.OfferingID}/section` }
  ]
  if (props.offering.HasApprovalProcess) {
    menus.push({
      title: "Offering Approval",
      url: `/offering/${props.offering.OfferingID}/approval`
    })
  }
  return <GoToMenu menuList={menus} />
}

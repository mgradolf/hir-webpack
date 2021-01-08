import React from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderEmail } from "~/Component/Common/ResponsiveTable"
export const getUserDetailsMeta = (user: { [key: string]: any }): IDetailsMeta => {
  const tabMeta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    contents: [
      { label: "Login Name", value: user.UserID },
      { label: "First Name", value: user.FirstName },
      { label: "Middle Name", value: user.MiddleName },
      { label: "Last Name", value: user.LastName },
      { label: "Email", value: user.Email, render: renderEmail },
      {
        label: "Roles",
        value: user.Roles,
        render: (roles) => (
          <ul>
            {roles.map((x: any, i: number) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        )
      }
    ]
  }

  tabMeta.push({
    tabTitle: "Summary",
    tabType: "summary",
    tabMeta: {
      summary: [summary]
    }
  })

  return {
    // pageTitle: `${user.Name}`,
    tabs: tabMeta
  }
}

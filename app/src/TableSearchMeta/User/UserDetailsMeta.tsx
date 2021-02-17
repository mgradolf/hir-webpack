import React from "react"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { renderEmail } from "~/Component/Common/ResponsiveTable"
import { getAcademicActivityLogTableColumns } from "~/TableSearchMeta/Academic/AcademicActivityTableColumns"
import { getActivityOrderSearchTableColumns } from "~/TableSearchMeta/ActivityOrder/ActivityOrderSearchTableColumns"
import { getEnrollmentActivityLogTableColumns } from "~/TableSearchMeta/EnrollmentActivity/EnrollmentActivityTableColumns"
import { getActivityOrderCreditSearchTableColumns } from "~/TableSearchMeta/ActivityOrderCredit/ActivityOrderCreditSearchTableColumns"
import { getPaymentActivityTableColumns } from "~/TableSearchMeta/PaymentActivity/PaymentActivityTableColumns"
import { UserSearchMeta } from "~/TableSearchMeta/User/UserFormMeta"
import { FormModalOpenButton } from "~/Component/Common/Modal/MetaDrivenFormModal/MetaDrivenFormModalOpenButton"
import { saveUser } from "~/ApiServices/Service/UserService"

export const getUserDetailsMeta = (user: { [key: string]: any }): IDetailsMeta => {
  const tabMeta: IDetailsTabMeta[] = []
  const summary: CardContainer = {
    cardActions: [
      <FormModalOpenButton
        buttonLabel={user ? "Edit User" : "+ Create User"}
        formTitle={user ? "Edit User" : "Create User"}
        initialFormValue={user}
        formMeta={UserSearchMeta}
        formSubmitApi={saveUser}
      />
    ],
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

  tabMeta.push({
    tabTitle: "Logs",
    tabType: "summary",
    tabMeta: [],
    multipleTabMetas: [
      {
        tabTitle: "Academic",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getAcademicActivityLogTableColumns(),
            searchParams: { UserID: user.UserID },
            refreshEventName: "REFRESH_REGISTRATION_ACADEMIC_ACTIVITY_PAGE"
          }
        }
      },
      {
        tabTitle: "Enrollment",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getEnrollmentActivityLogTableColumns(),
            searchParams: { UserID: user.UserID },
            refreshEventName: "REFRESH_REGISTRATION_ENROLLMENT_ACTIVITY_PAGE"
          }
        }
      },
      {
        tabTitle: "Orders",
        tabType: "table",
        tabMeta: {
          tableProps: {
            pagination: false,
            ...getActivityOrderSearchTableColumns(),
            searchParams: { UserID: user.UserID },
            refreshEventName: "REFRESH_ORDER_ACTIVITY_PAGE"
          }
        }
      },
      {
        tabTitle: "Credits",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getActivityOrderCreditSearchTableColumns(),
            searchParams: { UserID: user.UserID },
            refreshEventName: "REFRESH_REGISTRATION_ENROLLMENT_HISTORY_PAGE"
          }
        }
      },
      {
        tabTitle: "Payments",
        tabType: "table",
        tabMeta: {
          tableProps: {
            ...getPaymentActivityTableColumns(),
            searchParams: { UserID: user.UserID },
            refreshEventName: "REFRESH_PAYMENT_LOG"
          }
        }
      }
    ]
  })

  return {
    tabs: tabMeta
  }
}

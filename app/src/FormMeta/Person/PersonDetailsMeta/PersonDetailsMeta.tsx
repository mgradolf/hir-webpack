import React from "react"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { getProfileMeta } from "~/FormMeta/Person/PersonDetailsMeta/Profile"
import { getStudentMeta } from "~/FormMeta/Person/PersonDetailsMeta/Student"
import { getInstructorMeta } from "~/FormMeta/Person/PersonDetailsMeta/Instructor"
import { Button, Dropdown, Menu } from "antd"
import { pushStudent } from "~/ApiServices/Service/StudentService"
import {
  CURRENT_ORG_ID,
  PT_PARTTIME_STATUS,
  SAVE_SUCCESSFULLY,
  DELETE_SUCCESSFULLY,
  REQUEST_SUCCESSFULLY
} from "~/utils/Constants"
import Notification from "~/utils/notification"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { pushInstructor } from "~/ApiServices/Service/InstructorService"
import { removePerson } from "~/ApiServices/Service/PersonService"
import { createAnonymizationRequest } from "~/ApiServices/Service/AnonymizationRequestService"

const getMenu = (personInfos: { [key: string]: any }) => {
  const isStudent = personInfos[1].Student
  const isFaculty = personInfos[1].Faculty

  const createStudent = async () => {
    if (personInfos) {
      const response = await pushStudent({
        PersonID: personInfos[0].PersonID,
        OrganizationID: CURRENT_ORG_ID,
        PartTimeFullTimeStatusID: PT_PARTTIME_STATUS
      })
      if (response.success) {
        Notification(SAVE_SUCCESSFULLY)
        eventBus.publish(REFRESH_PAGE)
      }
    }
  }

  const createInstructor = async () => {
    if (personInfos) {
      const response = await pushInstructor({
        PersonID: personInfos[0].PersonID,
        OrganizationID: CURRENT_ORG_ID
      })
      if (response.success) {
        Notification(SAVE_SUCCESSFULLY)
        eventBus.publish(REFRESH_PAGE)
      }
    }
  }

  const forgetMeRequest = async () => {
    if (personInfos) {
      const response = await createAnonymizationRequest({
        PersonID: personInfos[0].PersonID
      })
      if (response.success) {
        Notification(REQUEST_SUCCESSFULLY)
        eventBus.publish(REFRESH_PAGE)
      }
    }
  }

  const deletePerson = async () => {
    if (personInfos) {
      const response = await removePerson({
        PersonID: personInfos[0].PersonID
      })
      if (response.success) {
        Notification(DELETE_SUCCESSFULLY)
        eventBus.publish(REFRESH_PAGE)
      }
    }
  }

  return (
    <Menu>
      <Menu.Item>
        <Button disabled={isStudent != null} type="link" onClick={createStudent}>
          Create a student
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button disabled={isFaculty != null} type="link" onClick={createInstructor}>
          Create an instructor
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link" onClick={forgetMeRequest}>
          Forget me request
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link" danger onClick={deletePerson}>
          Delete this person
        </Button>
      </Menu.Item>
    </Menu>
  )
}

export const getPersonDetailsMeta = (personInfos: { [key: string]: any }[]): IDetailsMeta => {
  const tabMetas: IDetailsTabMeta[] = []
  const person: { [key: string]: any } = personInfos[0]
  const account: { [key: string]: any } = personInfos[1].Account
  const instructor: { [key: string]: any } | undefined = personInfos[1].Faculty
  const student: { [key: string]: any } | undefined = personInfos[1].Student
  const disabilities: { [key: string]: any } | undefined = personInfos[1].PersonDisabilites

  const Person: IDetailsTabMeta = {
    tabTitle: "Profile",
    tabType: "table",
    tabMeta: [],
    multipleTabMetas: getProfileMeta(person, disabilities, account),
    actions: [
      <Dropdown.Button key="Person_Actions" overlay={getMenu(personInfos)} type="primary">
        ...Actions
      </Dropdown.Button>
    ]
  }
  tabMetas.push(Person)

  student &&
    tabMetas.push({
      tabTitle: "Student",
      tabType: "table",
      tabMeta: [],
      multipleTabMetas: getStudentMeta(person, student)
    })

  instructor &&
    tabMetas.push({
      tabTitle: "Instructor",
      tabType: "table",
      tabMeta: [],
      multipleTabMetas: getInstructorMeta(person, instructor)
    })

  console.log(tabMetas)
  return {
    pageTitle: person.FormattedName,
    tabs: tabMetas
  }
}

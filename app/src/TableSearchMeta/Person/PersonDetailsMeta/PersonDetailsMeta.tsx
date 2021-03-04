import React, { useState } from "react"
import { Button, Dropdown, Menu } from "antd"
import { Redirect } from "react-router-dom"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { getProfileMeta } from "~/TableSearchMeta/Person/PersonDetailsMeta/Profile"
import { getStudentMeta } from "~/TableSearchMeta/Person/PersonDetailsMeta/Student"
import { getInstructorMeta } from "~/TableSearchMeta/Person/PersonDetailsMeta/Instructor"
import { pushStudent } from "~/ApiServices/Service/StudentService"
import {
  CURRENT_ORG_ID,
  PT_PARTTIME_STATUS,
  DELETE_SUCCESSFULLY,
  FORGET_ME_REQUEST_SUCCESSFULLY,
  CANCEL_FORGET_ME_REQUEST_SUCCESSFULLY,
  CREATE_SUCCESSFULLY
} from "~/utils/Constants"
import Notification from "~/utils/notification"
import { eventBus, REFRESH_PAGE } from "~/utils/EventBus"
import { pushInstructor } from "~/ApiServices/Service/InstructorService"
import { removePerson } from "~/ApiServices/Service/PersonService"
import { cancelAnonymizeRequest, createAnonymizationRequest } from "~/ApiServices/Service/AnonymizationRequestService"
import { PersonMergeFormModalOpenButton } from "~/Component/Person/Forms/PersonMergeFormModal"

export const GetMenu = (props: { personInfos: { [key: string]: any } }) => {
  const canForgetMeRequest: boolean = props.personInfos[0]["CanForgetMeRequest"]
  const isStudent = props.personInfos[1].Student
  const isFaculty = props.personInfos[1].Faculty
  const [redirectAfterRemove, setRedirectAfterRemove] = useState<string>()

  const createStudent = async () => {
    if (props.personInfos) {
      const response = await pushStudent({
        PersonID: props.personInfos[0].PersonID,
        OrganizationID: CURRENT_ORG_ID,
        PartTimeFullTimeStatusID: PT_PARTTIME_STATUS
      })
      if (response.success) {
        Notification(CREATE_SUCCESSFULLY)
        eventBus.publish(REFRESH_PAGE)
      }
    }
  }

  const createInstructor = async () => {
    if (props.personInfos) {
      const response = await pushInstructor({
        PersonID: props.personInfos[0].PersonID,
        OrganizationID: CURRENT_ORG_ID
      })
      if (response.success) {
        Notification(CREATE_SUCCESSFULLY)
        eventBus.publish(REFRESH_PAGE)
      }
    }
  }

  const forgetMeRequest = async () => {
    if (props.personInfos) {
      if (canForgetMeRequest) {
        const response = await createAnonymizationRequest({
          PersonID: props.personInfos[0].PersonID
        })
        if (response.success) {
          Notification(FORGET_ME_REQUEST_SUCCESSFULLY)
          eventBus.publish(REFRESH_PAGE)
        }
      } else {
        const response = await cancelAnonymizeRequest({
          PersonID: props.personInfos[0].PersonID,
          AnonymizationRequestID: props.personInfos[0].AnonymizationRequestID
        })
        if (response.success) {
          Notification(CANCEL_FORGET_ME_REQUEST_SUCCESSFULLY)
          eventBus.publish(REFRESH_PAGE)
        }
      }
    }
  }

  const deletePerson = async () => {
    if (props.personInfos) {
      const response = await removePerson({
        PersonID: props.personInfos[0].PersonID
      })
      if (response.success) {
        Notification(DELETE_SUCCESSFULLY)
        setRedirectAfterRemove(`/person`)
      }
    }
  }

  return (
    <>
      {redirectAfterRemove && <Redirect to={redirectAfterRemove} />}
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
          <PersonMergeFormModalOpenButton personData={props.personInfos[0]} />
        </Menu.Item>
        <Menu.Item>
          <Button type="link" onClick={forgetMeRequest}>
            {canForgetMeRequest ? `Forget me request` : `Cancel Forget me request`}
          </Button>
        </Menu.Item>
        <Menu.Item>
          <Button type="link" danger onClick={deletePerson}>
            Delete this person
          </Button>
        </Menu.Item>
      </Menu>
    </>
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
      <Dropdown.Button key="Person_Actions" overlay={<GetMenu personInfos={personInfos} />} type="primary">
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

import React from "react"
import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { getProfileMeta } from "~/FormMeta/Person/PersonDetailsMeta/Profile"
import { getStudentMeta } from "~/FormMeta/Person/PersonDetailsMeta/Student"
import { getInstructorMeta } from "~/FormMeta/Person/PersonDetailsMeta/Instructor"
import { Button, Dropdown, Menu } from "antd"

const getMenu = (personInfos: { [key: string]: any }) => {
  const isStudent = personInfos[1].Student
  const isFaculty = personInfos[1].Faculty

  return (
    <Menu>
      <Menu.Item>
        <Button disabled={isStudent != null} type="link">
          Create a student
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button disabled={isFaculty != null} type="link">
          Create an instructor
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link">Create an account</Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link">Link to an account</Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link">Forget me request</Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="link" danger>
          Delete this person
        </Button>
      </Menu.Item>
    </Menu>
  )
}

export const getPersonDetailsMeta = (personInfos: { [key: string]: any }[]): IDetailsMeta => {
  const tabMetas: IDetailsTabMeta[] = []
  const person: { [key: string]: any } = personInfos[0]
  const instructor: { [key: string]: any } | undefined = personInfos[1].Faculty
  const student: { [key: string]: any } | undefined = personInfos[1].Student
  const disabilities: { [key: string]: any } | undefined = personInfos[1].PersonDisabilites

  const Person: IDetailsTabMeta = {
    tabTitle: "Profile",
    tabType: "table",
    tabMeta: [],
    multipleTabMetas: getProfileMeta(person, disabilities),
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

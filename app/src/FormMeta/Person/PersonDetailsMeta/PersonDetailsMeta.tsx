import { IDetailsMeta, IDetailsTabMeta } from "~/Component/Common/Page/DetailsPage2/Common"
import { getProfileMeta } from "~/FormMeta/Person/PersonDetailsMeta/Profile"
import { getStudentMeta } from "~/FormMeta/Person/PersonDetailsMeta/Student"
import { getInstructorMeta } from "~/FormMeta/Person/PersonDetailsMeta/Instructor"

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
    multipleTabMetas: getProfileMeta(person, disabilities)
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

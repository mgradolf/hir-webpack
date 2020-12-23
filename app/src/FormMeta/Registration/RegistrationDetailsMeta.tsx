import { Button } from "antd"
import React from "react"
import { Link } from "react-router-dom"
import { CardContainer } from "~/Component/Common/Page/DetailsPage/DetailsPageInterfaces"
import { renderDate } from "~/Component/Common/ResponsiveTable"
import RegistrationDetailsMenu from "~/Component/Registration/RegistrationDetailsMenu"

export const getRegistrationDetailsMeta = (registration: { [key: string]: any }): CardContainer[] => {
  const info: CardContainer = {
    title: `${registration.SectionNumber}`,
    cardActions: [<RegistrationDetailsMenu dataLoaded={registration} />],
    contents: [
      {
        label: "Offering Name",
        value: <Link to={`/offering/${registration.OfferingID}`}>{registration.OfferingName}</Link>
      },
      {
        label: "Section Number",
        value: <Link to={`/section/${registration.SectionID}`}>{registration.SectionNumber}</Link>
      },
      {
        label: "Student Name",
        value: <Link to={`/person/student/${registration.StudentID}`}>{registration.StudentName}</Link>
      },
      { label: "Student ID", value: registration.StudentSerialNumber },
      { label: "Enrollment Status", value: registration.EnrollmentStatus },
      { label: "Registration Date", value: registration.RegistrationDate, render: renderDate },
      { label: "Withdrawal Date", value: registration.WithdrawalDate, render: renderDate },
      { label: "Graded Date", value: registration.GradedDate, render: renderDate },
      { label: "Grade Scale", value: registration.GradeScaleType },
      { label: "Expected Attendance", value: registration.AttendanceExpected }
      //TODO: Registration question load here.....
    ]
  }

  const gradeInfo: CardContainer = {
    title: "Grade Info",
    cardActions: [<Button type="primary">Edit</Button>],
    contents: [
      { label: "Credit", value: registration.GPAValue },
      { label: "Final Grade", value: registration.AlphaValue },
      { label: "Actual Attendance", value: registration.AttendanceActual }
    ]
  }

  const orderInfo: CardContainer = {
    title: "Order Info",
    contents: [
      { label: "Order ID", value: <Link to={`/order/${registration.OrderID}`}>{registration.OrderID}</Link> },
      { label: "Account", value: <Link to={`/account/${registration.AccountID}`}>{registration.AccountName}</Link> },
      { label: "Package", value: registration.PackageName },
      { label: "Seat Group", value: registration.SeatGroup }
    ]
  }

  return [info, gradeInfo, orderInfo]
}

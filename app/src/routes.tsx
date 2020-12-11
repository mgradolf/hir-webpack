import { RouteProps } from "react-router-dom"
// import HomePage from "~/Pages/HomePage"
import AboutPage from "~/Pages/AboutPage"
import AdminPage from "~/Pages/AdminPage"

// import { OfferingPage } from "~/Pages/Offering/index"
import OfferingDetailsPage from "~/Pages/Offering/Details"
import OfferingFinancialPage from "~/Pages/Offering/Financial/FinancialPage"
import OfferingCatalogPage from "~/Pages/Offering/Catalog"
import OfferingRequisitePage from "~/Pages/Offering/Requisite"
import OfferingApprovalPage from "~/Pages/Offering/Approval"
import OfferingTaggPage from "~/Pages/Offering/Tag"
import OfferingQualifiedInstructorPage from "~/Pages/Offering/QualifiedInstructor"
import OfferingSectionPage from "~/Pages/Offering/Section"

import SectionPage from "~/Pages/Section"
import SectionDetailsPage from "~/Pages/Section/Details"
import SectionSeatgroupPage from "~/Pages/Section/SeatGroup/SeatgroupPage"
import SectionCatalogPage from "~/Pages/Section/Catalog"
import SectionSchedulePage from "~/Pages/Section/Schedule"
import SectionBudgetPage from "~/Pages/Section/Budget"
import SectionNoticePage from "~/Pages/Section/Notice/NoticePage"
import SectionDiscountPage from "~/Pages/Section/Discount"
import SectionRegistrationPage from "~/Pages/Section/Registration"
// import RegistrationDetailsPage from "~/Pages/Registration/RegistrationDetails"
import SectionTagPage from "~/Pages/Section/Tag"
import SectionProductPage from "~/Pages/Section/Product"
import SectionWaitlistEntriesPage from "~/Pages/Section/WaitlistEntries"
import SectionAcademicLogPage from "~/Pages/Section/AcademicLog"
import SectionEnrollmentLogPage from "~/Pages/Section/EnrollmentLog"
import SectionOrderLogPage from "~/Pages/Section/OrderLog"
import RequestDetailsPage from "~/Pages/Request/RequestDetailsPage"
import SectionOrderManagementPage from "~/Pages/Section/Financial/Orders"
import SectionOrderItemsPage from "~/Pages/Section/Financial/OrderItems"
import SectionOrderPaymentsPage from "~/Pages/Section/Financial/Payments"
import PaymentDetails from "~/Pages/Section/Financial/PaymentDetails"
import OrderDetailsPage from "~/Pages/Financials/OrderDetailsPage"
import SectionOrderDetails from "~/Pages/Section/Financial/OrderDetails"
import SectionCommentPage from "~/Pages/Section/Comment"
import SectionNoShowPage from "~/Pages/Section/NoShow"
import SectionRequestPage from "~/Pages/Request/RequestPage"
import SectionQuestionPage from "~/Pages/Section/Question"

import RequestPage from "~/Pages/RequestPage"

import CourseCertificatePage from "~/Pages/Certificate/CourseCertificatePage"
import { ProgramCertificatePage } from "~/Pages/Manage/Program/CertificatePage"
import CertificateDetailPage from "~/Pages/Certificate/CertificateDetailPage"

import PersonPage from "~/Pages/Person/PersonPage"
import PersonDetailPage from "~/Pages/Person/PersonDetailPage"

import StudentPage from "~/Pages/Student/StudentPage"

import InstructorPage from "~/Pages/Instructor/InstructorPage"

import AccountPage from "~/Pages/Account/AccountPage"
import AccountDetailsPage from "~/Pages/Account/AccountDetails"

import ProductPage from "~/Pages/Product/ProductPage"
import ProductDetailsPage from "~/Pages/Product/ProductDetails"

import { CatalogPage } from "~/Pages/Catalog/CatalogPage"
import { CatalogDetailsPage } from "~/Pages/Catalog/CatalogDetailsPage"

import ProgramEnrollmentPage from "~/Pages/Program/ProgramEnrollmentPage"
import ProgramApplicationPage from "~/Pages/Program/ProgramApplicationPage"

import RegistrationPage from "~/Pages/Registration/RegistrationPage"
import RegistrationDetailsPage from "~/Pages/Registration/RegistrationDetails"

import WaitlistEntriesPage from "~/Pages/WaitlistEntry/WaitlistEntryPage"
import WaitlistEntryDetailsPage from "~/Pages/WaitlistEntry/WaitlistEntryDetailsPage"
import AcademicPage from "~/Pages/Discovery/Search/Activity/AcademicPage"
import EnrollmentPage from "~/Pages/Discovery/Search/Activity/EnrollmentPage"
import OrderLogPage from "~/Pages/Discovery/Search/Activity/OrderActivityPage"

import ReportPage from "~/Pages/Report/ReportPage"
import IndividualReportPage from "~/Pages/Report/IndividualReportPage"
import FinancialReportPurchaseOrder from "~/Pages/Report/Financial/PurchaseOrder"

import QuestionPage from "~/Pages/Question/QuestionPage"
import QuestionTaggingPage from "~/Pages/Question/QuestionTaggingPage"

import FinancialOrderPagePage from "~/Pages/Financials/OrderPage"
import FinancialOrderItemPage from "~/Pages/Financials/OrderItemPage"
import FinancialPaymentPage from "~/Pages/Financials/PaymentPage"
import ChartPage from "~/Pages/Chart/ChartPage"
import ChartDetailsPage from "~/Pages/Chart/ChartDetailsPage"
import ProgramProgramPage from "~/Pages/Manage/Program/ProgramPage"
import { ProgramDetailsPage } from "~/Pages/Manage/Program/ProgramDetailsPage"
import { ProgramOfferingPage } from "~/Pages/Manage/Program/OfferingPage"
import { ProgramOfferingDetailsPage } from "~/Pages/Manage/Program/OfferingDetailsPage"
import { MarketingCodeRepositoryPage } from "~/Pages/Manage/MarketingCodes/RepositoryPage"
import MarketingCodeRepositoryDetailsPage from "~/Pages/Manage/MarketingCodes/RepositoryDetails"
import { MarketingCodeResponsePage } from "~/Pages/Manage/MarketingCodes/ResponsePage"
import MarketingCodeResponseDetailsPage from "~/Pages/Manage/MarketingCodes/ResponseDetails"
import React from "react"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("./Pages/HomePage")) },
  { path: "/about", component: AboutPage },
  { path: "/admin", component: AdminPage },

  {
    path: "/offering",
    component: React.lazy(() => import("~/Pages/Offering/index").then((x) => ({ default: x.OfferingPage })))
  },
  { path: "/offering/:offeringID", component: OfferingDetailsPage },
  { path: "/offering/:offeringID/financial", component: OfferingFinancialPage },
  { path: "/offering/:offeringID/catalog", component: OfferingCatalogPage },
  { path: "/offering/:offeringID/approval", component: OfferingApprovalPage },
  { path: "/offering/:offeringID/requisite", component: OfferingRequisitePage },
  { path: "/offering/:offeringID/instructor", component: OfferingQualifiedInstructorPage },
  { path: "/offering/:offeringID/tag", component: OfferingTaggPage },
  { path: "/offering/:offeringID/section", component: OfferingSectionPage },
  { path: "/offering/:offeringID/section/:sectionID", component: SectionDetailsPage },

  { path: "/section", component: SectionPage },
  { path: "/section/:sectionID/catalog", component: SectionCatalogPage },
  { path: "/section/:sectionID/seatgroup", component: SectionSeatgroupPage },
  { path: "/section/:sectionID/schedule", component: SectionSchedulePage },
  { path: "/section/:sectionID/budget", component: SectionBudgetPage },
  { path: "/section/:sectionID/discount", component: SectionDiscountPage },
  { path: "/section/:sectionID/notification", component: SectionNoticePage },
  { path: "/section/:sectionID/question", component: SectionQuestionPage },
  { path: "/section/:sectionID/tag", component: SectionTagPage },
  { path: "/section/:sectionID/registration/:studentID", component: RegistrationDetailsPage },
  { path: "/section/:sectionID/registration", component: SectionRegistrationPage },
  { path: "/section/:sectionID/order/payments/:paymentID", component: PaymentDetails },
  { path: "/section/:sectionID/order/payments", component: SectionOrderPaymentsPage },
  { path: "/section/:sectionID/order/items", component: SectionOrderItemsPage },
  { path: "/section/:sectionID/order/:orderID", component: SectionOrderDetails },
  { path: "/section/:sectionID/order", component: SectionOrderManagementPage },
  { path: "/section/:sectionID/product", component: SectionProductPage },
  { path: "/section/:sectionID", component: SectionDetailsPage },
  { path: "/section/:sectionID/waitlist", component: SectionWaitlistEntriesPage },
  { path: "/section/:sectionID/waitlist/:waitListEntryID", component: WaitlistEntryDetailsPage },
  { path: "/section/:sectionID/academic-log", component: SectionAcademicLogPage },
  { path: "/section/:sectionID/enrollment-log", component: SectionEnrollmentLogPage },
  { path: "/section/:sectionID/order-log", component: SectionOrderLogPage },
  { path: "/section/:sectionID/comment", component: SectionCommentPage },
  { path: "/section/:sectionID/no-show", component: SectionNoShowPage },
  { path: "/section/:sectionID/request", component: SectionRequestPage },
  { path: "/section/:secitonID/request/:requestID", component: RequestDetailsPage },

  { path: "/order", component: FinancialOrderPagePage },
  { path: "/order/items", component: FinancialOrderItemPage },
  { path: "/order/payments", component: FinancialPaymentPage },
  { path: "/order/payments/:paymentID", component: PaymentDetails },
  { path: "/order/:orderID", component: OrderDetailsPage },

  { path: "/product", component: ProductPage },
  { path: "/product/:productID", component: ProductDetailsPage },

  { path: "/catalog", component: CatalogPage },
  { path: "/catalog/:catalogID", component: CatalogDetailsPage },

  { path: "/question", component: QuestionPage },
  { path: "/question/tagging", component: QuestionTaggingPage },

  { path: "/request", component: RequestPage },
  { path: "/request/:requestID", component: RequestDetailsPage },

  { path: "/registration", component: RegistrationPage },
  { path: "/registration/:studentID", component: RegistrationDetailsPage },

  { path: "/person", component: PersonPage },
  { path: "/person/:personID", component: PersonDetailPage },

  { path: "/student", component: StudentPage },
  { path: "/person/student/:studentID", component: PersonDetailPage },

  { path: "/instructor", component: InstructorPage },
  { path: "/person/faculty/:facultyID", component: PersonDetailPage },

  { path: "/account", component: AccountPage },
  { path: "/account/:accountID", component: AccountDetailsPage },

  { path: "/waitlist", component: WaitlistEntriesPage },
  { path: "/waitlist/:waitListEntryID", component: WaitlistEntryDetailsPage },

  { path: "/program/enrollment", component: ProgramEnrollmentPage },
  { path: "/program/application", component: ProgramApplicationPage },

  { path: "/search/activity/academic-log", component: AcademicPage },
  { path: "/search/activity/enrollment-log", component: EnrollmentPage },
  { path: "/search/activity/order-log", component: OrderLogPage },

  { path: "/report", component: ReportPage },
  { path: "/report/:reportName", component: IndividualReportPage },
  { path: "/report/financial/purchase-order", component: FinancialReportPurchaseOrder },

  { path: "/chart", component: ChartPage },
  { path: "/chart/:chartName", component: ChartDetailsPage },

  { path: "/course/certificate", component: CourseCertificatePage },
  { path: "/course/certificate/:studentCertificateID", component: CertificateDetailPage },

  { path: "/program/certificate", component: ProgramCertificatePage },
  { path: "/program/certificate/:studentCertificateID", component: CertificateDetailPage },
  { path: "/program/program", component: ProgramProgramPage },
  { path: "/program/program/:programID", component: ProgramDetailsPage },
  { path: "/program/offering", component: ProgramOfferingPage },
  { path: "/program/offering/:programOfferingID", component: ProgramOfferingDetailsPage },

  { path: "/marketing-codes/repository", component: MarketingCodeRepositoryPage },
  { path: "/marketing-codes/repository/:marketingCodeID", component: MarketingCodeRepositoryDetailsPage },
  { path: "/marketing-codes/response", component: MarketingCodeResponsePage },
  { path: "/marketing-codes/response/:orderItemID/:marketingCodeID", component: MarketingCodeResponseDetailsPage }
]

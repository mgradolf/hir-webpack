import { RouteProps } from "react-router-dom"
// import HomePage from "~/Pages/HomePage"
import AboutPage from "~/Pages/AboutPage"
import AdminPage from "~/Pages/AdminPage"

// import { OfferingPage } from "~/Pages/Offering/index"
import OfferingDetailsPage from "~/Pages/Manage/Courses/Offering/Details"
import OfferingFinancialPage from "~/Pages/Manage/Courses/Offering/Financial/FinancialPage"
import OfferingCatalogPage from "~/Pages/Manage/Courses/Offering/Catalog"
import OfferingRequisitePage from "~/Pages/Manage/Courses/Offering/Requisite"
import OfferingApprovalPage from "~/Pages/Manage/Courses/Offering/Approval"
import OfferingTaggPage from "~/Pages/Manage/Courses/Offering/TagPage"
import OfferingQualifiedInstructorPage from "~/Pages/Manage/Courses/Offering/QualifiedInstructor"
import OfferingSectionPage from "~/Pages/Manage/Courses/Offering/Section"

import SectionPage from "~/Pages/Manage/Courses/Section"
import SectionDetailsPage from "~/Pages/Manage/Courses/Section/Details"
import SectionSeatgroupPage from "~/Pages/Manage/Courses/Section/SeatGroup/SeatgroupPage"
import SectionCatalogPage from "~/Pages/Manage/Courses/Section/Catalog"
import SectionSchedulePage from "~/Pages/Manage/Courses/Section/Schedule"
import SectionBudgetPage from "~/Pages/Manage/Courses/Section/Budget/BudgetPage"
import SectionNoticePage from "~/Pages/Manage/Courses/Section/Notice/NoticePage"
import SectionDiscountPage from "~/Pages/Manage/Courses/Section/Discount/DiscountPage"
import SectionRegistrationPage from "~/Pages/Manage/Courses/Section/Registration"
import SectionTagPage from "~/Pages/Manage/Courses/Section/TagPage"

import SectionProductPage from "~/Pages/Manage/Courses/Section/Product/ProductPage"
import SectionWaitlistEntriesPage from "~/Pages/Manage/Courses/Section/WaitlistEntries"
import SectionAcademicLogPage from "~/Pages/Manage/Courses/Section/SectionAcademicLog"
import SectionEnrollmentLogPage from "~/Pages/Manage/Courses/Section/SectionEnrollmentLog"
import SectionOrderLogPage from "~/Pages/Manage/Courses/Section/SectionOrderLog"
import SectionOrderManagementPage from "~/Pages/Manage/Courses/Section/Financial/Orders"
import SectionOrderItemsPage from "~/Pages/Manage/Courses/Section/Financial/OrderItems"
import SectionOrderPaymentsPage from "~/Pages/Manage/Courses/Section/Financial/Payments"
import PaymentDetails from "~/Pages/Manage/Courses/Section/Financial/PaymentDetails"
import SectionOrderDetails from "~/Pages/Manage/Courses/Section/Financial/OrderDetails"
import SectionCommentPage from "~/Pages/Manage/Courses/Section/Comment"
import SectionNoShowPage from "~/Pages/Manage/Courses/Section/NoShow"
import SectionRequestPage from "~/Pages/Manage/Courses/Section/RequestPage"
import SectionQuestionPage from "~/Pages/Manage/Courses/Section/Question"

import RequestPage from "~/Pages/Manage/Request/RequestPage"
import RequestDetailsPage from "~/Pages/Manage/Request/RequestDetailsPage"

import CourseCertificatePage from "~/Pages/Manage/Courses/Certificate/CourseCertificatePage"
import { ProgramCertificatePage } from "~/Pages/Manage/Program/CertificatePage"
import CertificateDetailPage from "~/Pages/Manage/Courses/Certificate/CertificateDetailPage"

import PersonPage from "~/Pages/Manage/People/Person/PersonPage"
import PersonDetailPage from "~/Pages/Manage/People/Person/PersonDetailPage"

import StudentPage from "~/Pages/Manage/People/Student/StudentPage"

import InstructorPage from "~/Pages/Manage/People/Instructor/InstructorPage"

import AccountPage from "~/Pages/Manage/People/Account/AccountPage"
import AccountDetailsPage from "~/Pages/Manage/People/Account/AccountDetails"

import ProductPage from "~/Pages/Manage/Product/ProductPage"
import ProductDetailsPage from "~/Pages/Manage/Product/ProductDetails"

import { CatalogPage } from "~/Pages/Manage/Catalog/CatalogPage"
import { CatalogDetailsPage } from "~/Pages/Manage/Catalog/CatalogDetailsPage"

import ProgramEnrollmentPage from "~/Pages/Program/ProgramEnrollmentPage"
import ProgramApplicationPage from "~/Pages/Program/ProgramApplicationPage"

import RegistrationPage from "~/Pages/Manage/Courses/Registration/RegistrationPage"
import RegistrationDetailsPage from "~/Pages/Manage/Courses/Registration/Details"

import WaitlistEntriesPage from "~/Pages/Manage/Courses/WaitlistEntry/WaitlistEntryPage"
import WaitlistEntryDetailsPage from "~/Pages/Manage/Courses/WaitlistEntry/WaitlistEntryDetailsPage"
import AcademicPage from "~/Pages/Discovery/Search/Activity/AcademicPage"
import EnrollmentPage from "~/Pages/Discovery/Search/Activity/EnrollmentPage"
import EnrollmentHistoryPage from "~/Pages/Discovery/Search/Activity/EnrollmentHistoryPage"
import OrderLogPage from "~/Pages/Discovery/Search/Activity/OrderActivityPage"

import ReportPage from "~/Pages/Discovery/Report/ReportPage"
import IndividualReportPage from "~/Pages/Discovery/Report/IndividualReportPage"
import FinancialReportPurchaseOrder from "~/Pages/Discovery/Report/Financial/PurchaseOrder"

import QuestionPage from "~/Pages/Manage/Question/QuestionRepositoryPage"
import QuestionTaggingPage from "~/Pages/Manage/Question/QuestionTaggingPage"
import QuestionResponsePage from "~/Pages/Manage/Question/QuestionResponsePage"

import FinancialOrderPagePage from "~/Pages/Manage/Financials/OrderPage"
import OrderDetailsPage from "~/Pages/Manage/Financials/OrderDetailsPage"
import FinancialOrderItemPage from "~/Pages/Manage/Financials/OrderItemPage"
import FinancialOrderCreditsPage from "~/Pages/Manage/Financials/OrderCreditsPage"
import FinancialPaymentPage from "~/Pages/Manage/Financials/PaymentPage"
import FinancialDiscountProgramPage from "~/Pages/Manage/Financials/DiscountProgramPage"
import FinancialDiscountProgramDetailsPage from "~/Pages/Manage/Financials/DiscountProgramDetailsPage"
import FinancialTransactionPage from "~/Pages/Manage/Financials/TransactionPage"
import FinancialTransactionDetailsPage from "~/Pages/Manage/Financials/TransactionDetailsPage"

import ChartPage from "~/Pages/Discovery/Chart/ChartPage"
import ChartDetailsPage from "~/Pages/Discovery/Chart/ChartDetailsPage"
import ProgramProgramPage from "~/Pages/Manage/Program/ProgramPage"
import { ProgramDetailsPage } from "~/Pages/Manage/Program/ProgramDetailsPage"
import { ProgramOfferingPage } from "~/Pages/Manage/Program/OfferingPage"
import { ProgramOfferingDetailsPage } from "~/Pages/Manage/Program/OfferingDetailsPage"
import { MarketingCodeRepositoryPage } from "~/Pages/Manage/MarketingCodes/RepositoryPage"
import MarketingCodeRepositoryDetailsPage from "~/Pages/Manage/MarketingCodes/RepositoryDetails"
import { MarketingCodeResponsePage } from "~/Pages/Manage/MarketingCodes/ResponsePage"
import MarketingCodeResponseDetailsPage from "~/Pages/Manage/MarketingCodes/ResponseDetails"
import React from "react"
import TagsPage from "~/Pages/Manage/Tags/TagsPage"
import { TagsDetailsPage } from "~/Pages/Manage/Tags/TagsDetailsPage"
import QuestionRepositoryDetailsPage from "~/Pages/Manage/Question/QuestionRepositoryDetailsPage"

export const AppRoutes: RouteProps[] = [
  { path: "/", component: React.lazy(() => import("~/Pages/HomePage")) },
  { path: "/about", component: AboutPage },
  { path: "/admin", component: AdminPage },

  {
    path: "/offering",
    component: React.lazy(() =>
      import("~/Pages/Manage/Courses/Offering/index").then((x) => ({ default: x.OfferingPage }))
    )
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

  { path: "/order/items", component: FinancialOrderItemPage },
  { path: "/order/credits", component: FinancialOrderCreditsPage },
  { path: "/order/payments", component: FinancialPaymentPage },
  { path: "/order", component: FinancialOrderPagePage },
  { path: "/order/:orderID", component: OrderDetailsPage },
  { path: "/order/payments/:paymentID", component: PaymentDetails },

  { path: "/discount-programs", component: FinancialDiscountProgramPage },
  { path: "/discount-programs/:discountProgramID", component: FinancialDiscountProgramDetailsPage },

  { path: "/transaction", component: FinancialTransactionPage },
  { path: "/transaction/:depositID", component: FinancialTransactionDetailsPage },

  { path: "/product", component: ProductPage },
  { path: "/product/:productID", component: ProductDetailsPage },

  { path: "/catalog", component: CatalogPage },
  { path: "/catalog/:catalogID", component: CatalogDetailsPage },

  { path: "/tags", component: TagsPage },
  { path: "/tags/:tagID", component: TagsDetailsPage },

  { path: "/question", component: QuestionPage },
  { path: "/question/:PreferenceDefID", component: QuestionRepositoryDetailsPage },
  { path: "/question/tagging", component: QuestionTaggingPage },
  { path: "/question/response", component: QuestionResponsePage },

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

  { path: "/program/offering", component: ProgramOfferingPage },
  { path: "/program/offering/:programOfferingID", component: ProgramOfferingDetailsPage },
  { path: "/program/enrollment", component: ProgramEnrollmentPage },
  { path: "/program/application", component: ProgramApplicationPage },
  { path: "/program/certificate", component: ProgramCertificatePage },
  { path: "/program/certificate/:studentCertificateID", component: CertificateDetailPage },
  { path: "/program/program", component: ProgramProgramPage },
  { path: "/program/:programID", component: ProgramDetailsPage },

  { path: "/search/activity/academic-log", component: AcademicPage },
  { path: "/search/activity/enrollment-log", component: EnrollmentPage },
  { path: "/search/activity/enrollment-history", component: EnrollmentHistoryPage },
  { path: "/search/activity/order-log", component: OrderLogPage },

  { path: "/report", component: ReportPage },
  { path: "/report/:reportName", component: IndividualReportPage },
  { path: "/report/financial/purchase-order", component: FinancialReportPurchaseOrder },

  { path: "/chart", component: ChartPage },
  { path: "/chart/:chartName", component: ChartDetailsPage },

  { path: "/course/certificate", component: CourseCertificatePage },
  { path: "/course/certificate/:studentCertificateID", component: CertificateDetailPage },

  { path: "/marketing-codes/repository", component: MarketingCodeRepositoryPage },
  { path: "/marketing-codes/repository/:marketingCodeID", component: MarketingCodeRepositoryDetailsPage },
  { path: "/marketing-codes/response", component: MarketingCodeResponsePage },
  { path: "/marketing-codes/response/:orderItemID/:marketingCodeID", component: MarketingCodeResponseDetailsPage }
]

import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { AppStore, AppState } from "~/Store/index"
import { Provider, connect } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { History } from "history"
import LoginPage from "~/Pages/Login/LoginPage"
import HomePage from "~/Pages/HomePage"
import AboutPage from "~/Pages/AboutPage"
import AdminPage from "~/Pages/AdminPage"
import NotFoundPage from "~/Pages/NotFoundPage"

import OfferingPage from "~/Pages/Offering/index"
import OfferingDetailsPage from "~/Pages/Offering/Details"
import OfferingFinancialPage from "~/Pages/Offering/Financial"
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
import RegistrationDetailsPage from "~/Pages/Registration/RegistrationDetails"
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
import OrderDetails from "~/Pages/Section/Financial/OrderDetails"
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

import CatalogPage from "~/Pages/Catalog/CatalogPage"
import CatalogDetailsPage from "~/Pages/Catalog/CatalogDetailsPage"

import ProgramEnrollmentPage from "~/Pages/Program/ProgramEnrollmentPage"
import ProgramApplicationPage from "~/Pages/Program/ProgramApplicationPage"

import RegistrationPage from "~/Pages/Registration/RegistrationPage"

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
import DefaultLayout from "~/Layout/DefaultLayout"
import ModalContainer from "~/Component/ModalContainer"
import ProgramProgramPage from "~/Pages/Manage/Program/ProgramPage"
import { ProgramDetailsPage } from "~/Pages/Manage/Program/ProgramDetailsPage"
import { ProgramOfferingPage } from "~/Pages/Manage/Program/OfferingPage"
import { ProgramOfferingDetailsPage } from "~/Pages/Manage/Program/OfferingDetailsPage"
import { MarketingCodeRepositoryPage } from "~/Pages/Manage/MarketingCodes/RepositoryPage"
import MarketingCodeRepositoryDetailsPage from "~/Pages/Manage/MarketingCodes/RepositoryDetails"
import { MarketingCodeResponsePage } from "~/Pages/Manage/MarketingCodes/ResponsePage"
import MarketingCodeResponseDetailsPage from "~/Pages/Manage/MarketingCodes/ResponseDetails"

interface AppProps {
  store: AppStore
  history: History
  redirectToLogin: boolean
}

function App(props: AppProps): JSX.Element {
  const route: JSX.Element = props.redirectToLogin ? (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Redirect to={{ pathname: "/login" }} />
    </Switch>
  ) : (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/admin" component={AdminPage} />

      <Route exact path="/offering" component={OfferingPage} />
      <Route exact path="/offering/:offeringID" component={OfferingDetailsPage} />
      <Route exact path="/offering/:offeringID/financial" component={OfferingFinancialPage} />
      <Route exact path="/offering/:offeringID/catalog" component={OfferingCatalogPage} />
      <Route exact path="/offering/:offeringID/approval" component={OfferingApprovalPage} />
      <Route exact path="/offering/:offeringID/requisite" component={OfferingRequisitePage} />
      <Route exact path="/offering/:offeringID/instructor" component={OfferingQualifiedInstructorPage} />
      <Route exact path="/offering/:offeringID/tag" component={OfferingTaggPage} />
      <Route exact path="/offering/:offeringID/section" component={OfferingSectionPage} />
      <Route exact path="/offering/:offeringID/section/:sectionID" component={SectionDetailsPage} />

      <Route exact path="/section/:sectionID/catalog" component={SectionCatalogPage} />
      <Route exact path="/section/:sectionID/seatgroup" component={SectionSeatgroupPage} />
      <Route exact path="/section/:sectionID/schedule" component={SectionSchedulePage} />
      <Route exact path="/section/:sectionID/budget" component={SectionBudgetPage} />
      <Route exact path="/section/:sectionID/discount" component={SectionDiscountPage} />
      <Route exact path="/section/:sectionID/notification" component={SectionNoticePage} />
      <Route exact path="/section/:sectionID/question" component={SectionQuestionPage} />
      <Route exact path="/section/:sectionID/tag" component={SectionTagPage} />

      <Route exact path="/section/:sectionID/registration/:studentID" component={RegistrationDetailsPage} />
      <Route exact path="/section/:sectionID/registration" component={SectionRegistrationPage} />
      {/* <Route exact path="/section/:sectionID/registration" component={RegistrationPage} /> */}

      <Route exact path="/section/:sectionID/order/payments/:paymentID" component={PaymentDetails} />
      <Route exact path="/section/:sectionID/order/payments" component={SectionOrderPaymentsPage} />
      <Route exact path="/section/:sectionID/order/items" component={SectionOrderItemsPage} />
      <Route exact path="/section/:sectionID/order/:orderID" component={OrderDetails} />
      <Route exact path="/section/:sectionID/order" component={SectionOrderManagementPage} />

      <Route exact path="/section/:sectionID/product" component={SectionProductPage} />
      <Route exact path="/section/:sectionID" component={SectionDetailsPage} />

      <Route exact path="/section/:sectionID/waitlist" component={SectionWaitlistEntriesPage} />
      <Route exact path="/section/:sectionID/waitlist/:waitListEntryID" component={WaitlistEntryDetailsPage} />

      <Route exact path="/section/:sectionID/academic-log" component={SectionAcademicLogPage} />
      <Route exact path="/section/:sectionID/enrollment-log" component={SectionEnrollmentLogPage} />
      <Route exact path="/section/:sectionID/order-log" component={SectionOrderLogPage} />
      <Route exact path="/section/:sectionID/comment" component={SectionCommentPage} />
      <Route exact path="/section/:sectionID/no-show" component={SectionNoShowPage} />
      <Route exact path="/section/:sectionID/request" component={SectionRequestPage} />
      <Route exact path="/section/:secitonID/request/:requestID" component={RequestDetailsPage} />
      <Route exact path="/section" component={SectionPage} />

      <Route exact path="/order" component={FinancialOrderPagePage} />
      <Route exact path="/order/items" component={FinancialOrderItemPage} />
      <Route exact path="/order/payments" component={FinancialPaymentPage} />
      <Route exact path="/order/payments/:paymentID" component={PaymentDetails} />
      <Route exact path="/order/:orderID" component={OrderDetails} />

      <Route exact path="/product" component={ProductPage} />
      <Route exact path="/product/:productID" component={ProductDetailsPage} />

      <Route exact path="/catalog" component={CatalogPage} />
      <Route exact path="/catalog/:catalogID" component={CatalogDetailsPage} />

      <Route exact path="/question" component={QuestionPage} />
      <Route exact path="/question/tagging" component={QuestionTaggingPage} />

      <Route exact path="/request" component={RequestPage} />
      <Route exact path="/request/:requestID" component={RequestDetailsPage} />

      <Route exact path="/registration" component={RegistrationPage} />
      <Route exact path="/registration/:studentID" component={RegistrationDetailsPage} />

      <Route exact path="/person" component={PersonPage} />
      <Route exact path="/person/:personID" component={PersonDetailPage} />

      <Route exact path="/student" component={StudentPage} />
      <Route exact path="/person/student/:studentID" component={PersonDetailPage} />

      <Route exact path="/instructor" component={InstructorPage} />
      <Route exact path="/person/faculty/:facultyID" component={PersonDetailPage} />

      <Route exact path="/account" component={AccountPage} />
      <Route exact path="/account/:accountID" component={AccountDetailsPage} />

      <Route exact path="/waitlist" component={WaitlistEntriesPage} />
      <Route exact path="/waitlist/:waitListEntryID" component={WaitlistEntryDetailsPage} />

      <Route exact path="/program/enrollment" component={ProgramEnrollmentPage} />
      <Route exact path="/program/application" component={ProgramApplicationPage} />

      <Route exact path="/search/activity/academic-log" component={AcademicPage} />
      <Route exact path="/search/activity/enrollment-log" component={EnrollmentPage} />
      <Route exact path="/search/activity/order-log" component={OrderLogPage} />

      <Route exact path="/report" component={ReportPage} />
      <Route exact path="/report/:reportName" component={IndividualReportPage} />
      <Route exact path="/report/financial/purchase-order" component={FinancialReportPurchaseOrder} />
      <Route exact path="/chart" component={ChartPage} />
      <Route exact path="/chart/:chartName" component={ChartDetailsPage} />

      <Route exact path="/course/certificate" component={CourseCertificatePage} />
      <Route exact path="/certificate/:studentCertificateID" component={CertificateDetailPage} />

      <Route exact path="/program/certificate" component={ProgramCertificatePage} />
      <Route exact path="/program/program" component={ProgramProgramPage} />
      <Route exact path="/program/program/:programID" component={ProgramDetailsPage} />
      <Route exact path="/program/offering" component={ProgramOfferingPage} />
      <Route exact path="/program/offering/:programOfferingID" component={ProgramOfferingDetailsPage} />

      <Route exact path="/marketing-codes/repository" component={MarketingCodeRepositoryPage} />
      <Route exact path="/marketing-codes/repository/:marketingCodeID" component={MarketingCodeRepositoryDetailsPage} />
      <Route exact path="/marketing-codes/response" component={MarketingCodeResponsePage} />
      <Route
        exact
        path="/marketing-codes/response/:orderItemID/:marketingCodeID"
        component={MarketingCodeResponseDetailsPage}
      />

      <Route component={NotFoundPage} />
    </Switch>
  )
  return (
    <Provider store={props.store}>
      <div id="modal-container"></div>
      <ModalContainer />
      <ConnectedRouter history={props.history}>
        {/* Should be refactored later as condition check gets repeated */}
        {props.redirectToLogin ? route : <DefaultLayout>{route}</DefaultLayout>}
      </ConnectedRouter>
    </Provider>
  )
}

const mapStateToProps = (state: AppState) => {
  return {
    redirectToLogin: state.authentication.redirectToLogin
  }
}
export default connect(mapStateToProps)(App)

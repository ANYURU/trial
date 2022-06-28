import {
  Login,
  Dashboard,
  ForgotPassword,
  SignUp,
  Verification,
  SetPassword,
  Deposit,
  Profile,
  DepositHistory,
  MakeDeposit,
} from "../pages";
import {
  Loans,
  LoanHistory,
  LoanPayment,
  LoanRequest,
  LoanVerify,
  LoanAdmin,
  VerifyPayment,
  MemberLoans,
  LoanPaymentApplications,
} from "../pages";
import {
  Withdraw,
  WithdrawHistory,
  WithdrawRequest,
  WithdrawMembers,
  DepositVerify,
  WithdrawVerify,
  Members,
  Applications,
  MemberApplication,
} from "../pages";
import {
  Accounts,
  Savings,
  Mwana,
  Fixed,
  Shares,
  DepositAdmin,
} from "../pages";
import { Admins, AdminInfo, SuperAdDashboard } from "../pages";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useState } from "react";
import Unauthorized from "../pages/Unauthorized";
import { ApplicantApproval } from "../pages";
import ErrorBoundary from "../components/ErrorBoundary";


export default function App() {
  const [loading, setLoading] = useState(true);
  const preloader = document.getElementById("preloader");

  const html = document.querySelector("html");
  if (localStorage.getItem("darkMode") === "true") {
    html.classList.add("darkClass");
  } else {
    html.classList.remove("darkClass");
  }

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setLoading(false);
    }, 500);
  }

  

  return (
    !loading && (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Accessed privately but doesnot have restricted access depending on the access role */}

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={["super_admin"]} />}>
            <Route path="admins" element={<Admins />} />
            <Route path="admins/:id" element={<AdminInfo />} />
            {/* <Route path="dashboard" element={<SuperAdDashboard />} /> */}
          </Route>

          {/* Accessed by only administrators. */}
          <Route
            element={<PrivateRoute allowedRoles={["admin", "super_admin"]} />}
          >
            <Route
              path="loans/members-requests/:id"
              element={
                <ErrorBoundary>
                  <LoanVerify />
                </ErrorBoundary>
              }
            />
            <Route
              path="loans/members"
              element={
                <ErrorBoundary>
                  <MemberLoans />
                </ErrorBoundary>
              }
            />
            <Route
              path="loans/members-requests"
              element={
                <ErrorBoundary>
                  <LoanAdmin />
                </ErrorBoundary>
              }
            />
            <Route
              path="loans/applications"
              element={
                <ErrorBoundary>
                  <LoanPaymentApplications />
                </ErrorBoundary>
              }
            />
            <Route
              path="withdraw/members/:id"
              element={
                <ErrorBoundary>
                  <WithdrawVerify />
                </ErrorBoundary>
              }
            />
            <Route
              path="withdraw/members"
              element={
                <ErrorBoundary>
                  <WithdrawMembers />
                </ErrorBoundary>
              }
            />
            <Route
              path="deposit/members/:id"
              element={
                <ErrorBoundary>
                  <DepositVerify />
                </ErrorBoundary>
              }
            />
            <Route
              path="deposit/members"
              element={
                <ErrorBoundary>
                  <DepositAdmin />
                </ErrorBoundary>
              }
            />

            <Route
              path="members"
              element={
                <ErrorBoundary>
                  <Members />
                </ErrorBoundary>
              }
            />
            <Route
              path="members/applications"
              element={
                <ErrorBoundary>
                  <Applications />
                </ErrorBoundary>
              }
            />
            <Route
              path="members/applications/:id"
              element={
                <ErrorBoundary>
                  <ApplicantApproval />
                </ErrorBoundary>
              }
            />
            <Route
              path="application"
              element={
                <ErrorBoundary>
                  <MemberApplication />
                </ErrorBoundary>
              }
            />
          </Route>

          {/* Accessed by only the system_admin */}

          {/* Accessed by both members and admins */}
          <Route
            element={
              <PrivateRoute allowedRoles={["member", "admin", "super_admin"]} />
            }
          >
            <Route path="/loans" element={<Loans />} />
            <Route path="loans/history" element={<LoanHistory />} />
            <Route path="loans/Payment/:id" element={<LoanPayment />} />
            <Route
              path="loans/verify-payment/:id"
              element={<VerifyPayment />}
            />
            <Route path="loans/request" element={<LoanRequest />} />

            <Route path="deposit" element={<Deposit />} />
            <Route path="deposit/history" element={<DepositHistory />} />
            <Route path="deposit/deposit" element={<MakeDeposit />} />

            <Route path="accounts" element={<Accounts />} />
            <Route path="accounts/savings" element={<Savings />} />
            <Route path="accounts/mwana" element={<Mwana />} />
            <Route path="accounts/fixed" element={<Fixed />} />
            <Route path="accounts/shares" element={<Shares />} />

            <Route path="/withdraw" element={<Withdraw />} />
            <Route path="withdraw/history" element={<WithdrawHistory />} />
            <Route path="withdraw/request" element={<WithdrawRequest />} />

            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    )
  );
}

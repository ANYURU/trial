import { Login, Dashboard, ForgotPassword, SignUp, Verification, SetPassword, Deposit, Profile, DepositHistory, MakeDeposit } from "../pages";
import { Loans, LoanHistory, LoanPayment, LoanRequest, LoanVerify, LoanAdmin, MemberLoans, LoanPaymentApplications } from "../pages";
import { Withdraw, WithdrawHistory, WithdrawRequest, WithdrawMembers, DepositVerify, WithdrawVerify, Members, Applications, MemberApplication } from "../pages";
import { Accounts, Savings, Mwana, Fixed, Shares, DepositAdmin } from "../pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { useState } from "react";
import Unauthorized from "../pages/Unauthorized";
import { ApplicantApproval } from "../pages";



export default function App() {
  const [ loading, setLoading ] = useState(true)
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.display = "none";
      setLoading(false);
    }, 1000);
  }

  

  return (
    !loading &&
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/verify" element={<Verification />} />
          <Route path="/set-password" element={<SetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />

          {/* Accessed privately but doesnot have restricted access depending on the access role */}
          <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Accessed by both members and admins */}
          <Route element={<PrivateRoute allowedRoles={[ "member", "admin" ]}/>}>
            <Route path="/loans" element={<Loans />} />
              <Route path='loans/history' element={<LoanHistory />} />
              <Route path='loans/Payment/:id' element={<LoanPayment />} />
              <Route path='loans/request' element={<LoanRequest />} />

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


            <Route path='/unauthorized' element={<Unauthorized />} /> 
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Accessed by only administrators. */}
          <Route element={<PrivateRoute allowedRoles={[ "admin" ]}/>}>
            <Route path='loans/members/:id' element={<LoanVerify />} />
            <Route path="loans/members" element={<MemberLoans />} />
            <Route path="loans/members-requests" element={<LoanAdmin />} />
            <Route path="loans/applications" element={<LoanPaymentApplications />} />
            <Route path="withdraw/members/:id" element={<WithdrawVerify />} />
            <Route path="withdraw/members" element={<WithdrawMembers />} />
            <Route path="deposit/members/:id" element={<DepositVerify />} />
            <Route path="deposit/members" element={<DepositAdmin />} />

            <Route path="members" element={<Members />} />
            <Route path="members/applications" element={<Applications />} />
            <Route path="members/applications/:id" element={<ApplicantApproval />} />
            <Route path="application" element={<MemberApplication />} />
          </Route>
      </Routes>
    </Router>
  )
}
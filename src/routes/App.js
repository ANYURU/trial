import { Login, Dashboard, ForgotPassword, SignUp, Deposit, Profile, DepositHistory, MakeDeposit } from "../pages";
import { Loans, LoanHistory, LoanPayment, LoanRequest } from "../pages";
import { Withdraw, WithdrawHistory, WithdrawRequest } from "../pages";
import { Accounts, Savings, Mwana, Fixed, Shares } from "../pages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";


export default function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/loans" element={<Loans />} />
                <Route path='loans/history' element={<LoanHistory />} />
                <Route path='loans/Payment' element={<LoanPayment />} />
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


              <Route path="/profile" element={<Profile />} />
          </Route>
      </Routes>
    </Router>
  )
}
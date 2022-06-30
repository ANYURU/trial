import Login from './OnboardPages/Login'
import Dashboard from './Dashboard/Dashboard'
import ForgotPassword from './OnboardPages/ForgotPassword'
import SignUp from './OnboardPages/SignUp'
import Verification from './OnboardPages/Verification'
import SetPassword  from './OnboardPages/SetPassword'


import Deposit from './Deposit/Deposit'
import Accounts from './Accounts/Accounts'
import Profile from './Profile'
import DepositHistory from './Deposit/DepositHistory'
import MakeDeposit from './Deposit/MakeDeposit'
import DepositVerify from './Deposit/DepositVerify'
import DepositAdmin from './Deposit/DepositAdmin'

// loans
import Loans from './Loans/Loans'
import LoanHistory from './Loans/LoanHistory'
import LoanPayment from './Loans/LoanPayment'
import LoanRequest from './Loans/LoanRequest'
import LoanVerify from './Loans/LoanVerify'
import { LoanAdmin } from './Loans'
import MemberLoans from './Loans/MemberLoans'
import { LoanPaymentApplications } from './Loans'
import { VerifyPayment } from './Loans'

// withdraw
import Withdraw from './Withdraw/Withdraw'
import WithdrawHistory from './Withdraw/WithdrawHistory'
import WithdrawRequest from './Withdraw/WithdrawRequest'
import WithdrawVerify from './Withdraw/WithdrawVerify'
import WithdrawMembers from './Withdraw/WithdrawMembers'

// accounts
import Savings from './Accounts/Savings'
import Mwana from './Accounts/Mwana'
import Fixed from './Accounts/Fixed'
import Shares from './Accounts/Shares'

// applications
import Applications from './Applications/Applications'
import MemberApplication from './Applications/MemberApplication'

// members
import Members from './Members/Members'
import ApplicantApproval from './Members/ApplicantApproval'

// admins
import Admins from './Admins'
import AdminInfo from './Admins/AdminInfo'

import SuperAdDashboard from './Dashboard/SuperAdDashboard'


// exports
export { Loans, LoanHistory, LoanPayment, LoanRequest, DepositAdmin, LoanAdmin, LoanPaymentApplications, VerifyPayment }

export { Withdraw, WithdrawHistory, WithdrawRequest, WithdrawMembers}

export { Accounts, Savings, Mwana, Fixed, Shares, MemberLoans}

export { Members, DepositVerify, LoanVerify, WithdrawVerify, Applications, MemberApplication, ApplicantApproval }

export { Login, Dashboard, ForgotPassword, SignUp, Verification, SetPassword, Deposit, Profile, DepositHistory, MakeDeposit }

export { Admins, AdminInfo, SuperAdDashboard }
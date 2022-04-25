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

// loans
import Loans from './Loans/Loans'
import LoanHistory from './Loans/LoanHistory'
import LoanPayment from './Loans/LoanPayment'
import LoanRequest from './Loans/LoanRequest'
import LoanVerify from './Loans/LoanVerify'

// withdraw
import Withdraw from './Withdraw/Withdraw'
import WithdrawHistory from './Withdraw/WithdrawHistory'
import WithdrawRequest from './Withdraw/WithdrawRequest'
import WithdrawVerify from './Withdraw/WithdrawVerify'

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


// exports
export { Loans, LoanHistory, LoanPayment, LoanRequest }

export { Withdraw, WithdrawHistory, WithdrawRequest}

export { Accounts, Savings, Mwana, Fixed, Shares}

export { Members, DepositVerify, LoanVerify, WithdrawVerify, Applications, MemberApplication }



export { Login, Dashboard, ForgotPassword, SignUp, Verification, SetPassword, Deposit, Profile, DepositHistory, MakeDeposit }

import * as Yup from 'yup'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const validationSchema = Yup.object({
  phoneNo: Yup.string().matches(phoneRegExp, 'Invalid phone number').min(10, 'Phone number must have 10 digits').required("Phone Number is required"),
  password: Yup.string().trim().min(8, 'Password must be atleast 8 characters').required("Password is required"),
})

export const registerValidationSchema = Yup.object({
  password: Yup.string().trim().min(8, 'Password must be atleast 8 characters').required("Password is required"),
  // Matching passwords schema
  confirmPassword: Yup.string().trim().required("Confirm Password is required").oneOf([Yup.ref('password')], 'Password must be the same!').required('Required!')
})

export const validationSubmitSchema = Yup.object({
  phoneNo: Yup.string().matches(phoneRegExp, 'Invalid phone number').min(10, 'Phone number must have 10 digits').required("Phone Number is required")
})

const otpRegExp = /^[0-9]{6}$/gm
export const otpValidationSchema = Yup.object({
  otp: Yup.string().required().matches(otpRegExp, 'Invalid OTP')
})

export const verifyCodeSchema = Yup.object({
  code: Yup.string().min(6, 'Code must be 6-digits').max(6, 'Code must be 6-digit').required("Verification Code is required")
})

export const changeUserPasswordValidationSchema = Yup.object({
  new_password: Yup.string().trim().min(8, 'Must be atleast 8 characters!').notOneOf([Yup.ref('current_password')], 'Must not be the same as current password!').required("Required!"),
  confirm_password: Yup.string().trim().oneOf([Yup.ref('new_password')], 'Must be the same as New password!').notOneOf([Yup.ref('current_password')], 'Must not be the same as current password!').required("Required!"),
  current_password: Yup.string().trim().min(8, 'Must be atleast 8 characters!').required('Required!')
})

export const selfTermination = Yup.object({
  current_password: Yup.string().min(8, 'Must be atleast 8 characters!').required('Required!')
})



// creating a custom yup validation method
Yup.addMethod(Yup.string, 'isNumber', function () {
  return this.matches(/^[0-9]+$/, { 
    message:'Must be a number', 
    excludedEmptyStrings: true 
  }).required("Required!")
})

export const evidencedRequestValidationSchema = Yup.object({
  amount: Yup.string().isNumber(),
  account_type: Yup.string().required('Required!'),
  particulars: Yup.string(),
  phone_number: Yup.string().required('Required!'),
  evidence: Yup.string().required('Required!')
})


export const nonEvidencedRequestValidationSchema = Yup.object({
  amount: Yup.string().isNumber(),
  account_type: Yup.string().required('Required!'),
  particulars: Yup.string(),
})

export const loanPaymentValidationSchema = Yup.object({
  amount: Yup.string().isNumber(),
  particulars: Yup.string()
})

export const loan1ValidationSchema = Yup.object({
  landline_number: Yup.string().matches(phoneRegExp, 'Invalid phone number').min(10, 'Phone number must have 10 digits').required("Phone Number is required"),
  kin_contact: Yup.string().matches(phoneRegExp, 'Invalid phone number').min(10, 'Phone number must have 10 digits').required("Phone Number is required"),
  spouse_contact: Yup.string().matches(phoneRegExp, 'Invalid phone number').min(10, 'Phone number must have 10 digits').required("Phone Number is required"),
  no_of_dependents: Yup.string().required("No. of dependents is required"),
  town: Yup.string().required("Town is required")
})

export const loan2ValidationSchema = Yup.object({
  landline_number: Yup.string().matches(phoneRegExp, 'Invalid phone number').min(10, 'Phone number must have 10 digits').required("Phone Number is required"),
  employer_no: Yup.string().matches(phoneRegExp, 'Invalid phone number').min(10, 'Phone number must have 10 digits').required("Phone Number is required"),
  spouse_contact: Yup.string().matches(phoneRegExp, 'Invalid phone number').min(10, 'Phone number must have 10 digits').required("Phone Number is required"),
  no_of_dependents: Yup.string().required("No. of dependents is required"),
  employer: Yup.string().required("employer's name is required"),
  asset1: Yup.string().required("asset is required"),
  asset2: Yup.string().required("asset 2 is required"),
  loan_purpose: Yup.string().required("required"),
  amount: Yup.string().required("Amount is required"),
  amount_in_words: Yup.string().required("required"),
  months: Yup.string().required("required"),
})

export const loan3ValidationSchema = Yup.object({
  landline_number: Yup.string().matches(phoneRegExp, 'Invalid phone number').min(10, 'Phone number must have 10 digits').required("Phone Number is required"),
  // employer_no: Yup.string().matches(phoneRegExp, 'Invalid phone number').min(10, 'Phone number must have 10 digits').required("Phone Number is required"),
  spouse_contact: Yup.string().matches(phoneRegExp, 'Invalid phone number').min(10, 'Phone number must have 10 digits').required("Phone Number is required"),
  no_of_dependents: Yup.string().required("No. of dependents is required"),
  // employer: Yup.string().required("employer's name is required"),
  asset1: Yup.string().required("asset is required"),
  asset2: Yup.string().required("asset 2 is required"),
  business_type: Yup.string().required("required"),
  years_of_operation: Yup.string().required("required"),
  business_income: Yup.string().required("required"),
  loan_purpose: Yup.string().required("required"),
  amount: Yup.string().required("Amount is required!"),
  amount_in_words: Yup.string().required("required!"),
  months: Yup.string().required("required!"),
})


export const member1ValidationSchema = Yup.object({
  fullname: Yup.string().required("fullname is required!"),
  phone_number: Yup.string().required("phone number is required!"),
  id_passport_number: Yup.string().required("ID/Passport number is required!"),
  fathers_name: Yup.string().required("father's name is required!"),
  fathers_address: Yup.string().required("father's address is required!"),
  dob: Yup.string().required("Date if birth is required!"),
  income_sources: Yup.object({
    status: Yup.string().required("Your income source is required!"),
    employed: Yup.object().when("status", {
      is: "Employed",
      then: Yup.object({
        employers_name: Yup.string().required("employers name is required!"),
        employers_address: Yup.string().required("employers address is required!"),
        gross_monthly_income: Yup.string().required("Gross monthly income is required!")
      })
    }),
    business: Yup.object().when("status", {
      is: "Business",
      then: Yup.object({ 
        business_name: Yup.string().required("business name is required!"),
        business_address: Yup.string().required("business address is required!"),
        gross_monthly_income: Yup.string().required("Gross monthly income is required!") 
      })
    }),
  })
})

export const member2ValidationSchema = Yup.object({
  proposed_monthly_contributions: Yup.string().matches(/^[0-9]+$/, "Must be a number").required("Monthly contributions are required!"),
  amount_in_words: Yup.string().matches(/^[a-zA-Z ]+$/, "Must only contain letters").required("Amount in words is required!")
})

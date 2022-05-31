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


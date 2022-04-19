import * as Yup from 'yup'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
export const validationSchema = Yup.object({
  phoneNo: Yup.string().matches(phoneRegExp, 'Invalid phone number').min(10, 'Phone number must have 10 digits').required("Phone Number is required"),
  password: Yup.string().trim().min(8, 'Password must be atleast 8 characters').required("Password is required"),
})

export const registerValidationSchema = Yup.object({
  password: Yup.string().trim().min(8, 'Password must be atleast 8 characters').required("Password is required"),
  confirmPassword: Yup.string().trim().required("Confirm Password is required"),
})

export const validationSubmitSchema = Yup.object({
  phoneNo: Yup.string().matches(phoneRegExp, 'Invalid phone number').min(10, 'Phone number must have 10 digits').required("Phone Number is required")
})

export const verifyCodeSchema = Yup.object({
  code: Yup.string().min(6, 'Code must be 6-digits').max(6, 'Code must be 6-digit').required("Verification Code is required")
})
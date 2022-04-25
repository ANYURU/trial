import { ImKey } from "react-icons/im"

export default function ConfirmPasswordField({ errors, touched, handleChange, handleBlur }) {
  return (
    <div className="m-1 w-full">
        <div className="w-full relative flex items-center">
          <input type="password" placeholder={"Confirm Password"} name="confirmPassword"
            onChange={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            className='mt-1 py-3 focus:outline-none focus:ring-2 focus:ring-inputblue bg-inputblue focus:bg-transparent w-full pl-8'
            required />
            <i className="absolute left-3"><ImKey /></i>
        </div>
        <div className={`${(errors?.confirmPassword  && touched?.confirmPassword) ? "block" : 'hidev'}`} ><label className={`${(errors?.confirmPassword  && touched?.confirmPassword) ? "text-red-500 text-sm" : 'text-transparent text-sm'}`}>{`${(errors?.confirmPassword  && touched?.confirmPassword) ? errors.confirmPassword : 'hide'}`}</label>
        </div>
      </div>
  )
}
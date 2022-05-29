import { ImKey } from "react-icons/im"

function PasswordTextField({ errors, touched, handleChange, handleBlur }) {
  return (
    <div className="m-1 w-full">
        <div className="w-full relative flex items-center">
          <input type="password" placeholder={"Password"} name="password"
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            className={`mt-1 py-3 focus:outline-none focus:ring-2 focus:ring-inputblue bg-inputblue focus:bg-transparent w-full pl-8 ${errors?.password && touched?.password && "ring-1 ring-red-500"}`}
            required />
            <i className="absolute left-3"><ImKey /></i>
        </div>
        <div className={`${(errors?.password  && touched?.password) ? "block" : 'hidev'}`} ><label className={`${(errors?.password  && touched?.password) ? "text-red-500 text-sm" : 'text-transparent text-sm'}`}>{`${(errors?.password  && touched?.password) ? errors.password : 'hide'}`}</label>
        </div>
      </div>
  )
}

export default PasswordTextField
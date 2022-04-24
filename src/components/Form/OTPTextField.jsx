function OTPTextField({ errors, touched, handleChange, handleBlur }) {
  return (
    <div className="m-1 w-full">
        <div className=" w-full relative flex items-center">
          <input type="tel" placeholder="Enter verification code" name="otp"
            onChange={handleChange('otp')}
            onBlur={handleBlur('otp')}
            className='mt-1 py-3 focus:outline-none focus:ring-2 focus:ring-inputblue bg-inputblue focus:bg-transparent w-full pl-8'
            required 
          />
        </div>
        <div className={`${(errors?.otp) ? "block" : 'hidev'}`} >
          <label className={`${(errors?.otp && touched?.otp) ? "text-red-500 text-sm" : 'text-transparent text-sm'}`}>
            {`${(errors?.otp  && touched?.otp) ? `${errors.otp}`.split(',')[0] : 'hide'}`}
          </label>
        </div>
      </div>
  )
}

export default OTPTextField
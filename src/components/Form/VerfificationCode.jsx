export default function VerificationCode({ errors, touched, handleChange, handleBlur }) {
  return (
    <div className="m-1 w-full">
        <div className=" w-full relative flex items-center">
          <input type="tel" placeholder="Verify" name="code"
            onChange={handleChange('code')}
            onBlur={handleBlur('code')}
            className='mt-1 py-3 focus:outline-none focus:ring-2 focus:ring-inputblue bg-inputblue focus:bg-transparent w-full pl-8'
            required 
          />
        </div>
        <div className={`${(errors?.code) ? "block" : 'hidev'}`} >
          <label className={`${(errors?.code && touched?.code) ? "text-red-500 text-sm" : 'text-transparent text-sm'}`}>
            {`${(errors?.code  && touched?.code) ? `${errors.code}`.split(',')[0] : 'hide'}`}
          </label>
        </div>
      </div>
  )
}
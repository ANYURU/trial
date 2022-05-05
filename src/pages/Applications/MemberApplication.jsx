import { useState } from "react"
import ApplicationPg1 from "./ApplicationPg1"
import ApplicationPg2 from "./ApplicationPg2"
import { Formik, Form }  from 'formik'
import { supabase } from '../../helpers/supabase'
import { useAuth } from '../../auth/AuthContext'
import { toast, ToastContainer } from 'react-toastify'

function MemberApplication() {
  const [ pageNumber, setPageNumber ] = useState(1)
  const initialValues = {
    fullname:'',
    dob:'',
    gender:'',
    present_address:'',
    email_address:'',
    phone_number:'',
    id_passport_number:'',
    marital_status:'',
    fathers_name:'',
    fathers_address:'',
    income_sources: {
      status:'',
      employed:{
        employers_name: '',
        employers_address:'',
        position:'',
        work_station:'',
        gross_monthly_income:'',
        appointment_date:'',
        payroll_number:'',
        source_of_income:''  
      }, 
      business: {
        business_name: '',
        business_address: '',
        business_location: '',
        other_income_sources: '',
      }
    },
    nominees: [
      {
        name:'',
        id:'',
        contact:'',
        dob:'',
        percentage:''
      }
    ],
    proposed_mode_of_remittances: {
      standing_order:false,
      direct_debit:false,
      date_effective: '',
      others: ''
    },
    proposed_monthly_contributions:'', 
    amount_in_words:''
  }  

  const { user } = useAuth()
  
  
  
  return (
    <>
      <ToastContainer />
      <Formik 
        initialValues={initialValues}
        onSubmit={async ( values ) => {
          const { data, error } = await supabase.from('profiles').update(values).eq('id', user.id)
          if(error) {
            console.log(error)
          } else {
            toast.success(`Sucessfully registered`, {position: "top-center"})
            console.log(data)
          }
        }}
      >
        {({values, errors, touched, handleChange, handleBlur}) => {
          return (
            <Form className='h-full'>
              <h1 className="mb-5 mt-2 font-bold uppercase">MemberShip Application</h1>
              <div className="flex bg-white p-6 min-h-full">
                  <div className='flex flex-grow flex-col min-h-full'>
                    {pageNumber === 1 &&
                      <ApplicationPg1 values={values} errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur}/>
                    }
                    {pageNumber === 2 &&
                      <ApplicationPg2 values={values} errors={errors} touched={touched} handleChange={handleChange} handleBlur={handleBlur}/>
                    }
                    <div className="flex-grow flex justify-between items-end">
                    {pageNumber === 1 && 
                        <div className='flex justify-end w-full'>
                          <input
                            type="submit"
                            value='Next'
                            className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                            onClick={() => {
                              setPageNumber(pageNumber + 1)
                            }}
                          />
                        </div>
                      }
        
                      {pageNumber === 2 &&
                      <div className=''>
                        <input
                          type="submit"
                          value='Previous'
                          className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                          onClick={(event) => {
                            event.preventDefault()
                            setPageNumber(pageNumber - 1)
                          }}
                        />
                      </div>
                      }
        
                      {pageNumber === 2 &&
                        <div className='flex justify-end w-full'>
                          <button 
                            type='submit'
                            className='outline outline-primary outline-2 text-white bg-primary px-4 py-1 rounded-lg cursor-pointer'
                          > submit </button>
                        </div>
                      }
                    </div>
                  </div>
              </div>
            </Form>)}}
      </Formik>
    </>
    )
  
}

export default MemberApplication
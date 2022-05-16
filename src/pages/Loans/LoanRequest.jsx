import { ApplicationPg1, ApplicationPg2, ApplicationPg3, ApplicationPg4, ApplicationPg5, ApplicationVerify } from "."
import { useState } from "react"
import { Formik, Form }  from 'formik'
import { supabase } from '../../helpers/supabase'
import { useAuth } from '../../auth/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import { useOutletContext, useNavigate } from "react-router-dom"

function LoanRequest() {
  const [ pageNumber, setPageNumber ] = useState(1)
  const [ profile, setProfile ] = useOutletContext()

  const initialValues = {
    position_in_sacco: profile?.user_role && profile?.user_role.roles.length ===1 ? 'member': '',
    postal_address: '',
    landline_number: '',
    marital_status: '',
    no_of_dependents: '',
    town: '',
    estate: '',
    street: '',
    house_no: '',
    ownership: '',
    years_spent: '',
    kin_name: '',
    kin_profession: '',
    kin_contact: '',
    spouse_name: '',
    spouse_profession: '',
    spouse_contact: '',
    employment_type: '',
    employer: '',
    employer_postal_address: '',
    employer_no: '',
    employer_designation: '',
    retirement_date: '',
    employment_type: '',
    business_type: '',
    years_of_operation: '',
    business_income: ''
  }  
  console.log(initialValues)

  const { user } = useAuth()
  const navigate = useNavigate()
  
  return (
    <div className='h-full'>
      <ToastContainer />
      <Formik
        initialValues={initialValues}
        onSubmit={async ( values ) => {
          // console.log(values)
        }}
      >
        {({values, errors, touched, handleChange, handleBlur}) => {
          return (
            <Form>
              <h1 className="mb-5 mt-2 font-bold uppercase">Loan Application</h1>
              <div className="flex bg-white p-6 min-h-full">
                <div className='flex flex-grow flex-col min-h-full'>
                  {pageNumber === 1 &&
                    <ApplicationPg1 profile={profile} handleChange={handleChange} />
                  }
                  {pageNumber === 2 &&
                    <ApplicationPg2 />
                  }
                  {pageNumber === 3 &&
                    <ApplicationPg3 />
                  }
                  {pageNumber === 4 &&
                    <ApplicationPg4 />
                  }
                  {pageNumber === 5 &&
                    <ApplicationPg5 />
                  }
                  {pageNumber === 6 &&
                    <ApplicationVerify />
                  }
                  <div className="flex-grow flex justify-between items-end">
                    {pageNumber !== 1 && pageNumber !== 6 &&
                    <div className=''>
                      <input
                        type="submit"
                        value='Previous'
                        className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                        onClick={() => {
                          setPageNumber(pageNumber - 1)
                        }}
                      />
                    </div>
                    }
                    {pageNumber !== 5 && pageNumber !== 6 &&
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
                    {pageNumber === 5 &&
                      <div className='flex justify-end w-full'>
                        <input
                          type="submit"
                          value='Submit'
                          className='outline outline-gray-500 outline-2 text-gray-500 px-4 py-1 rounded-lg cursor-pointer'
                          onClick={() => {
                            setPageNumber(pageNumber + 1)
                          }}
                        />
                      </div>
                    }
                  </div>
                </div>
                      </div>
            </Form>
          )
        }}
      </Formik>
      
    </div>
  )
}

export default LoanRequest
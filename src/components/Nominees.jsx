import { FieldArray, ErrorMessage } from "formik";
import { InputField } from "./Form/CustomInputField";
import { useEffect, useState } from "react";
import { supabase } from "../helpers/supabase";

export default function Nominee({ values, errors, touched, handleChange, handleBlur }) {
    const [ profiles,  setProfiles ] = useState([])

    useEffect(() => {
        getProfiles()
            .then(data => setProfiles(data))
            .catch(error => console.log(error))


    }, [])

    const getProfiles = async() => {
        const {data, error } = await supabase.rpc('get_member_profiles') 
    
        if(error) throw error
        return data
    }

    let { nominees } = values
    return (
        <div className='mb-3'>
            <h1 className='font-semibold'>Nominee Information</h1>
                <FieldArray
                    name="nominees"
                    render={(arrayHelpers) => ( 
                        <>
                            { values.nominees && values.nominees.length > 0 && (
                                values.nominees.map(({ nominee_id, percentage }, index) => (
                                    <div key={index} className='flex flex-wrap gap-5 mb-3 outline outline-1 rounded p-2'>
                                        <div className="flex flex-col w-56">
                                            <label className="text-sm">
                                                Select Member
                                            </label>
                                            <select
                                                name={`nominees[${index}][nominee_id]`}
                                                className="ring-1 ring-black rounded px-2 py-1 bg-white dark:bg-dark-bg-600 dark:text-secondary-text"
                                                onChange={(event) => {
                                                    values.nominees[index]["nominee_id"] = event.target.value
                                                    const [ member ] = profiles.filter(profile => profile.id === event.target.value)
                                                    values.nominees[index]["fullname"] = member.fullname
                                                    console.log(nominees)
                                                }}
                                                onBlur={handleBlur(nominee_id)}
                                            >
                                                <option value="">--Select Member--</option>
                                            {
                                                profiles && profiles.map(({fullname, id}, index) => {
                                                return  <option key={index} value={ id } className="capitalize">{ fullname }</option>
                                                })
                                            }
                                            </select>
                                            <ErrorMessage name={`nominees.${index}].nominee_id`}>{msg => <div className="error text-xs text-red-500">{msg}</div>}</ErrorMessage>
                                            
                                        </div>
                                        <InputField errors={errors} touched={touched} handleChange={handleChange}  handleBlur={handleBlur} reference={`nominees[${index}][percentage]`}  label="Percentage" placeholder="Enter percentage" defaultValue={percentage} type="number"/>
                                    </div>
                                ))
                            )}
                            <button
                                className='bg-primary text-white px-3 py-2 rounded m-2'
                                onClick={(event) => {
                                    event.preventDefault()
                                    arrayHelpers.push(
                                    { 
                                        nominee_id:'', 
                                        percentage:'',
                                        fullname: ''
                                    }
                                )}}
                            >
                                +
                            </button>
                            <button
                                className='bg-accent-red text-white px-3 py-2 rounded m-2'
                                onClick={(event) => {
                                    event.preventDefault()
                                    nominees.length > 2 && arrayHelpers.pop()
                                }}
                            >
                                -   
                            </button>
                        </>
                    )}
                />
                
        </div>
    )
}
import React from 'react'
import { useEffect, useState } from "react"
import { supabase } from "../../helpers/supabase"
import { FaEllipsisV } from 'react-icons/fa'
import { LoansContext } from "../../components"
import { LoanModal } from "../../components"
import { useOutletContext } from "react-router-dom"
import Loader from "../../components/Loader"
import moment from "moment"
import { generate_amortization_schedule } from '../../helpers/generateAmortizationSchedule'

function AmortizationSchedule({ amortization_schedule }) {
    const rate = 3;
  return (
    <div className='mb-3'>
        <h1 className='font-semibold my-3'>Amortization Schedule</h1>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                    <th className='px-6 py-4'>Date</th>
                    <th className='px-6 py-4'>Principal</th>
                    <th className='px-6 py-4'>Monthly Installment</th>
                    <th className='px-6 py-4'>{`Interest (${rate}%)`}</th>
                    <th className='px-6 py-4'>Amount Paid</th>
                    <th className='px-6 py-4'>Outstanding Balance</th>
                </tr>
            </thead>
            <tbody>
                {
                    amortization_schedule && amortization_schedule.map( ( monthly_summary, index) => {
                        const {month, principal, emi, interest, repayment_amount, outstanding_balance} = monthly_summary
                        return (
                            <tr key={index} className={`${index % 2 === 0 ? "bg-gray-50 dark:bg-dark-bg" : ""} hover:bg-gray-100 dark:hover:bg-dark-bg-600`}>
                                <td className="px-6 py-3">{month}</td>
                                <td className="px-6 py-3">{principal}</td>
                                <td className="px-6 py-3">{emi}</td>
                                <td className="px-6 py-3">{interest}</td>
                                <td className="px-6 py-3">{repayment_amount}</td>
                                <td className="px-6 py-3">{outstanding_balance}</td>
                            </tr>
                        )

                    } )
                }
            </tbody>
        </table>
        

    </div>
  )
}

export default AmortizationSchedule
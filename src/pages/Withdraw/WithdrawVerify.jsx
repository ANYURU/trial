import { Submit } from "../../components"
import { useOutletContext } from "react-router-dom"

export default function WithdrawVerify() {
  const [ profile, setProfile ] = useOutletContext()
  return (
    <div className='h-full'>
      <h1 className='mb-5 mt-2 font-bold uppercase dark:text-white'>Verify Withdraw</h1>
      <div className="flex bg-white dark:bg-dark-bg-700 dark:text-secondary-text p-6 min-h-full">
      <div className='flex flex-grow flex-col min-h-full'>
          <div className='mb-3'>
              <h1 className='font-semibold'>{profile?.fullname}'s withdraw Request Details</h1>
              <div className="outline outline-1 outline-gray-100 p-3">
                <div className="my-6">MemberID: {profile?.id}</div>
                <div className="my-6">Amount: UGX 20,000</div>
                <div className="my-6">Method of Withdraw: Bank</div>
                <div className="my-6">Account/Mobile Number: 0770566711</div>
              </div>
          </div>
          <div className="flex gap-10 justify-end items-center mt-3">
          <button
            type="submit"
            className='bg-accent-red inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            >Reject
          </button>
          <button
            type="submit"
            className='bg-green-600 inline-flex items-center justify-center  text-white text-base font-medium px-4 py-2'
            >Approve
          </button>
          </div>
      </div>
      </div>
    </div>
  )
}
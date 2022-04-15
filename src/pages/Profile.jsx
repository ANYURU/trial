import { MdEdit } from "react-icons/md"
import profileImg from '../assets/images/abudi.png'

function Profile() {
  return (
    <div className='h-full'>
      <h1 className="mb-5 mt-2 font-bold uppercase">Profile</h1>
      <div className="flex flex-col bg-white p-6 min-h-full">
        <div className='flex justify-between items-center mb-2'>
          <img src={profileImg} width={100} height={100} className='rounded-full' alt="profile" />
          <i className='text-white p-2 bg-primary rounded text-lg'><MdEdit /></i>
        </div>
        <div className='mb-3'>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>name</p>
            <div className='flex-grow flex'>
              <p className='font-bold'>Mutamba Abudi</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Telephone Number</p>
            <div className='flex-grow flex'>
              <p className='font-bold'>0772519722</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Email</p>
            <div className='flex-grow flex'>
              <p className='font-bold'>mutambaabudi@gmail.com</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Member Status</p>
            <div className='flex-grow flex'>
              <p className='font-bold bg-green-600 text-white px-3 py-1 rounded-md'>Active</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Marital Status</p>
            <div className='flex-grow flex'>
            <p className='font-bold'>Single</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Position in the SACCO</p>
            <div className='flex-grow flex'>
            <p className='font-bold'>Administrator</p>
            </div>
          </div>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Applicant's Personal Information</h1>
            <form action="" className='m-2'>
            <div className='flex flex-col gap-5'>
              <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Old Password</label>
                <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
              </div>
              <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>New Password</label>
                <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
              </div>
              <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Confirm Password</label>
                <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
              </div>
            </div>
            </form>
        </div>
        <div className='mb-3'>
            <h1 className='font-semibold'>Danger Zone</h1>
            <form action="" className='m-2 outline outline-1 p-2 rounded-md'>
            <h1>Self Termination</h1>
            <p>Self termination implies that you no longer subscribe to and therefore sieze being a member of Bweyogerere Tuberebumu sacco. If you’re sure that you want to terminate your membership, click terminate to terminate to proceed.</p>
            <div className='flex mt-1'>
              <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Old Password</label>
                <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
              </div>
            </div>
            <div className='w-full flex justify-end'>
              <input type='submit' value='Terminate' className='text-white bg-accent-red px-4 py-1 rounded-md uppercase' />
            </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default Profile
import { FaRegEdit } from "react-icons/fa"
import profileImg from '../assets/images/abudi.png'
import { ConfirmModal } from "../components"
import { useState } from "react"
import { useOutletContext } from "react-router-dom"

function Profile() {
  const [ popUp, setPopUp ] = useState(false)
  const [ editPop, setEditPop ] = useState(false)
  const [ profile ] = useOutletContext()

  return (
    <div className='h-full'>
      <h1 className="mb-5 mt-2 font-bold uppercase">Profile</h1>
      <div className="flex flex-col bg-white p-6 min-h-full">
        <div className='flex justify-between items-center mb-2'>
          <img src={profileImg} width={100} height={100} className='rounded-full' alt="profile" />
          <i className='text-white p-2 bg-primary rounded text-lg'
            onClick={() => setEditPop(true)}
          ><FaRegEdit /></i>
        </div>
        <div className='mb-3'>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>name</p>
            <div className='flex-grow flex'>
              <p className='font-bold'>{profile?.fullname}</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Telephone Number</p>
            <div className='flex-grow flex'>
              <p className='font-bold'>{profile?.phone_number}</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Email</p>
            <div className='flex-grow flex'>
              <p className='font-bold'>{profile?.email_address}</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Member Status</p>
            <div className='flex-grow flex'>
              <p className={`${profile?.member_status === 'active' ? 'bg-green-600' : 'bg-accent-red'} font-bold text-white px-3 py-1 rounded-md`}>{profile?.member_status}</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Marital Status</p>
            <div className='flex-grow flex'>
            <p className='font-bold'>{profile?.marital_status}</p>
            </div>
          </div>
          <div className='flex justify-between lg:w-8/12 sm:w-10/12 md:w-8/12'>
            <p className='w-6/12'>Position in the SACCO</p>
            <div className='flex-grow flex'>
            <p className='font-bold'>{profile?.saccoPosition}</p>
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
            <div className='m-2 outline outline-1 p-2 rounded-md'>
            <h1>Self Termination</h1>
            <p>Self termination implies that you no longer subscribe to and therefore sieze being a member of Bweyogerere Tuberebumu sacco. If you’re sure that you want to terminate your membership, click terminate to terminate to proceed.</p>
            <div className='flex mt-1'>
              <div className='flex flex-col w-56'>
                <label htmlFor="" className='text-sm'>Old Password</label>
                <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
              </div>
            </div>
            <div className='w-full flex justify-end'>
              <button className='text-white bg-accent-red px-4 py-1 rounded-md uppercase'
                onClick={() => setPopUp(true)}
              >Terminate</button>
              {popUp &&
                <ConfirmModal setPopUp={setPopUp}>
                  <h1 className="font-bold">Are you sure you want to terminate your account?</h1>
                  <p>If you terminate this account, you can’t recover it.</p>
                  <div className="flex justify-end gap-3 mt-3">
                    <button className="px-3 py-1 outline outline-1 outline-gray-500 rounded-md text-gray-500"
                      onClick={() => setPopUp(false)}
                    >Cancel</button>
                    <button className="bg-accent-red px-3 py-1 outline outline-1 outline-accent-red rounded-md text-white">Terminate</button>
                  </div>
                </ConfirmModal>
              }
              {editPop &&
                <ConfirmModal setPopUp={setEditPop}>
                  <h1 className="font-bold">Edit</h1>
                  <div className='mb-3 flex flex-wrap gap-3'>
                    <div className='flex flex-col'>
                      <p>name</p>
                      <div className='flex-grow flex'>
                        <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <p>Date of Birth</p>
                      <div className='flex-grow flex'>
                        <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="">Gender</label>
                      <div className="flex gap-3">
                        <div className="flex gap-2">
                          <input type="radio" value='Male' name="gender" id="" />
                          <label htmlFor="">Male</label>
                        </div>
                        <div className="flex gap-2">
                          <input type="radio" value='Female' name="gender" id="" />
                          <label htmlFor="">Female</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mb-3 flex flex-wrap gap-3'>
                    <div className='flex flex-col lg:w-8/12 sm:w-10/12 md:w-8/12'>
                      <p className='w-6/12'>Email Address</p>
                      <div className='flex-grow flex'>
                        <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <p className='w-6/12'>Phone Number</p>
                      <div className='flex-grow flex'>
                        <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <p>ID/ Passport Number</p>
                      <div className='flex-grow flex'>
                        <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
                      </div>
                    </div>
                  </div>

                  <div className='mb-3 flex flex-wrap gap-3'>
                    <div className='flex flex-col'>
                      <p>Present Address</p>
                      <div className='flex-grow flex'>
                        <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <p>Marital Status</p>
                      <div className='flex-grow flex'>
                        <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
                      </div>
                    </div>
                  </div>

                  <div className='mb-3 flex flex-wrap gap-3'>
                    <div className='flex flex-col'>
                      <p>Father's Name</p>
                      <div className='flex-grow flex'>
                        <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      <p>Father's Address</p>
                      <div className='flex-grow flex'>
                        <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
                      </div>
                    </div>
                  </div>

                  <div className='mb-3 flex flex-wrap gap-3'>
                    <div className='flex flex-col'>
                      <p>Upload Photo</p>
                      <div className='flex-grow flex'>
                        <input type="file" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
                      </div>
                    </div>
                  </div>

                  <div className='mb-3 flex flex-wrap gap-3'>
                    <div className='flex flex-col'>
                      <p>Enter password to save changes</p>
                      <div className='flex-grow flex'>
                        <input type="text" name="" id="" placeholder='Old Password' className='ring-1 ring-black rounded px-2 py-1' />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-3">
                    <button className="bg-primary px-3 py-1 outline outline-1 outline-primary rounded-md text-white">Save</button>
                  </div>
                  
                </ConfirmModal>
              }
            </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
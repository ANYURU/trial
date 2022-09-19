import { useState, useEffect } from 'react'
import { BsChevronDoubleUp } from 'react-icons/bs'
import {BiArrowBack } from 'react-icons/bi'
import {BsChevronDoubleDown} from 'react-icons/bs'
import {HiOutlineSearch} from 'react-icons/hi'
import { supabase } from '../../helpers/supabase'

function Chat() {

    const [ collapse, setCollapse ] = useState(false)
    const [ showChats, setShowChats ] = useState(false)
    const [ chatSelected, setChatSelected ] = useState(false)
    const [ members, setMembers ] = useState([
        "David Derrick",
        "Enoch William",
        "Anyuru Egwang",
        "Kizito William",
        "Henry David",
        "Ssemugenyi George",
        "Nakitto Rebecca",
        "Dorcas Diana"
    ])

    const [ selectedMember, setSelectedMember ] = useState('')
    const [ filter, setFilter] = useState("")

    useEffect(() => {

    }, [])

  return (
    <div className='absolute bottom-0 right-10 rounded-md shadow-lg'>
        <div className={`bg-white  w-96 rounded-t-xl border-t flex flex-col justify-between`}>
            <div className={`flex justify-between p-1 py-2 border-b-[1px] items-center`}>
                <div className='pl-2 justify-center items-center flex h-full gap-1'>
                    {
                        collapse && chatSelected && 
                        <div 
                            className='h-8 w-8 hover:bg-stone-100 rounded-full flex justify-center items-center' 
                        >
                            <button 
                                clasName='font-bold text-xl'
                                onClick={() => {setChatSelected(false)}}
                            >
                                <BiArrowBack />
                            </button>
                        </div>
                    }
                    <div className='rounded-full border border-blue-500 h-10 w-10 capitalize flex justify-center items-center bg-pink-200 text-gray-700'>  
                        {/* This is where the avatar is to be place  */}
                        {chatSelected ? selectedMember.split(" ")[0][0] + selectedMember.split(" ")[1][0] : "Anyuru David Derrick".split(" ")[0][0] + "Anyuru David Derrick".split(" ")[1][0]}
                    </div>
                </div>
                <div className="rounded-full border-1 border-blue-200 h-full w-[h-full] flex justify-center items-center hover:bg-stone-100 opacity-80">
                    <button 
                        type="button"
                        onClick={() => {setCollapse(!collapse);}}
                        className='p-2 font-bold'
                    >
                        {collapse ? <BsChevronDoubleDown /> : <BsChevronDoubleUp />}
                    </button>
                </div>
            </div>
            <div className={`h-72 ${collapse ? "" : "hidden"} overflow-y-scroll scroll-smooth`}>
                {
                    chatSelected ?
                    <div>
                        {/* Display the messages */}
                        
                    </div>
                    :
                    <>
                       <div className="px-2 py-1 w-full flex">
                        <input 
                            type="text" 
                            className="border px-2 w-full focus:outline-none border-r-0 border-l-0 border-t-0 border-b-1 focus:border-primary" 
                            placeholder="Search member"
                            onChange={(event)=> setFilter(event.target.value)}
                        />
                       </div>
                        {
                            members && members.map((member, index) => 
                                <div 
                                    key={index} 
                                    className={`p-3 hover:border hover:border-t-1 hover:border-b-1 hover:border-r-0 hover:border-l-0 hover:bg-stone-50 ${member.indexOf(filter) > -1 ? "" : "hidden"}`}
                                    onClick={() => {setSelectedMember(member);console.log(selectedMember);console.log(chatSelected);setChatSelected(true)}}
                                >
                                    <div className='rounded-full border border-blue-500 h-10 w-10 capitalize flex justify-center items-center bg-pink-200 text-gray-700'>  
                                            {/* This is where the avatar is to be place  */}
                                            {member.split(" ")[0][0] + member.split(" ")[1][0]}
                                    </div>
                                </div>
                            )
                        }
                    </>
                }
            </div>
            <div className={`h-10 bottom-0 border w-full ${collapse ? "": "hidden"}`}>

            </div>
        </div>
    </div>
  )
}

export default Chat
import { useState, useEffect, useRef } from 'react'
import { BsChevronDoubleUp } from 'react-icons/bs'
import {BiArrowBack } from 'react-icons/bi'
import {BsChevronDoubleDown} from 'react-icons/bs'
import {FiSend} from 'react-icons/fi'
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
    const [ filter, setFilter ] = useState("")
    const [ conversation, setConversation ] = useState([
        "hello",
        "hi",
        "how're you doing?",
        `I'm okay`,
        `How're you doing?`,
        `When are you resuming school?`,
        `I do not know actually but I'll check and tell you then.`,
        `Okay I'll be waiting`,
        `Thank you.`,
        "how're you doing?",
        `I'm okay`,
        `How're you doing?`,
        `When are you resuming school?`,
        `I do not know actually but I'll check and tell you then.`,
        `Okay I'll be waiting`,
        `Thank you.`,
        'bingo',
        'samuel'
    ])
    const [message, setMessage] = useState("")

    const scrollToBottom = () => {
        bottom?.current?.scrollIntoView({ 'behavior': "smooth" })
    }

    

    const bottom = useRef(null)

    useEffect(() => {
        
        scrollToBottom()
    }, [conversation])

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
                                className='font-bold text-xl'
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
                    <>
                        <div className='border flex flex-col flex-1 h-60 overflow-y-scroll'>
                            {/* Display the conversation */}
                            {
                                conversation.map((message, index) => {   
                                    return (
                                        <div className={`flex ${index % 2 == 0 ? "justify-start" : "justify-end"} p-4`}>
                                            <div className={`${index % 2 == 0 ? "bg-blue-400 text-white" : "bg-stone-100"} w-44 px-2 py-1 rounded-md text-xs`}>
                                                {message}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {/* Scroll to the bottom to see the last message */}
                            <div ref={bottom}></div>
                        </div>
                        <div className={`absolute h-12 bottom-0 border w-full ${collapse ? "": "hidden"} ${!chatSelected ? "hidden border-none" : "bg-white"} flex justify-between p-3 items-center`}>
                            <input 
                                type="text" 
                                className={`border rounded-2xl w-56 outline-none pl-3 py-1 ${!chatSelected && "hidden"} flex-1 text-sm`}
                                onChange={(event) => {
                                    setMessage(event.target.value)

                                }}
                            />
                            <button 
                                className={`border rounded-full w-9 h-9 m-2 flex justify-center items-center ml-3 ${message?.length > 0 ? 'bg-primary text-white' : 'text-gray-400 '}`}
                                type="button"
                                disabled={message.length < 1}
                                onClick={()=> {
                                    setConversation([...conversation, message])
                                    setMessage("")
                                }}
                            > 
                                <FiSend />
                            </button>
                        </div>
                    </>
                    :
                    <>
                       <div className="px-2 py-1 w-full flex">
                        <input 
                            type="text" 
                            className="border px-2 w-full focus:outline-none border-r-0 border-l-0 border-t-0 border-b-1 focus:border-primary placeholder:text-xs text-sm placeholder:py-2" 
                            placeholder="Search member"
                            onChange={(event)=> setFilter(event.target.value)}
                        />
                       </div>
                        {
                            members && members.map((member, index) => 
                                <div 
                                    key={index} 
                                    className={`p-3 hover:border hover:border-t-1 hover:border-b-1 hover:border-r-0 hover:border-l-0 hover:bg-stone-50 ${member.toLowerCase().indexOf(filter.toLowerCase()) > -1 ? "" : "hidden"}`}
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
        </div>
    </div>
  )
}

export default Chat
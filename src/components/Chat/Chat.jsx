import { useState, useEffect, useRef } from 'react'
import { BsChevronDoubleUp } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'
import { BsChevronDoubleDown } from 'react-icons/bs'
import { FiSend } from 'react-icons/fi'
import { supabase } from '../../helpers/supabase'
import { io } from 'socket.io-client'
import { useCallback } from 'react'
// const socket = io.connect("http://localhost:3001")

function Chat({user, profile, members,  conversations, setConversations}) {


    const [ collapse, setCollapse ] = useState(false)
    const [ chatSelected, setChatSelected ] = useState(false)
    const [ selectedMember, setSelectedMember ] = useState('')
    const [ filter, setFilter ] = useState("")
    const {id: my_id} = user
    const [ selectedConversation, setSelectedConversation ] = useState([])
    const [ message, setMessage ] = useState("")
    const [ receiverId, setReceiverId] = useState("")
    const { fullname:senders_name } = profile
    const [ socket, setSocket ] = useState (
        io.connect(
            "http://localhost:3001",
            { query: {id: my_id}}
        )
    )

    const setRef = useCallback(node => node && node.scrollIntoView({ smooth: true }))

    useEffect(() => {

        setSocket(socket)
        socket.on("receive_message", (data) => {
            console.log(data)
            setSelectedConversation((selectedConversation) => [...selectedConversation, data])
        })

        return () => { 
            socket.off("receive_message")
        }
    }, [])

    const fetch_messages = async () => {
        const { data, error } = await supabase
            .from('messenger')
            .select()
            .or(`sender_id.eq.${my_id},receiver_id.eq.${my_id}`)

        if(error) throw error
        console.log(data)
        return data
    }

    const send_message = async (event) => {
        event.preventDefault()
        const conversation = { 
            sender_id: my_id,
            receiver_id: selectedMember.receiver_id,
            message,
            created_at: new Date()
                    .toISOString()
                    .toLocaleString("en-GB", { timeZone: "UTC" }),
            updated_at: new Date()
                    .toISOString()
                    .toLocaleString("en-GB", { timeZone: "UTC"
                 }) 
        }
        socket.emit("send_message", conversation)
        setMessage("")
        setSelectedConversation((selectedConversation) => [...selectedConversation, conversation])

        const { data, error } = await supabase
            .from('messenger')
            .insert({
                sender_id: my_id,
                receiver_id: selectedMember.receiver_id,
                message,
                created_at: new Date()
                        .toISOString()
                        .toLocaleString("en-GB", { timeZone: "UTC" }),
                updated_at: new Date()
                        .toISOString()
                        .toLocaleString("en-GB", { timeZone: "UTC" })
            })
            .single()

        if(error) throw error
        setMessage("")
    }

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
                        {chatSelected ? selectedMember?.fullname.split(" ")[0][0] + selectedMember?.fullname.split(" ")[1][0] : (senders_name?.length > 0 && senders_name.split(" ")[0][0] + senders_name.split(" ")[1][0]) || ""}
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
                        <div className='border flex flex-col flex-1 h-60 overflow-y-scroll justify-end'>
                            {/* Display the conversation */}
                            {
                                selectedConversation && ( selectedConversation?.length > 0 ? selectedConversation.map(({message, receiver_id}, index) => { 
                                    const lastMessage = selectedConversation.length - 1 === index
                                    return (
                                        <div 
                                            key={index} 
                                            className={`flex ${receiver_id ===  my_id ? "justify-start" : "justify-end"} px-4 py-0.5`}
                                            ref={lastMessage ? setRef() : null}
                                        >
                                            <div className={`${receiver_id === my_id ? "bg-[#EFF3F4]" : "bg-[#27427A] text-white"} w-44 px-2 py-1 rounded-md text-xs`}>
                                                {message}
                                            </div>
                                        </div>
                                    )
                                })
                                :
                                <span className='text-center text-xs'>
                                    No messages yet
                                </span>
                                )
                            }
                            {/* Scroll to the bottom to see the last message */}
                        </div>
                        <form className={`absolute h-12 bottom-0 border w-full ${collapse ? "": "hidden"} ${!chatSelected ? "hidden border-none" : "bg-white"} flex justify-between p-3 items-center`} id="message-form">
                            <input 
                                type="text" 
                                className={`border rounded-2xl w-56 outline-none px-3 py-1 ${!chatSelected && "hidden"} flex-1 text-xs`}
                                onChange={(event) => {
                                    setMessage(event.target.value)
                                }}
                                value={message}
                            />
                            <button 
                                className={`border rounded-full w-9 h-9 m-2 flex justify-center items-center ml-3 ${message?.length > 0 ? 'bg-primary text-white' : 'text-gray-400 '}`}
                                type="submit"
                                disabled={message.length < 1}
                                onClick={async (event) => {
                                    await send_message(event)
                                    setMessage("")
                                }}
                            > 
                                <FiSend />
                            </button>
                        </form>
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
                            members && members?.length > 0 && members.map((member, index) => 
                                <div 
                                    key={index} 
                                    className={`p-3 hover:border hover:border-t-1 hover:border-b-1 hover:border-r-0 hover:border-l-0 hover:bg-stone-50 flex gap-3 items-center ${member?.fullname.toLowerCase().indexOf(filter.toLowerCase()) > -1 ? "" : "hidden"}`}
                                    onClick={() => {
                                        // const selectedConversation = conversations && conversations.filter(message => (message.receiver_id === member.receiver_id && message.sender_id === my_id) || (message.sender_id === member.receiver_id && message.receiver_id === my_id))
                                        
                                        setChatSelected(true)
                                        setSelectedMember(member);
                                        setReceiverId(member.receiver_id)
                                        // setSelectedConversation(selectedConversation)
                                    }}
                                >
                                    <div className='rounded-full border border-blue-500 h-10 w-10 capitalize flex justify-center items-center bg-pink-200 text-gray-700'>  
                                            {/* This is where the avatar is to be place  */}
                                            {member?.fullname && member.fullname.split(" ")[0][0] + member?.fullname.split(" ")[1][0]}
                                    </div>
                                    <span className="capitalize text-sm">{member?.fullname.toLowerCase()}</span>
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
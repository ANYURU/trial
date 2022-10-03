import { useState, useEffect, useRef } from 'react'
import { BsChevronDoubleUp } from 'react-icons/bs'
import { BiArrowBack } from 'react-icons/bi'
import { BsChevronDoubleDown } from 'react-icons/bs'
import { FiSend } from 'react-icons/fi'
import { supabase } from '../../helpers/supabase'
import { io } from 'socket.io-client'
import { getFormattedDate } from '../../helpers/formatDate'
import { useAuth } from '../../auth/AuthContext'

function Chat({user, profile, members,  conversations}) {


    const [ collapse, setCollapse ] = useState(false)
    const [ chatSelected, setChatSelected ] = useState(false)
    const [ selectedMember, setSelectedMember ] = useState('')
    const [ filter, setFilter ] = useState("")
    const {id: my_id} = user
    const [ receiverId, setReceiverId] = useState("")
    const [ selectedConversation, setSelectedConversation ] = useState([])
    const [ message, setMessage ] = useState("")
    const { fullname:senders_name } = profile
    const { socket } = useAuth()
    const [ submitting, setSubmitting ] = useState(false)
    const [ onlineMembers, setOnlineMembers ] = useState([])
    const [ receiverName, setReceiverName] = useState("")
    const [ isTyping, setIsTyping ] = useState(null)

    

    // const setRef = useCallback(node => node && node.scrollIntoView({ smooth: true }))
    const bottomRef = useRef(null)
    const scrollToBottom = () => bottomRef?.current?.scrollIntoView({behavior: "smooth"})


    useEffect(() => {

        socket.on("receive_message", (data) => {
            setSelectedConversation((selectedConversation) => [...selectedConversation, data])
        })

        socket.on("receive_typing_status", (data) => {
            console.log("Typing: ", data)
            setIsTyping(data)
        })

        socket.on("online_users", (data) => {
            setOnlineMembers((onlineMembers) => [...new Set([...onlineMembers, ...data])])
            console.log([...new Set([...onlineMembers, ...data])])
        })

        socket.on("user_disconnected", (data) => {
            console.log("", data)
            setOnlineMembers(data)
            console.log("New online members",data)
        })

        scrollToBottom()

        return () => { 
            socket.off("receive_message")
        }
        
    }, [selectedConversation, receiverId])

    const update_message_seen = async () => {
        const { data, error } = await supabase.rpc('update_message_seen', {sender: my_id, receiver: receiverId})
        if(error) {console.log(error); throw error}
    }

    // const setOnlineStatus = () => {
    //     socket && socket.emit("add_online_user",  my_id)
    // }

    const send_message = async (event) => {
        event.preventDefault()
        setMessage("")
        setSelectedConversation((selectedConversation) => [...selectedConversation, conversation])
        setSubmitting(true)

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
        document.activeElement.blur()

        const { data, error } = await supabase
            .from('messenger')
            .insert(conversation)
            .single()


        if(error) throw error
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
                                onClick={() => {setChatSelected(false);setSelectedConversation([])}}
                            >
                                <BiArrowBack />
                            </button>
                        </div>
                    }
                    <div className='rounded-full border border-blue-500 h-10 w-10 capitalize flex justify-center items-center bg-pink-200 text-gray-700'>  
                        {/* This is where the avatar is to be place  */}
                        {chatSelected ? selectedMember?.fullname.split(" ")[0][0] + selectedMember?.fullname.split(" ")[1][0] : (senders_name?.length > 0 && senders_name.split(" ")[0][0] + senders_name.split(" ")[1][0]) || ""}
                    </div>
                    {console.log("Intended receiver: ", selectedMember)}
                    {console.log("Anticipated receiver: ", isTyping?.sender_id)}
                    {console.log("selectedMember: ", selectedMember.receiver_id)}
                    {console.log(onlineMembers)}

                    {/* <span>{isTyping && isTyping?.receiver_name }</span> */}
                    {((isTyping && isTyping.typing_status === true ) ? ( 
                        <span className="text-xs">
                            {
                                chatSelected ?
                                `${isTyping.sender_id === receiverId ? "typing..." : ``}`
                                : 
                                `${isTyping.receiver_name.split(" ")[0]} is typing.`
                            }
                        </span>
                    ) 
                    : 
                    onlineMembers && onlineMembers.find(member => member === selectedMember.receiver_id) && <span className="text-xs text-green-300"> online </span>)}
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
            <div className={`h-72 ${collapse ? "" : "hidden"}`}>
                {
                    chatSelected ?
                    <>
                        <div className='border flex flex-col flex-1 h-60 overflow-x-scroll justify-end relative'>
                            {/* Display the conversation */}
                            <div className='flex flex-col absolute max-h-full overflow-auto justify-center w-full overflow-y-scroll'>
                                {
                                    selectedConversation && ( selectedConversation?.length > 0 ? selectedConversation.map(({message, receiver_id, created_at}, index) => { 
                                        // const lastMessage = selectedConversation.length - 1 === index
                                        return (
                                            <div 
                                                key={index} 
                                                className={`flex ${receiver_id ===  my_id ? "justify-start" : "justify-end"} px-4 py-0.5`}
                                            >
                                                <div>
                                                    <div className={`${receiver_id === my_id ? "bg-[#EFF3F4]" : "bg-[#27427A] text-white"} w-44 px-2 py-1 rounded-md text-xs `}>
                                                        <span>{message}</span>
                                                    </div>
                                                    <span className="text-xs m-0 justify-end">{getFormattedDate(new Date(created_at))}</span>
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
                                <div ref={bottomRef}></div>
                            </div>
                            {/* Scroll to the bottom to see the last message */}
                        </div>
                        <form className={`absolute h-12 bottom-0 border w-full ${collapse ? "": "hidden"} ${!chatSelected ? "hidden border-none" : "bg-white"} flex justify-between p-3 items-center`} id="message-form">
                            <input 
                                type="text" 
                                id="message"
                                className={`border rounded-2xl w-56 outline-none px-3 py-1 ${!chatSelected && "hidden"} flex-1 text-xs`}
                                onChange={async (event) => {
                                    setMessage(event.target.value)
                                }}
                                onFocus={() => {
                                    socket.emit("send_typing_status", {typing_status: true, receiver_id: receiverId, receiver_name: receiverName, sender_id: my_id})
                                }}
                                onBlur={() => {
                                    socket.emit("send_typing_status", {typing_status: false, receiver_id:receiverId, receiver_name: receiverName, sender_id:my_id})
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
                    < div className="h-full overflow-y-scroll">
                       <div className="px-2 py-1 w-full flex ">
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
                                    onClick={async () => {
                                        const selectedConversation = await conversations && conversations.filter(message => (message.receiver_id === member.receiver_id && message.sender_id === my_id) || (message.sender_id === member.receiver_id && message.receiver_id === my_id))
                                        setSelectedConversation(selectedConversation)
                                        setChatSelected(true)
                                        setSelectedMember(member);
                                        setReceiverId(member.receiver_id)
                                        setReceiverName(member.fullname)
                                        socket.emit('check_online', member.receiver_id)
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
                    </div>
                }
            </div>
        </div>
    </div>
  )
}

export default Chat
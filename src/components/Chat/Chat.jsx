import { useState, useEffect, useRef } from 'react'
import { BsChevronDoubleUp } from 'react-icons/bs'
import {BiArrowBack, BiMessageSquare } from 'react-icons/bi'
import {BsChevronDoubleDown} from 'react-icons/bs'
import {FiSend} from 'react-icons/fi'
import { supabase } from '../../helpers/supabase'
import { useOutletContext } from 'react-router-dom'



function Chat({user, profile}) {

    const [ collapse, setCollapse ] = useState(false)
    // const [ showChats, setShowChats ] = useState(false)
    const [ chatSelected, setChatSelected ] = useState(false)
    const [ members, setMembers ] = useState([])

    const [ selectedMember, setSelectedMember ] = useState('')
    const [ filter, setFilter ] = useState("")
    const [ conversation, setConversation ] = useState([])
    const [ conversations, setConversations ] = useState([])
    const [ message, setMessage ] = useState("")
    const { fullname:senders_name } = profile
    const { id: my_id } = user
    const scrollToBottom = () => {
        bottom?.current?.scrollIntoView({ 'behavior': "smooth" })
    }

    const bottom = useRef(null)

    useEffect(() => {
        fetch_members().then(data => setMembers(data)).catch(error => console.log(error))
        fetch_messages().then(data => setConversations(data)).catch(error => console.log(error))
        
        scrollToBottom()
    }, [conversation])


    const fetch_messages = async () => {
        const { data, error } = await supabase
            .from('messenger')
            .select()
            .or(`sender_id.eq.${my_id},receiver_id.eq.${my_id}`)

        if(error) throw error
        return data
    }

    const send_message = async (event) => {
        event.preventDefault()

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
        setConversation([...conversation, data])
        setMessage("")
        document.getElementById('message-form').reset()
        
    }


    const get_conversation = ( id ) => {

        const filtered_conversation = conversations.filter(message => message.receiver_id === id && message.sender_id == my_id )
        setConversation(filtered_conversation)
    }

    const update_seen = async () => {
        const { data, error } = await supabase
            .from('messenger')
            .update(
                {
                    seen: true
                }
            )
            

        if(error) throw error
        console.log(data)
    }

    const fetch_members = async () => {
        const {data, error} = await supabase.rpc('possible_chats')

        if (error) console.log(error)
        return data
    }

    // const fetch_notifications = async () => {
    //     const {data, error} => 
    // }

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
                                conversations && conversation?.length > 0 && conversation.map(({message, receiver_id}, index) => {   
                                    return (
                                        <div key={index} className={`flex ${receiver_id ===  my_id ? "justify-start" : "justify-end"} px-4 py-0.5`}>
                                            <div className={`${receiver_id === my_id ? "bg-[#EFF3F4]" : "bg-[#27427A] text-white"} w-44 px-2 py-1 rounded-md text-xs`}>
                                                {message}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            {/* Scroll to the bottom to see the last message */}
                            <div ref={bottom}></div>
                        </div>
                        <form className={`absolute h-12 bottom-0 border w-full ${collapse ? "": "hidden"} ${!chatSelected ? "hidden border-none" : "bg-white"} flex justify-between p-3 items-center`} id="message-form">
                            <input 
                                type="text" 
                                className={`border rounded-2xl w-56 outline-none px-3 py-1 ${!chatSelected && "hidden"} flex-1 text-xs`}
                                onChange={(event) => {
                                    setMessage(event.target.value)
                                }}
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
                                        setChatSelected(true)
                                        setSelectedMember(member);
                                        get_conversation(member.receiver_id);

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
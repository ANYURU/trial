import { NavLink, } from 'react-router-dom'
import { menuData } from '../helpers/menuData'
import logo from '../assets/images/tube.png'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { supabase }from '../helpers/supabase'
import { IoTimeSharp } from 'react-icons/io5'



export default function Sidebar({ user }) {
  const [ show, setShow ] = useState(false)
  const [ selectedIndex, setSelectedIndex ] = useState(null)
  const [ lit, setLit ] = useState(null)
  const [ role, setRole ] = useState(null)
  
  const getRole = async () => {
      console.log('authenticated user')
      console.log(supabase.auth.user())
      console.log('user in the application')
      console.log(user)
    //   console.log(data)

        const {data, error } = await supabase.from('profiles').select('roles:user_role->roles').eq('id', user.id)
        if(error ) {
            console.log(error)
        } else {
            const [role] = data
            return role
        }
     
  }

  useEffect(() => {
    getRole()
    .then(data => {
        setLit(menuData[`${data.roles.includes("member") ? "member": "admin"}`].filter(item => item.sublinks).map(item => item.sublinks))
        console.log(data.roles)
        setRole(data?.roles.includes("member") ? "member": "admin")
    })
    .catch(error => console.log(error))
  }, [getRole])

  return (
    <div className='h-full w-64'>
        <div className='bg-white flex justify-center items-center mb-6'>
            <img src={logo} alt="tube" width={110} />
        </div>
        {role && menuData[`${role}`].map((item, index) => (
            <>
            <NavLink
                key={item.link}
                to={`/${item.link}`}
                className='flex justify-between mx-2 px-3 py-1 rounded-lg hover:bg-accent'
            >
                <div className='flex items-center'>
                    <i className='mx-2'>{item.icon}</i>
                    {item.label}
                </div>
                {index !== 0 && index < menuData[`${role}`].length - 1 && 
                    (show && index === selectedIndex 
                    ? <MdKeyboardArrowUp onClick={() => setShow(!show)} />
                    : <MdKeyboardArrowDown onClick={() => {setShow(!show);setSelectedIndex(index)}} />)
                }
            </NavLink>
            {lit && show && index === selectedIndex &&
                <div className='bg-accent mx-3 rounded-lg my-2 py-1 px-3 cursor-pointer'>
                    {
                        lit[index-1].map((item, index) => (
                            <NavLink
                                key={index}
                                to={`${item.link}`}
                                className='flex px-2 py-1 rounded-md'
                            >
                                {item.label}
                            </NavLink>
                        ))
                    }
                </div>
            }
            </>
        ))}

    </div>
  )
}
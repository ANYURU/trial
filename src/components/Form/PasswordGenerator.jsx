import React from 'react'
import { toast } from 'react-toastify'
import { MdContentCopy } from 'react-icons/md';


function PasswordGenerator({ password, setPassword }) {

    

    const generatePassword = (password_length) => {
        const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!^+%&=?#$*@"
        let password = ''
        const characterListLength = characters.length

        for( let count = 0; count < password_length; count++) {
            const characterIndex = Math.round(Math.random() * characterListLength)
            password += characters.charAt(characterIndex)
        }

        return password
    }

    const copyToClipboard = () => {
        const newTextArea = document.createElement('textarea')
        newTextArea.innerText = password;
        document.body.appendChild(newTextArea);
        newTextArea.select();
        document.execCommand('copy');
        newTextArea.remove();
    }

  return (
    <div>
        <p className='my-2'>
            Generate Password
        </p>
        <span className='bg-[#D7E4F1] px-5 py-2 my-2 rounded text-[#6C7279] ml-2'>{password}</span>
        <div className='flex h-15 my-2'>
            <button 
                type="button"
                className='bg-primary text-white px-3 py-2 rounded m-2 cursor-pointer text-sm h-15'
                onClick={async ( event ) => {
                    event.preventDefault()
                    const generatedPassword = generatePassword(12)
                    setPassword(generatedPassword)
                }}>Generate</button>
            <button 
                type="button"
                className='bg-primary text-white px-3 py-2 rounded m-2 cursor-pointer h-15'
                onClick={(event) => {
                    event.preventDefault()
                    if(!password) {
                        toast.error('Nothing to Copy', {position: "top-center"})
                    } else {
                        copyToClipboard()
                        toast.success('Password successfully copied to clipboard', {position:"top-center"})
                    }
                }}
            ><i className='text-lg'><MdContentCopy/></i></button> 
        </div>
    </div>
  )
}

export default PasswordGenerator
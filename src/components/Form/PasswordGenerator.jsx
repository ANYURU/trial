import React from 'react'
import { toast } from 'react-toastify'

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
        <button 
            type="button"
            onClick={async ( event ) => {
                event.preventDefault()
                const generatedPassword = generatePassword(12)
                setPassword(generatedPassword)
            }}>Generate Password</button>
        <button 
            type="button"
            onClick={(event) => {
                event.preventDefault()
                if(!password) {
                    toast.error('Nothing to Copy', {position: "top-center"})
                } else {
                    copyToClipboard()
                    toast.success('Password successfully copied to clipboard', {position:"top-center"})
                }
            }}
        >copy</button>
        <p>{password}</p>
    </div>
  )
}

export default PasswordGenerator
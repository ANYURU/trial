import axios from "axios";

/**
 * @function 
 * @name getOTP
 * @param {number} phoneNumber the phone 
 * @returns {Object} An object containing the msg if the API has successfully been reached. An error object containing the key error if the SMS service API has not been reached.
 */

export const getOTP = async (phoneNumber) => {
    try{
        const { data } = await axios.post(process.env.REACT_APP_GET_OTP, {
          phone_number: '+256' + phoneNumber.slice(1),
        })
        console.log(data)
        return data  
    } catch (error) {
        console.log(error)
        return  error
    }
}


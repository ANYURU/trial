import axios from "axios";

/**
 * @function 
 * @name getOTP
 * @param {number} phoneNumber the phone 
 * @returns {Object} An object containing the msg if the API has successfully been reached. An error object containing the key error if the SMS service API has not been reached.
 */

export const getOTP = async (phoneNumber) => {
    try{
        const { data } = await axios.post('http://localhost:5000/get-otp/', {
          phone_number: '+256' + phoneNumber.slice(1),
        })
        return data  
    } catch (error) {
        return  error
    }
}


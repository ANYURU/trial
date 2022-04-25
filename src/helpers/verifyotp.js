import axios from "axios";

/**
 * consuming the verification service 
 * @function verifyOTP
 * @param {string} phoneNumber 
 * @param {number} submittedOTP 
 * @returns {Object}
 */

export const verifyOTP = async (phoneNumber, submittedOTP) => {
    try {
        const { data } = await axios.post('http://localhost:5000/verify-otp/', {
          phone_number: '+256' + phoneNumber.slice(1),
          otp: submittedOTP
        })
        return data    
    } catch (error) {
        return error
    }
}
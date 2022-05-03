/**
 * consuming the verification service 
 * @function verifyOTP
 * @param {string} phoneNumber 
 * @param {number} submittedOTP 
 * @returns {Object}
 */

export const verifyOTP = async (phoneNumber, submittedOTP) => {
    return fetch("/api/verifyotp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({
            phone_number: `+256${phoneNumber.slice(1)}`, 
            otp: parseInt(submittedOTP)
        })
    })

   
}
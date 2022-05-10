/**
 * consuming the verification service 
 * @function verifyOTP
 * @param {string} phoneNumber 
 * @param {number} submittedOTP 
 * @returns {Object}
 */

export const verifyOTP = async (phoneNumber, otp, verification_key) => {
    return fetch("/api/verifyotp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({
            check: phoneNumber, 
            verification_key: verification_key,
            otp: otp   
        })
    }) 
}
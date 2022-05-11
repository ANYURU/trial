/**
 * consuming the verification service 
 * @function verifyOTP
 * @param {string} phoneNumber 
 * @param {string} password 
 * @returns {Object}
 */

 export const updatePassword = async ( phoneNumber, password ) => {
    return fetch("/api/updatepassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({
            phone_number: phoneNumber, 
            new_password: password  
        })
    }) 
}
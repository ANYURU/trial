/**
 * @function 
 * @name getOTP
 * @param {number} phoneNumber the phone 
 * @returns {Object} An object containing the msg if the API has successfully been reached. An error object containing the key error if the SMS service API has not been reached.
 */

export const getOTP = async (phoneNumber) => {
    const response = await fetch("/api/getotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({phone_number: `+256${phoneNumber.slice(1)}`})
    })

    return response
    
}


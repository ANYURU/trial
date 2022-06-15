/**
 * Creating a new user.
 * @function 
 * @name createUser
 * @param { string } phoneNumber 
 * @param { string } password
 * @returns { Object } 
 */

 export const createUser = async (phone_number, password, details, administrator) => {
    return fetch("/api/createmember", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({
            phone_number, 
            password, 
            details,
            administrator
        })
    }) 
}
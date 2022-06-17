/**
 * Creating a new user.
 * @function 
 * @name addMember
 * @param { string } phoneNumber 
 * @param { string } password
 * @returns { Object } 
 */

 export const addMember = async (phone_number, password, details, administrator) => {
    return fetch("/api/addmember", {
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
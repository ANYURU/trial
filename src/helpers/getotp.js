import axios from "axios";

export const getOTP = (phoneNumber) => {
    axios.post('http://localhost:5000/get-otp/', {
      phone_number: '+256' + phoneNumber.slice(1),
    })
    .then(response => response)
    .catch(error => error)  
}


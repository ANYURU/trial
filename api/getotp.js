// Importing helper modules 
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const generateOTP = require('./helpers/generateOTP');
const sendCodeToPhone = require('./helpers/sendCodeToPhone');
const addMinutesToDate = require('./helpers/addMinutesToDate')
const { encode } = require('./helpers/middleware')

// Creating an instance of the supabase client
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

export default async (req, res) => {
    try {
        const { phone_number, type } = req.body
        let phone_message

        
        if ( !phone_number ) {
            const response={"Status":"Failure","Details":"Phone Number not provided"}
            return res.status(400).json(response) 
        }
        if( !type ){
            const response={"Status":"Failure","Details":"Type not provided"}
            return res.status(400).json(response) 
        }
        
        // Generate OTP
        const otp = generateOTP()
        const now = new Date()
        const expiration_time = addMinutesToDate(now, 3)
    
        if( type ) {
            if( type == "VERIFICATION" ) {
                const message = require('./helpers/phoneVerification')
                phone_message = message( otp )
            }
            else if( type == "FORGOT PASSWORD") {
                const message = require('./helpers/phoneForget')
                phone_message = message(otp)
            }
            else if( type == "2FA") {
                const message = require('./helpers/phone2FA')
                phone_message = message(otp)
            }
            else {
                const response = {"Status": "Failure", "Details": "Incorrect Type Provided"}
                return res.status(400).send(response)
            }
        }

        const { data, error, status } = await supabase
            .from('otps')
            .insert(
                [
                    {
                        otp: otp,
                        updated_at: ((new Date()).toISOString()).toLocaleString('en-GB', { timeZone: 'UTC' }),
                        expiration_time: expiration_time
                    }
                ]
            )
            .single()
            
            if (error) {
                const response = { "Status": "Failure", "Details": error?.message }
                return res.status(status).json(response)
            } else {
                let details = {
                    "timestamp": now,
                    "check": phone_number,
                    "success": true,
                    "message": "OTP sent to user",
                    "otp_id": data.id
                }

                const encoded = await encode( JSON.stringify( details ) )
                
                sendCodeToPhone(phone_number, phone_message)
                    .then( data => {
                        return res.json( { "Status": "Success", "Details": encoded } ) 
                    })
                    .catch( error => {
                        return res.status(400).json( { "Status": "Failure", "Details": error } )
                    })
            }
    } catch (error) {
        const response = { "Status":"Failure", "Details": error}
        res.status(400).json(response)
    }
}
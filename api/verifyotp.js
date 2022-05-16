require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const { decode } = require('./helpers/_middleware')
const compareDates = require('./helpers/_compareDates')

export default async ( req, res ) => {
    const current_date = new Date()
    try {
        const { verification_key, otp, check} = req.body

        if(!verification_key) {
            const response = {"Status": "Failure", "Details": "OTP not provided"}
            return res.status(400).json(response)
        }

        if(!otp) {
            response = {"Status": "Failure", "Details":"Check not Provided"}
            return res.status(400).json(response)
        }

        let decoded

        try {
            decoded = await decode(verification_key)
        }
        catch( error ) {
            const response = {"Status":"Failure", "Details":"Bad Request"}
            return res.status(400).json(response)
        }

        let { otp_id, check: check_obj } = JSON.parse( decoded )

        if( check_obj !== check ) {
            const response={"Status": "Failure", "Details": "OTP was not sent to this particular email."}
            res.status(400).json(response)
        }

        try {
            const { data, error, status } = await supabase
                .from('otps')
                .select()
                .eq('id', otp_id)
                .single()

                if ( error ) {
                    const response = { "Status":"Failure", "Details": error }
                    return res.status( status ).json( response )
                    
                } else { 
                    const { expiration_time, verified, otp: otp_check } = data

                    if ( verified !== true ) {
                        const expiration_date = new Date(expiration_time)
                        
                        if ( compareDates( expiration_date, current_date ) === 1 ) {
                            if ( otp === otp_check ) {
                                const { error } = await supabase
                                    .from('otps')
                                    .update({ verified: true })
                                    .eq('id', otp_id)

                                if ( error ) {
                                    const response = { "Status":"Failure", "Details": error }
                                    return res.status(400).json( response )
                                } else {
                                    const response = { "Status":"Success", "Details":"OTP Matched", "Check": check }
                                    return res.status(200).json( response )
                                }
                            }
                            else {
                                const response = { "Status":"Failure", "Details": "OTP NOT Matched" }
                                return res.status(400).json( response )
                            }
                        }
                        else {
                            const response = { "Status":"Failure", "Details":"OTP Expired" }
                            return res.status(400).json( response )
                        }
                    } else {
                        const response = { "Status":"Failure", "Details": "OTP Already Used" }
                        return res.status(400).json( response)
                    }

                }
        } catch ( error ) {
            const response = { "Status": "Failure", "Details": error }
            return res.status(400).json(response)
        }

    } catch ( error ) {
        const response ={"Status":"Failure", "Details": error }
        return res.status(400).json(response)
    }

}
const { createClient } = require('@supabase/supabase-js');
const generateOTP = require('./helpers/generateOTP')
const sendCodeToPhone = require('./helpers/sendCodeToPhone')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

export default async (req, res) => {
    try{
        const { phone_number } = req.body
        // Generating the OTP
        console.log('api started')
        const otp = generateOTP()
        console.log(otp)
        const { error } = await supabase.from('otps').select('phone_number').eq('phone_number',phone_number)
        if( error ) {
            console.log('reached')
            console.log(res)
            res.json(error)
        } else {
            // Updating the verification code against the number.
            console.log('else started')
            const { error, data } = await supabase.from('otps').update({otp: otp, status: "valid"}).eq('phone_number', phone_number)
        
            if(error) {
                console.log('supa error')
                res.json(error)
            } else {
                console.log('else started')
                sendCodeToPhone(phone_number, otp)
                .then((data) => {
                    
                    res.status(200).json(data)
                })
                .catch(error => {
                    res.status(400).json(error)
                })
            }
        }
    } catch (error) {
        res.status(500).json({msg: "bad request"})
    }
}
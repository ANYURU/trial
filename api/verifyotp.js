require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

export default async (req, res) => {
    try {
        const { phone_number, otp: submittedOtp } = req.body
        if(phone_number && submittedOtp) {
            const { data, error } = await supabase.from('otps').select().eq('phone_number', phone_number) // I have learnt how to make this work eve
            if(error) {
                res.json(error)
            } else {
                if(data.length > 0) {
                    const [{ otp, status }] = data
                    console.log(data)
                    if ( status === 'valid' ) {
                        if ( otp === submittedOtp ) {
                            const { error, data } = await supabase.from('otps').update({ status: 'used' }).eq('phone_number', phone_number)
                            if(error) {
                                res.json(error)
                            } else {
                                console.log(data)
                                res.json({ msg: true })
                            }
                        } else {
                            res.json({error: 'invalid otp'})
                        }
                    } else {
                        res.json({error: 'expired otp'})
                    }
                } else {
                    res.json({msg: "no otp please regenerate otp."})
                }
            }
        } else {
            res.json({msg: 'missing phone number or otp'})
        }
    } catch (error) {
        res.status(500).json({msg: "bad request"})
    }   
}
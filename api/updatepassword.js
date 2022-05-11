const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async ( req, res ) => {
    try {
        const { phone_number, new_password } = req.body
        console.log(phone_number)
        console.log(new_password)

        if ( !phone_number ) {
            const response = { "Status":"Failure","Details":"Phone number not provided" }
            return res.status(400).json(response)
        }

        if ( !new_password ) {
            const response = { "Status":"Failure", "Details":"Password not provided" }
            return res.status(400).json(response)
        }

        const { data, error } = await supabase.from('users').select('id').eq('phone_number', phone_number).single()

        if ( error ) {
            const response = {"Status":"Failure", "Details":error?.message}
            return res.status(400).json(response)
        } else {
            const { id } = data
            const { error } = await supabase.auth.api.updateUserById(
                id,
                { password: new_password }
            )

            if ( error ) {
                const response = { "Status":"Failure", "Details":error?.message }
                return res.status(400).json(response)
            } else {
                const response = { "Status":"Success", "Details":"Password successfully updated" }
                return res.status(200).json(response)
            }    
        }
    
    } catch ( error ) {
        const response = { "Status":"Failure", "Details":error?.message }
        res.status(400).json(response)
    }
}
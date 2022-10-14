require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async ( req, res ) => {
    try {
        const { phone_number, password, details, administrator } = req.body

        if ( !phone_number ) {
            const response = { "Status":"Failure","Details": "Phone number not provided"}
            return res.status(400).json(response)
        }

        if ( !password ) {
            const response = { "Status": "Failure", "Details": "Password not provided"}
            return res.status(400).json(response)
        }

        if ( !details || details.length < 1 ) {
            const response = { "Status": "Failure", "Details": "Information not provided"}
            return res.status(400).json(response)
        }

        if ( !administrator ) {
            const response = { "Status": "Failure", "Details": "Administrator not provided"}
            return res.status(400).json(response)
        }

        const { data: user, error } = await supabase.auth.api.createUser({
            phone: phone_number,
            password: password,
            phone_confirm: true
        })

        if ( error ) throw error
        // Call the supabase function that inserts the customers data into the profiles and members tables respectively.
        // res.status(200).json(response)
        const { id } = user
       
        supabase.rpc('create_user', { member_id: id, details: JSON.stringify(details), administrator: administrator })
            .then( ({ data, error }) => {
                console.log(data)
                if( error ) throw error
                
                const response = { "Status": "Success", "Details": "Memeber successfully created"}
                res.status(400).json(response)  
            })
            .catch( error => {
                const response = {"Status":"Failure", "Details":error}
                return res.status(400).json(response)     
            })
    } catch ( error ){
        const response = {"Status":"Failure", "Details":error}
        return res.status(400).json(response)      
    }
}
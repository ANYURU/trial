import { supabase } from "./supabase"

export const getProfile = async ( user ) => {
    if ( user ) {
        try {
            const { data, error } = await supabase.from('_member_profiles').select().eq('id', user.id).single();
            if(error) {
                return { error: error }
            } else if( data ) {
                 return data;
            } 

        } catch (error) {
            console.log(error)
        }
           
    }
}
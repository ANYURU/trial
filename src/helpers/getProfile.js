import { supabase } from "./supabase"

export const getProfile = async ( user ) => {
    if ( user ) {
        const { data, error } = await supabase.from('member_profiles').select().eq('id', user.id).single();
        if(error) {
            return { error: error }
        } else {
            return data;
        }    
    }
}
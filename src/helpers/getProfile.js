import { supabase } from "./supabase"

export const getProfile = async ( user ) => {
    const { data, error } = await supabase.from('profiles').select().eq('id', user.id);
    if(error) {
        return { error: error }
    } else {
        const [ profile ] = data
        return profile;
    }    
}
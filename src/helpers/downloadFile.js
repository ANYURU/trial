import { supabase } from "./supabase"

/**
 * @function 
 * @name downloadFile
 * @param {string} path the path or file url to the file as retrieved from the database.
 * @param {string} storage_bucket The storage bucket in supabase where you want to store the file.
 * @returns {object} An object containing either and error message or an avatar url.
 */

export const downloadFile = async (path, storage_bucket) => {
    try {
        const { data, error } = await supabase.storage
            .from(storage_bucket)
            .download(path)

        if( error ) {
            return { error: error?.message }
        }
        
        const url = URL.createObjectURL(data)
        return {avatar_url: url}
    } catch ( error ) {
        return {error: error?.message}
    }
}
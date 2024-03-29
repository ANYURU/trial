import { supabase } from "./supabase"

/**
 * @function 
 * @name uploadAvatar
 * @param {string} file the file that has been selected in the form to be uploaded.
 * @param {string} storage_bucket the storage bucket where you want to store the image.
 * @returns {Object} An object containing either an error or some data.
 */

export const uploadFile = async ( file, storage_bucket ) => {
    const timestamp = new Date().getTime().toString()
    const fileExtension = file?.name.split('.').pop()
    console.log(file)

    try {
        const { error, data } = await supabase
            .storage
            .from(storage_bucket)
            .upload(`public/${timestamp}.${fileExtension}`, file)

        if( error ) {
            throw error
        } else {
            return data
        }

    } catch( error ) {
        return error 
    }

}
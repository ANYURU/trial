import { chartColors } from "../components/Charts/colors";
import { supabase } from "./supabase"

export const filterByStatus = (data, criteria, criteriaCheck) => criteriaCheck ? data.filter(member => member[criteria] === criteriaCheck) : data

export const searchByName = (data, searchText) => data.filter(member => member.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)

export const data = {
    maintainAspectRatio: true,
    responsive: true,
    datasets: [
      {
        data: [300, 50],
        backgroundColor: chartColors,
        hoverBackgroundColor: chartColors
      }
    ],
    labels: ["Total Shares", "My Shares"]
  };

export const data2 = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Performance",
        data: [33, 53, 85, 41, 44, 65, 34],
        fill: false,
        borderColor: "#27427A"
      }
    ]
  };

export  const options = {
    legend: {
      display: false,
      position: "right"
    },
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  };


/**
 * @function 
 * @name downloadImage
 * @param {string} path the path or file url to the file as retrieved from the database.
 * @param {string} storage_bucket The storage bucket in supabase where you want to store the file.
 * @returns {object} An object containing either and error message or an avatar url.
 */

export const downloadFile = async (path, storage_bucket) => {
    try {
        const { data, error } = await supabase.storage
            .from(storage_bucket)
            .download(path)
        if( error ) throw error
        
        const url = URL.createObjectURL(data)
        return {avatar_url: url}
    } catch ( error ) {
        return {error: error?.message}
    }
}
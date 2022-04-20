
export const filterByStatus = (data, criteria) => criteria ? data.filter(member => member.status === criteria) : data

// const searchByName = (data) => data.filter(row => row.clientDetails).filter(row => row.clientDetails.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
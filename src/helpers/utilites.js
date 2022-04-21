
export const filterByStatus = (data, criteria) => criteria ? data.filter(member => member.status === criteria) : data

export const searchByName = (data, searchText) => data.filter(member => member.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
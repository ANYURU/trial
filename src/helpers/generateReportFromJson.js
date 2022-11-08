const generate_loan_report = async(formattedData) => {

    // Process the csv
    const fields = Object.keys(formattedData[0])
    const replacer = (key, value) =>  value === null ? '' : value  
    let csv = formattedData.map(function(row){
      return fields.map(function(fieldName) {
        return JSON.stringify(row[fieldName], replacer)
      }).join(',')
    })
    csv.unshift(fields.join(',')) // add header column
    csv = csv.join('\r\n');
    

    // Downloading rg csv
    const filename = 'Bweyogerere Tuberebumu loan report' + new Date().toISOString().slice(0, 10) + '.csv';
  
    const link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
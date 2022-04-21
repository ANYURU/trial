import { chartColors } from "../components/Charts/colors";

export const filterByStatus = (data, criteria) => criteria ? data.filter(member => member.status === criteria) : data

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
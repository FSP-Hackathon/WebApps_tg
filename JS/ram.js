const ctx = document.getElementById("myChart_2").getContext("2d");
function fetchDataFromServer() {
  return fetch(
    "http://84.201.153.19:50000/metrica/metrics?duration=100000000&type=ram",
    {
      method: "GET",
      mode: "cors",
    }
  );
}
async function createChart() {
  response = await fetchDataFromServer();
  if (response == undefined) {
    console.log("wtf");
  }

  json = await response.json();

  labels = [];
  sysData = [];
  usedData = [];
  totalData = [];
  for (let i = 0; i < Math.min(20,json.data.length); i++) {
    date = new Date(json.data[i].timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();

    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    var time = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    labels.push(time);
    sysData.push(json.data[i].sys);
    usedData.push(json.data[i].used);
    totalData.push(json.data[i].total);
  }


  const config = {
    type: "line", 
    data: {
      labels: labels,
      datasets: [
        {
          label: "Sys RAM",
          data: sysData,
          borderColor: "rgba(255, 99, 132, 1)",
          fill: false,
        },
        {
          label: "Used RAM",
          data: usedData,
          borderColor: "rgba(54, 162, 235, 1)",
          fill: false,
        },
        {
          label: "Total RAM",
          data: totalData,
          borderColor: "rgba(68, 148, 74, 1)",
          fill: false,
        },
      ],
    },
  };

  const myChart_2 = new Chart(ctx, config);
}

createChart();

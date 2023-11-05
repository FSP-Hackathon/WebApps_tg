const ctx = document.getElementById("myChart_1").getContext("2d");
const res = await fetch("http://localhost:8888/myPath/", {
  method: "POST",
  mode: "cors",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

function fetchDataFromServer() {
  return fetch(
    "http://84.201.153.19:50000/metrica/db1?type=cpu&duration=3600",
    {
      method: "GET",
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
  usedData = [];
  freeData = [];
  totalData = [];
  for (let i = 0; i < json.data.length; i++) {
    date = new Date(json.data[i].timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();

    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();
    var time = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    labels.push(time);
    usedData.push(json.data[i].used);
    freeData.push(json.data[i].free);
    totalData.push(json.data[i].total);
  }

  // json.data[i].timestamp

  const config = {
    type: "line", // Тип графика
    data: {
      labels: labels,
      datasets: [
        {
          label: "Used CPU",
          data: usedData,
          borderColor: "rgba(255, 99, 132, 1)",
          fill: false,
        },
        {
          label: "Free CPU",
          data: freeData,
          borderColor: "rgba(54, 162, 235, 1)",
          fill: false,
        },
        {
          label: "Total CPU",
          data: totalData,
          borderColor: "rgba(68, 148, 74, 1)",
          fill: false,
        },
      ],
    },
  };

  const myChart_1 = new Chart(ctx, config);
}

createChart();

// Получаем ссылку на элемент canvas и создаем контекст для рисования
const ctx = document.getElementById("myChart_3").getContext("2d");

// Функция для получения данных с сервера (ваш серверный код)
function fetchDataFromServer() {
  return fetch(
    "http://84.201.153.19:50000/metrica/db1?type=disk&duration=3600",
    {
      method: "GET",
    }
  );
}

// Функция для построения графика
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

  // Конфигурация графика
  const config = {
    type: "line", // Тип графика
    data: {
      labels: labels,
      datasets: [
        {
          label: "Used DISK",
          data: usedData,
          borderColor: "rgba(255, 99, 132, 1)",
          fill: false,
        },
        {
          label: "Free DISK",
          data: freeData,
          borderColor: "rgba(54, 162, 235, 1)",
          fill: false,
        },
        {
          label: "Total DISK",
          data: totalData,
          borderColor: "rgba(68, 148, 74, 1)",
          fill: false,
        },
      ],
    },
  };

  // Создаем экземпляр графика
  const myChart_3 = new Chart(ctx, config);
}

createChart();

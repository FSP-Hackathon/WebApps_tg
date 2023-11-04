// Получаем ссылку на элемент canvas и создаем контекст для рисования
const ctx = document.getElementById("myChart").getContext("2d");

// Функция для получения данных с сервера (ваш серверный код)
function fetchDataFromServer() {
    return fetch("http://84.201.153.19:50000/metrica/ram", {
      method: "GET",
    });
}
// Функция для построения графика
async function createChart() {
    response = await fetchDataFromServer();
    if (response == undefined) {
      console.log("wtf")
    }

    json = await response.json()

    labels = []
    sysData = []
    usedData = []
    totalData = []
    for (let i = 0; i < json.data.length; i++) {
      labels.push(json.data[i].timestamp)
      sysData.push(json.data[i].sys)
      usedData.push(json.data[i].used)
      totalData.push(json.data[i].total)
    }

    // Конфигурация графика
    const config = {
      type: "line", // Тип графика
      data: {
          labels: labels,
          datasets: [{
              label: 'Sys RAM',
              data: sysData,
              borderColor: 'rgba(255, 99, 132, 1)',
              fill: false
          }, {
              label: 'Used RAM',
              data: usedData,
              borderColor: 'rgba(54, 162, 235, 1)',
              fill: false
          }, {
            label: 'Total RAM',
            data: totalData,
            borderColor: 'rgba(68, 148, 74, 1)',
            fill: false
        }]
      },
    };

    // Создаем экземпляр графика
    const myChart = new Chart(ctx, config);
}

createChart();
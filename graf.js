// Получаем ссылку на элемент canvas и создаем контекст для рисования
const ctx = document.getElementById("myChart").getContext("2d");

// Функция для получения данных с сервера (ваш серверный код)
function fetchDataFromServer() {
  // Здесь должен быть код для запроса данных с сервера
  // Пример:
  return fetch("http://84.201.153.19:50000/metrica/cpu")
    .then((response) => response.json())
    .then((data) => {
      const labels = data.map((item) => item.timestamp);
      const usedData = data.map((item) => item.used);
      const freeData = data.map((item) => item.free);
    });
}

// Функция для построения графика
async function createChart() {
    fetch("http://84.201.153.19:50000/metrica/cpu")
    .then((response) => response.json())
    .then((data) => {
      const labels = data.map((item) => item.timestamp);
      const usedData = data.map((item) => item.used);
      const freeData = data.map((item) => item.free);
        // Конфигурация графика
  const config = {
    type: "line", // Тип графика
    data: {
        labels: labels,
        datasets: [{
            label: 'Used CPU',
            data: usedData,
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
        }, {
            label: 'Free CPU',
            data: freeData,
            borderColor: 'rgba(54, 162, 235, 1)',
            fill: false
        }]
    },

  };

  // Создаем экземпляр графика
  const myChart = new Chart(ctx, config);
    });

}

createChart();
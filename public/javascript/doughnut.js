document.addEventListener('DOMContentLoaded',function(){
    const labels = ["Number of male", "Number of female"]
    const data = {
        labels: labels,
        datasets: [
            {
                data: doughnut,
                backgroundColor: [
                    '#1E90FF',
                    '#A52A2A',
                    
                ]
            }
        ],
        hoverOffset: 4
    };
    const config = {

        type: 'doughnut',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Gender',
                    font: {
                        size: 24
                    },
                    padding: 20
                },
                legend: {
                    display: true
                }
            }
        }

    };
    var myChart = new Chart(
        document.getElementById('doughnut'),
        config

    )
    }
    )
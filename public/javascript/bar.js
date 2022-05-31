document.addEventListener('DOMContentLoaded',function(){
    const labels = ["Number of PC","Number of MOBILE", "Number of CONSOLE"]
            const data = {
                labels: labels,
                datasets: [
                    {
                        data: bar,
                        backgroundColor: [
                            '#F08080',
                            '#FF8C00',
                            '#FFD700'
                        ]
                    }
                ]
            };
            const config = {
                type: 'bar',
                data: data,
                options: {
                    // indexAxis: 'y',
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: "",
                                font: {
                                    size: 18
                                },
                                padding: 20
                            }
                        }
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Devices',
                            font: {
                                size: 24
                            },
                            padding: 20
                        },
                        legend: {
                            display: false
                        }
                    }
                }
    
            };
            var myChart = new Chart(
                document.getElementById('bar'),
                config
    
            );
    }
    )
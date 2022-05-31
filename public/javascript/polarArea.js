document.addEventListener('DOMContentLoaded',function(){
    const labels = ["number of RPG", "number of A-RPG", "number of S-RPG", "number of MOBA", "number of STG", "number of FPS", "number of FPS", "number of TPS", "number of TCG", "number of ACT", "number of FTG"]
            const data = {
                labels: labels,
                datasets: [
                    {
                        data: polarArea,
                        backgroundColor: [
            
                            'rgb(255, 0, 0)',
                            'rgb(0, 0, 255)',
                            'rgb(60, 179, 113)',
                            'rgb(238, 130, 238)',
                            'rgb(77, 108, 90)',
                            'rgb(106, 90, 205)',
                            'rgb(255, 192, 71)',
                            'rgb(255, 192, 187)',
                            'rgb(90, 192, 187)',
                            'rgb(255, 190, 71)',
                            'rgb(77, 255, 90)'

                            
                          ]
                    }
                ]
            };
            const config = {
                type: 'polarArea',
                data: data,
                options: {
                   
                    plugins: {
                        title: {
                            display: true,
                            text: 'Games',
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
                document.getElementById('polarArea'),
                config
    
            );
    }
    )
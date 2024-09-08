function parseCSV(csvData) {
    const rows = csvData.split('\n').slice(1);
    const labels = [];
    const data = [];

    if (rows[rows.length - 1] === '') {
        rows.pop();
    }

    rows.forEach(row => {
        const [type, count] = row.split(',');
        labels.push(type);
        data.push(count);
    });

    return { labels, data };
}

// Fonction pour faire une requête GET à une API
function fetchFromAPI(endpoint) {
    return fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse la réponse en JSON
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

fetchFromAPI('http://127.0.0.1:5000/get-content-type-repartition')
    .then(response => response.text())
    .then(csvData => {
        const { labels, data } = parseCSV(csvData);
        const ctx = document.getElementById('contentTypeChart').getContext('2d');
        const contentTypeChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels,
                datasets: [{
                    data,
                    backgroundColor: ['#C4DFE6', '#66A5AD'],
                    borderColor: '#221F1F',
                    borderWidth: 5
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        });
    });

fetch('data/directorChart.csv')
    .then(response => response.text())
    .then(csvData => {
        const { labels, data } = parseCSV(csvData);
        const ctx = document.getElementById('directorChart').getContext('2d');
        const directorChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Nombre de films/séries',
                    data,
                    backgroundColor: '#D3C5E5'
                }]
            },
            options: {
                scales: {
                    y: {
                        ticks: {
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: '#6b6b6b'
                        },
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Nombre de films/séries',
                            color: '#8f8f8f'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: '#6b6b6b'
                        },
                        title: {
                            display: true,
                            text: 'Réalisateurs',
                            color: '#8f8f8f'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#FFFFFF'
                        }
                    }
                }
            }
        });
    });

fetch('data/countryChart.csv')
    .then(response => response.text())
    .then(csvData => {
        const { labels, data } = parseCSV(csvData);
        const ctx = document.getElementById('countryChart').getContext('2d');
        const countryChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Nombre de contenus',
                    data,
                    backgroundColor: '#F1D3B2'
                }]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: '#6b6b6b'
                        },
                        title: {
                            display: true,
                            text: 'Pays',
                            color: '#8f8f8f'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: '#6b6b6b'
                        },
                        title: {
                            display: true,
                            text: 'Nombre de contenus',
                            color: '#8f8f8f'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#FFFFFF'
                        }
                    }
                }
            }
        });
    });

fetch('data/releaseYearChart.csv')
    .then(response => response.text())
    .then(csvData => {
        const { labels, data } = parseCSV(csvData);
        const ctx = document.getElementById('releaseYearChart').getContext('2d');
        const releaseYearChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Nombre de contenus',
                    data,
                    backgroundColor: '#FFCE56',
                    borderColor: '#FFCE56',
                }]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: '#6b6b6b'
                        },
                        title: {
                            display: true,
                            text: 'Année',
                            color: '#8f8f8f'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: '#6b6b6b'
                        },
                        title: {
                            display: true,
                            text: 'Nombre de contenus',
                            color: '#8f8f8f'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#FFFFFF'
                        }
                    }
                }
            }
        });
    });

fetch('data/dateAddedChart.csv')
    .then(response => response.text())
    .then(csvData => {
        const yearSelect = document.getElementById('yearSelect');

        function filterByYear(year) {
            const { labels, data } = parseCSV(csvData);
            const filteredLabels = [];
            const filteredData = [];
            labels.forEach((label, index) => {
                if (label.startsWith(year)) {
                    filteredLabels.push(label);
                    filteredData.push(data[index]);
                }
            });
            return { filteredLabels, filteredData };

        }

        function updateChart(filteredLabels, filteredData, selectedYear) {
            const monthMapping = {
                '-01': 'Janvier',
                '-02': 'Février',
                '-03': 'Mars',
                '-04': 'Avril',
                '-05': 'Mai',
                '-06': 'Juin',
                '-07': 'Juillet',
                '-08': 'Août',
                '-09': 'Septembre',
                '-10': 'Octobre',
                '-11': 'Novembre',
                '-12': 'Décembre'
            };

            const mappedLabels = filteredLabels.map(label => {
                const monthSuffix = label.slice(-3);
                return monthMapping[monthSuffix] || label;
            });
            dateAddedChart.data.labels = mappedLabels;
            dateAddedChart.data.datasets[0].data = filteredData;
            dateAddedChart.data.datasets[0].label = `Nombre de contenus ajoutés en ${selectedYear}`;
            dateAddedChart.data.datasets[1].data = filteredData;
            dateAddedChart.data.datasets[1].label = `Nombre de contenus ajoutés en ${selectedYear}`;
            dateAddedChart.update();
        }

        yearSelect.addEventListener('change', () => {
            const selectedYear = yearSelect.value;
            const { filteredLabels, filteredData } = filterByYear(selectedYear);
            updateChart(filteredLabels, filteredData, selectedYear);
        });

        const { labels, data } = parseCSV(csvData);
        const ctx = document.getElementById('dateAddedChart').getContext('2d');
        const dateAddedChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    type: 'bar',
                    label: `Nombre de contenus ajoutés en ${yearSelect.value}`,
                    data,
                    backgroundColor: 'rgba(0, 123, 255, 0.6)',
                    borderWidth: 1
                }, {
                    type: 'line',
                    label: `Nombre de contenus ajoutés en ${yearSelect.value}`,
                    data,
                    borderColor: 'rgb(85,170,255)',
                    backgroundColor: 'rgba(85,170,255)',
                    fill: false,
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: '#6b6b6b'
                        },
                        title: {
                            display: true,
                            text: 'Mois',
                            color: '#8f8f8f'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#FFFFFF'
                        },
                        grid: {
                            color: '#6b6b6b'
                        },
                        title: {
                            display: true,
                            text: 'Nombre de contenus',
                            color: '#8f8f8f'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: '#FFFFFF'
                        }
                    }
                }
            }
        });
        const yearSelected = yearSelect.value;
        const { filteredLabels, filteredData } = filterByYear(yearSelected);
        updateChart(filteredLabels, filteredData, yearSelected);
    });
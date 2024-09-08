var contentTypeCSV = null;
var directorCSV = null;
var countryCSV = null;
var releaseYearCSV = null;
var dateAddedCSV = null;

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
            window.location.href = "loading.html";
        });
}

function jsonToCSV(jsonData) {
    const csvRows = [];
    const headers = Object.keys(jsonData[0]);
    
    csvRows.push(headers.join(','));

    jsonData.forEach(row => {
        const values = headers.map(key => {
            return row[key];
        });
        csvRows.push(values.join(','));
    });

    return csvRows.join('\n');
}

function downloadCSV(csvData, filename) {
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
}

fetchFromAPI('http://localhost:5005/get-content-type-repartition')
    .then(response => {
        contentTypeCSV = jsonToCSV(response);
        const labels = [];
        const data = [];

        response.forEach(element => {
            labels.push(element.type);
            data.push(element.count);
        });

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

fetchFromAPI('http://localhost:5005/get-director-repartition')
    .then(response => {
        directorCSV = jsonToCSV(response);
        labels = [];
        data = [];

        response = response.filter(element => element.director !== "réalisateur non défini");

        response.forEach(element => {
            labels.push(element.director);
            data.push(element.count);
        });

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

fetchFromAPI('http://localhost:5005/get-country-repartition')
    .then(response => {
        countryCSV = jsonToCSV(response);
        labels = [];
        data = [];

        response.forEach(element => {
            labels.push(element.country);
            data.push(element.count);
        });
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

fetchFromAPI('http://localhost:5005/get-year-repartition')
    .then(response => {
        releaseYearCSV = jsonToCSV(response);
        labels = [];
        data = [];

        response.forEach(element => {
            labels.push(element.release_year);
            data.push(element.count);
        });
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

fetchFromAPI('http://localhost:5005/get-added-datetime-distribution')
    .then(response => {
        response.forEach(element => {
            const date = new Date(element.year_month);
            element.year_month = date.toISOString().slice(0, 7);
        });

        const uniqueYears = [...new Set(response.map(item => item.year_month.slice(0, 4)))].sort();

        const yearSelect = document.getElementById('yearSelect');

        uniqueYears.forEach(year => {
            const option = document.createElement('option');
            option.value = year;
            option.textContent = year;
            yearSelect.appendChild(option);
        });
        
        dateAddedCSV = jsonToCSV(response);

        labels = [];
        data = [];

        response.forEach(element => {
            labels.push(element.year_month);
            data.push(element.count);
        });

        labels = labels.reverse();
        data = data.reverse();

        function filterByYear(year) {
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

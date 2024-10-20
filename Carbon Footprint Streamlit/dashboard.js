document.addEventListener('DOMContentLoaded', function() {
    const daysSelect = document.getElementById('days');
    const foodsSelect = document.getElementById('foods');
    const regionsSelect = document.getElementById('regions');
    const totalCO2ReducedElem = document.getElementById('total-co2-reduced');
    const avgCO2ReducedElem = document.getElementById('avg-co2-reduced');
    const dayCarbonChart = document.getElementById('day-carbon-chart');
    const regionCarbonChart = document.getElementById('region-carbon-chart');

    let data = [];

    // Load the dataset
    fetch('alldata.csv')
        .then(response => response.text())
        .then(csvText => {
            data = csvToJSON(csvText);
            populateFilters();
            filterData();
        });

    function csvToJSON(csv) {
        const lines = csv.split('\n');
        const result = [];
        const headers = lines[0].split(',');

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j].trim()] = currentline[j].trim();
            }
            result.push(obj);
        }
        return result;
    }

    function populateFilters() {
        const days = [...new Set(data.map(item => item.Day))];
        const foods = [...new Set(data.map(item => item.Food))];
        const regions = [...new Set(data.map(item => item.Region))];

        daysSelect.innerHTML = '';
        foodsSelect.innerHTML = '';
        regionsSelect.innerHTML = '';

        days.forEach(day => {
            const option = document.createElement('option');
            option.value = day;
            option.text = day;
            daysSelect.add(option);
        });

        foods.forEach(food => {
            const option = document.createElement('option');
            option.value = food;
            option.text = food;
            foodsSelect.add(option);
        });

        regions.forEach(region => {
            const option = document.createElement('option');
            option.value = region;
            option.text = region;
            regionsSelect.add(option);
        });
    }

    function filterData() {
        const selectedDays = Array.from(daysSelect.selectedOptions).map(option => option.value);
        const selectedFoods = Array.from(foodsSelect.selectedOptions).map(option => option.value);
        const selectedRegions = Array.from(regionsSelect.selectedOptions).map(option => option.value);

        const filteredData = data.filter(item =>
            selectedDays.includes(item.Day) &&
            selectedFoods.includes(item.Food) &&
            selectedRegions.includes(item.Region)
        );

        updateStats(filteredData);
        updateCharts(filteredData);
    }

    function updateStats(filteredData) {
        const totalCO2Reduced = filteredData.reduce((acc, item) => acc + parseFloat(item['Total Carbon Reductions']), 0);
        const avgCO2Reduced = totalCO2Reduced / 7;

        totalCO2ReducedElem.textContent = `(kg CO₂e/kg) ${totalCO2Reduced.toFixed(2)}`;
        avgCO2ReducedElem.textContent = `(kg CO₂e/kg) ${avgCO2Reduced.toFixed(2)}`;
    }

    function updateCharts(filteredData) {
        const groupByDays = filteredData.reduce((acc, item) => {
            acc[item.Day] = (acc[item.Day] || 0) + parseFloat(item['Total Carbon Reductions']);
            return acc;
        }, {});

        const groupByRegions = filteredData.reduce((acc, item) => {
            acc[item.Region] = (acc[item.Region] || 0) + parseFloat(item['Total Carbon Reductions']);
            return acc;
        }, {});

        Plotly.newPlot(dayCarbonChart, [{
            x: Object.keys(groupByDays),
            y: Object.values(groupByDays),
            type: 'bar',
            marker: { color: '#0083B8' }
        }], {
            title: 'Carbon Reductions Per Day',
            template: 'plotly_white'
        });

        Plotly.newPlot(regionCarbonChart, [{
            x: Object.keys(groupByRegions),
            y: Object.values(groupByRegions),
            type: 'bar',
            marker: { color: '#0083B8' }
        }], {
            title: 'Carbon Reductions Per Region',
            template: 'plotly_white'
        });
    }

    // Add event listeners to filter dropdowns
    daysSelect.addEventListener('change', filterData);
    foodsSelect.addEventListener('change', filterData);
    regionsSelect.addEventListener('change', filterData);
});
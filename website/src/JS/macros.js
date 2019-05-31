



function createChart()
{
    var ctx = document.getElementById("myChart").getContext('2d');
	var myChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Carbs(g)", "Fat(g)", "Protein(g)"],
        datasets: [{
            label: 'Calorie amount',
            data: [1, 1.5,  10],
            backgroundColor: [

                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }], 
            xAxes: [{
            	type: 'category'
            }]
        }
    }
});
}
$(function() {
    AOS.init();
});


const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
  ];

function createGraph(labelName, color, myData)
{
    var d = new Date()

    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [monthNames[d.getMonth()], monthNames[d.getMonth()+1], monthNames[d.getMonth()+2], 
            monthNames[d.getMonth()+3], monthNames[d.getMonth()+4], monthNames[d.getMonth()+5]],
            datasets: [{
                label: labelName,
                data: myData,
                backgroundColor:[color],
                /*
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                */
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            }
        }
    });
}


document.getElementsByTagName('button')[0].addEventListener("click", function(){
    var weights = [180, 185,190,186,180,170]
    createGraph("Weight (lbs)", 'rgba(54,162,235,0.7', weights)
})

document.getElementsByTagName('button')[1].addEventListener("click", function(){
    var calories = [3000,2000,3000,3250,4000,5000]
    createGraph("Calories", 'rgba(153, 102, 255, .7)', calories)
})

document.getElementsByTagName('button')[2].addEventListener("click", function(){
    var protein = [180,186,190,170,166,187,178]
    createGraph("Protein (g)", 'rgba(255, 159, 64, .7)', protein)
})

document.getElementsByTagName('button')[3].addEventListener("click", function(){
    createGraph("Carbs (g)", 'rgba(255, 99, 132, .7)')
})

document.getElementsByTagName('button')[4].addEventListener("click", function(){
    createGraph("Fat (g)", 'rgba(75, 250, 192, 0.7)')
})

document.getElementsByTagName('button')[5].addEventListener("click", function(){
    window.location.href="homepage.html"
})
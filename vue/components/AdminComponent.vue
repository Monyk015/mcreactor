<template>
    <div class="row card">
        <canvas id="postChart" width="400" height="400"></canvas>
    </div>
</template>

<script>
    import Chart from 'chart.js'
    let dateFormat = require('dateformat')

    export default
    {
        data(){
            return {
                commentCounts: [],
                postCounts: []
            }
        },
        mounted(){

            $.get('/stats', (res) => {
                this.postCounts = res.postCountByDay
                this.commentCounts = res.commentCountByDay
                console.log(this.postCounts)
                console.log(this.commentCounts)
                let postsData = {
                    labels: this.postCounts.map(count => dateFormat(count["date(`createdAt`)"], 'mmmm dS')),
                    datasets: [
                        {
                            label: "My First dataset",
                            fill: false,
                            lineTension: 0.1,
                            backgroundColor: "rgba(75,192,192,0.4)",
                            borderColor: "rgba(75,192,192,1)",
                            borderCapStyle: 'butt',
                            borderDash: [],
                            borderDashOffset: 0.0,
                            borderJoinStyle: 'miter',
                            pointBorderColor: "rgba(75,192,192,1)",
                            pointBackgroundColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: 5,
                            pointHoverBackgroundColor: "rgba(75,192,192,1)",
                            pointHoverBorderColor: "rgba(220,220,220,1)",
                            pointHoverBorderWidth: 2,
                            pointRadius: 1,
                            pointHitRadius: 10,
                            data: this.postCounts.map(count => {
                                return count["count('id')"]
                            }),
                            spanGaps: false,
                        }
                    ]
                }
                let ctx = document.getElementById("postChart").getContext('2d')
                let myChart = new Chart(ctx, {
                    type: 'line',
                    data: postsData,
                    options: {
                        responsive: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                            }]
                        }
                    }
                })
            })
        }
    }
</script>

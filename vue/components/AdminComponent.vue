<template>
    <div class="row card">
        <div class="container">
            <h2 class="center-align">Posts per day</h2>
            <canvas id="postChart" width="800" height="400"></canvas>
            <h2 class="center-align">Comments per day</h2>
            <canvas id="commentChart" width="800" height="400"></canvas>
            <h2 class="center-align">Tags net rating</h2>
            <canvas id="tagChart" width="800" height="400"></canvas>
            <h2 class="center-align">Tags average rating</h2>
            <canvas id="tagAvgChart" width="800" height="400"></canvas>
        </div>
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
                this.postCounts = this.fillDataWithEmptyDates(res.postCountByDay)
                this.commentCounts = this.fillDataWithEmptyDates(res.commentCountByDay)
                this.ratingCountByTag = res.ratingCountByTag
                this.ratingAvgByTag = res.ratingAvgByTag

                let postsData = {
                    labels: this.postCounts.map(count => dateFormat(count["date(`createdAt`)"], 'mmmm dS')),
                    datasets: [
                        {
                            label: "Posts",
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
                let postCtx = document.getElementById("postChart").getContext('2d')
                let postChart = new Chart(postCtx, {
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
                let commentsData = {
                    labels: this.commentCounts.map(count => dateFormat(count["date(`createdAt`)"], 'mmmm dS')),
                    datasets: [
                        {
                            label: "Comments",
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
                            data: this.commentCounts.map(count => {
                                return count["count('id')"]
                            }),
                            spanGaps: false,
                        }
                    ]
                }
                let commentCtx = document.getElementById("commentChart").getContext('2d')
                let commentChart = new Chart(commentCtx, {
                    type: 'line',
                    data: commentsData,
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

                let dynamicColors = function() {
                    let r = Math.floor(Math.random() * 255);
                    let g = Math.floor(Math.random() * 255);
                    let b = Math.floor(Math.random() * 255);
                    return "rgb(" + r + "," + g + "," + b + ")";
                }

                let tagData = {
                    labels: this.ratingCountByTag[0].map(count => count['name']),
                    datasets:[
                        {
                            backgroundColor: this.ratingCountByTag[0].map(() => dynamicColors()),
                            strokeColor: dynamicColors(),
                            pointColor: dynamicColors(),
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data:this.ratingCountByTag[0].map(count => count['rating'])
                        }
                    ]
                }

                let tagCtx = document.getElementById("tagChart").getContext('2d')
                let tagChart = new Chart(tagCtx, {
                    type: 'pie',
                    data: tagData
                })
                let tagAvgData = {
                    labels: this.ratingCountByTag[0].map(count => count['name']),
                    datasets:[
                        {
                            backgroundColor: tagData.datasets[0].backgroundColor,
                            strokeColor: tagData.datasets[0].strokeColor,
                            pointColor: tagData.datasets[0].pointColor,
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data:this.ratingAvgByTag[0].map(count => count['rating'])
                        }
                    ]
                }

                let tagAvgCtx = document.getElementById("tagAvgChart").getContext('2d')
                let tagAvgChart = new Chart(tagAvgCtx, {
                    type: 'pie',
                    data: tagAvgData
                })
            })

        },
        methods:{
            fillDataWithEmptyDates(countsArray)
            {
                for(let i = 0; i < countsArray.length - 1; i++)
                {
                    let currentDate = new Date(countsArray[i]["date(`createdAt`)"])
                    let nextDate = new Date(countsArray[i + 1]["date(`createdAt`)"])
                    if(+new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1) != +new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate()))
                        countsArray.splice(i + 1, 0, {
                            "date(`createdAt`)": new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1),
                            "count('id')": 0
                        })
                }
                return countsArray
            }
        }
    }
</script>

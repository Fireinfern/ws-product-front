import { Container, Typography } from "@material-ui/core";
import { Bar, Line } from 'react-chartjs-2';

import React from "react";
import moment from "moment";
import randomColor from "randomcolor";
import axios from "axios";

export default class BasicCharts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hourlyServices: {
                labels: [],
                datasets: []
            },
            dailyServices: {
                labels: [],
                datasets: []
            },
            dailyStats: {
                labels: [],
                datasets: []
            },
            hourlyStats: {
                labels: [],
                datasets: []
            }
        };

        
    }

    genHourlyServicesData(rawData) {
        let datasetObject = {
            label: 'Services By Hour',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        };
        let labels = []
        datasetObject.data = rawData.map(element => {
            let newHour = moment(element.date).add(element.hour, 'hours');
            labels.push(newHour.format('DD MM YYYY, h'));
            return element.events;
        }, this);
        this.setState({hourlyServices: {
            labels: labels,
            datasets: [datasetObject]
        }});
    }

    genDailyServicesData(rawData) {
        let datasetObject = {
            label: 'Services By Day',
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }
        let labels = [];
        datasetObject.data = rawData.map(element => {
            let newDay = moment(element.date).format('DD MM YYYY');
            labels.push(newDay);
            let newColor = randomColor({
                luminosity: 'dark',
                format: 'rgba',
                alpha: 0.4
            })
            datasetObject.backgroundColor.push(newColor);
            datasetObject.borderColor.push(newColor);
            return element.events;
        }, this);
        this.setState({
            dailyServices: {
                labels: labels,
                datasets: [datasetObject]
            }
        })
        //this.state.dailyServices.datasets.push(datasetObject);
    }

    genHourlyStatsData(rawData) {
        let datasetImpresions = {
            label: 'Impresions',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            data: [],
            yAxisID: 'y1'
        }
        let datasetClicks = {
            label: 'Clicks',
            backgroundColor: 'rgba(100, 100, 255, 0.2)',
            borderColor: 'rgba(100, 100, 255, 1)',
            borderWidth: 2,
            data: [],
            yAxisID: 'y2'
        }
        let datasetRevenue = {
            label: 'Revenue',
            backgroundColor: 'rgba(190, 99, 200, 0.2)',
            borderColor: 'rgba(190, 99, 200, 1)',
            borderWidth: 2,
            data: [],
            yAxisID: 'y3'
        }
        let labels = []
        rawData.forEach(element => {
            let newDay = moment(element.date).add(element.hour, 'hours').format('DD MM YYYY, h');
            labels.push(newDay);
            datasetImpresions.data.push(element.impressions);
            datasetClicks.data.push(element.clicks);
            datasetRevenue.data.push(element.revenue);
        }, this)
        this.setState({
            hourlyStats:{
                labels: labels,
                datasets: [datasetImpresions, datasetClicks, datasetRevenue]
            }
        })
    }

    genDailyStatsData(rawData) {
        let datasetImpresions = {
            label: 'Impresions',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            data: [],
            yAxisID: 'y1'
        }
        let datasetClicks = {
            label: 'Clicks',
            backgroundColor: 'rgba(100, 100, 255, 0.2)',
            borderColor: 'rgba(100, 100, 255, 1)',
            borderWidth: 2,
            data: [],
            yAxisID: 'y2'
        }
        let datasetRevenue = {
            label: 'Revenue',
            backgroundColor: 'rgba(190, 99, 200, 0.2)',
            borderColor: 'rgba(190, 99, 200, 1)',
            borderWidth: 2,
            data: [],
            yAxisID: 'y3'
        }
        let labels = [];
        rawData.forEach(element => {
            let newDay = moment(element.date).format('DD MM YYYY');
            labels.push(newDay);
            datasetImpresions.data.push(element.impressions);
            datasetClicks.data.push(element.clicks);
            datasetRevenue.data.push(element.revenue);
        }, this);
        this.setState({
            dailyStats: {
                labels: labels,
                datasets: [datasetImpresions, datasetClicks, datasetRevenue]
            }
        });
    }

    componentDidMount(){
        // https://ws-product-test.herokuapp.com/
        Promise.all([
            axios.get('https://ws-product-test.herokuapp.com/events/hourly'),
            axios.get('https://ws-product-test.herokuapp.com/events/daily'),
            axios.get('https://ws-product-test.herokuapp.com/stats/hourly'),
            axios.get('https://ws-product-test.herokuapp.com/stats/daily')
        ]).then((result) => {
            this.genHourlyServicesData(result[0].data);
            this.genDailyServicesData(result[1].data);
            this.genHourlyStatsData(result[2].data);
            this.genDailyStatsData(result[3].data);
        }).catch(error => {
            console.error(error);
        });
    }
    
    render() {
        const {hourlyServices, dailyServices, dailyStats, hourlyStats} = this.state;
        console.log(this.state);
        return (
            <>
                <Container style={{ marginTop: "10vh" }}>
                    <Typography variant="h3">
                        Basic Charts
                    </Typography>
                    <Line
                        data={hourlyServices} />
                    <Bar
                        data={dailyServices} />
                    <Line
                        data={dailyStats} />
                    <Line
                        data={hourlyStats} />
                </Container>
            </>
        );
    }
}
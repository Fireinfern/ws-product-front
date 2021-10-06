import { Container, Divider, Typography } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid'
import axios from "axios";
import moment from "moment";
import React from "react";

export default class BasicTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.URL = 'https://ws-product-test.herokuapp.com';
    }

    getHourlyStats() {
        axios.get(this.URL + '/stats/hourly')
            .then((results) => {
                let rows = results.data.map((stat, index) => {
                    return {
                        id: index,
                        date: moment(stat.date).format('DD MM YYYY'),
                        hour: stat.hour,
                        impressions: stat.impressions,
                        clicks: stat.clicks,
                        revenue: stat.revenue
                    }
                });
                this.setState({
                    HourlyStats: {
                        columns: [
                            { field: 'date', headerName: 'Date' },
                            { field: 'hour', headerName: 'Hour' },
                            { field: 'impressions', headerName: 'Impresions' },
                            { field: 'clicks', headerName: 'Clicks' },
                            { field: 'revenue', headerName: 'Revenue' }
                        ],
                        rows: rows
                    }
                });
                //console.log(this.state);
            }).catch(err => {
                console.error(err);
            });
    }

    getDailyStats() {
        axios.get(this.URL + "/stats/daily")
            .then((result) => {
                let rows = result.data.map((stat, index) => {
                    return {
                        id: index,
                        date: moment(stat.date).format('DD MM YYYY'),
                        impressions: stat.impressions,
                        clicks: stat.clicks,
                        revenue: stat.revenue
                    }
                });
                this.setState({
                    DailyStats: {
                        columns: [
                            { field: 'date', headerName: 'Date' },
                            { field: 'impressions', headerName: 'Impressions' },
                            { field: 'clicks', headerName: 'Clicks' },
                            { field: 'revenue', headerName: 'Revenue' }
                        ],
                        rows: rows
                    }
                })
            }).catch(err => {
                console.error(err);
            })
    }

    getHourlyEvents() {
        axios.get(this.URL + "/events/hourly")
            .then((result) => {
                let rows = result.data.map((event, index) => ({
                    id: index,
                    date: moment(event.date).format('DD MM YYYY'),
                    hour: event.hour,
                    events: event.events
                }));
                this.setState({
                    HourlyEvents: {
                        columns: [
                            { field: 'date', headerName: 'Date' },
                            { field: 'hour', headerName: 'Hour' },
                            { field: 'events', headerName: 'Events' }
                        ],
                        rows: rows
                    }
                });
            }).catch(err => { console.error(err) });
    }

    getDailyEvents() {
        axios.get(this.URL + "/events/daily")
            .then((result) => {
                let rows = result.data.map((event, index) => ({
                    id: index,
                    date: moment(event.date).format('DD MM YYYY'),
                    events: event.events
                }));
                this.setState({
                    DailyEvents: {
                        columns: [
                            { field: 'date', headerName: 'Date' },
                            { field: 'events', headerName: 'Events' }
                        ],
                        rows: rows
                    }
                });
            }).catch(err => { console.error(err) });
    }
    componentDidMount() {
        this.getHourlyStats();
        this.getDailyStats();
        this.getHourlyEvents();
        this.getDailyEvents();
    }

    render() {
        return (
            <>
                <Typography variant="h3" style={{marginTop: "10vh"}}>
                    Basic Tables
                </Typography>
                <Container style={{  display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    <div>
                        <Typography variant="h4">
                            Hourly Stats
                        </Typography>
                        <div style={{ height: 300, width: '100%' }}>
                            {this.state.HourlyStats &&
                                <DataGrid
                                    rows={this.state.HourlyStats.rows}
                                    columns={this.state.HourlyStats.columns} />
                            }
                        </div>
                    </div>
                    <div>
                        <Typography variant="h4">
                            Daily Stats
                        </Typography>
                        <div style={{ height: 300, width: '100%' }}>
                            {this.state.DailyStats &&
                                <DataGrid
                                    rows={this.state.DailyStats.rows}
                                    columns={this.state.DailyStats.columns} />
                            }
                        </div>
                    </div>
                    <div>
                        <Typography variant="h4">
                            Hourly Events
                        </Typography>
                        <div style={{ height: 300, width: '100%' }}>
                            {this.state.HourlyEvents &&
                                <DataGrid
                                    rows={this.state.HourlyEvents.rows}
                                    columns={this.state.HourlyEvents.columns} />
                            }
                        </div>
                    </div>
                    <div>
                        <Typography variant="h4">
                            Daily Events
                        </Typography>
                        <div style={{ height: 300, width: '100%' }}>
                            {this.state.DailyEvents &&
                                <DataGrid
                                    rows={this.state.DailyEvents.rows}
                                    columns={this.state.DailyEvents.columns} />
                            }
                        </div>
                    </div>
                </Container>
            </>
        );
    }
}
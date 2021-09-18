import { Container, Typography } from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid'
import axios from "axios";
import moment from "moment";
import React from "react";

export default class BasicTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    getHourlyStats() {
        axios.get('https://ws-product-test.herokuapp.com/stats/hourly')
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
                console.log(this.state);
            }).catch(err => {
                console.error(err);
            });
    }

    componentDidMount() {
        this.getHourlyStats();
    }

    render() {
        return (
            <>
                <Container style={{ marginTop: "10vh" }}>
                    <Typography variant="h3">
                        Basic Tables
                    </Typography>
                    <div style={{ height: 300, width: '100%' }}>
                        {this.state.HourlyStats &&
                            <DataGrid
                                rows={this.state.HourlyStats.rows}
                                columns={this.state.HourlyStats.columns} />
                        }
                    </div>
                </Container>
            </>
        );
    }
}
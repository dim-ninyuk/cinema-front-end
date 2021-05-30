import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from '@material-ui/core/Paper';
import {
    ArgumentAxis,
    ValueAxis,
    Chart,
    LineSeries,
} from '@devexpress/dx-react-chart-material-ui';

export default function Statistics() {
    const [data, setData] = useState(
        [
            {
                argument: null,
                value: 0,
            }
        ]
    );
    const [allsessions, setAllSessions] = useState([]);
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:8000/" + "sanctum/csrf-cookie").then(
            (response) => {
                axios
                    .get("http://localhost:8000/api/admin-sessions")
                    .then(
                        (response) => {
                            setAllSessions(response.data);
                            var state = [];
                            response.data.map((session, i) => {
                                var item = {
                                };
                                item.argument = session.date;
                                item.value = session.buyings.length;
                                state[i] = item;
                            })
                            console.log(state);
                            setData(state);
                        },
                    );
            })
    }, []);
    return (
        <Paper>
            <br />
            <br />
            <label>Buying tickets</label>
            <hr />
            <br />
            <br />
            <br />
            <Chart
                data={data}
            >
                <ArgumentAxis />
                <ValueAxis />

                <LineSeries valueField="value" argumentField="argument" />
            </Chart>
        </Paper>
    );
}
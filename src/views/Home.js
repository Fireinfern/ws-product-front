import React from "react";
import Typography from '@material-ui/core/Typography'
import { Container } from "@material-ui/core";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return(
            <>
                <Container style={{marginTop: "10vh"}}>
                    <Typography variant="h3">
                        Home
                    </Typography>
                </Container>
            </>
        );
    }
}
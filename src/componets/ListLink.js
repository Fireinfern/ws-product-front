import React from "react";
import { Link } from "react-router-dom";

export default function ListLink(props) {
    return (
        <Link to={props.ref}></Link>
    );
}
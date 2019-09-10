import React from "react";

export default function SimpleText(props) {
    return <div className="label">{props.content || "Yeay"}</div>;
}

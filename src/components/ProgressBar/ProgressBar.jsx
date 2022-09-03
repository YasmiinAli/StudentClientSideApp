import React from "react";
import { ProgressBar } from "react-bootstrap";

function Progressbar(props) {
    console.log(props)
        
        return(
                 <div className="progressBar ">
                <ProgressBar now={props.width} />
                </div>
        )
    }


export default Progressbar;
import React from "react";
import { Star, StarFill } from "react-bootstrap-icons";


export default ({rating}) => {



    const setRating = (n) => {
        let stars = [];
        for (let i = 0; i < n; i++) {
            stars.push(<StarFill key={i}/>);
        }
        for (let i = stars.length; i < 5; i++) {
            stars.push(<Star key={i}/>);
        }
        return stars;
    }
    return <>
    <div>{setRating(rating)}</div>
</>
}
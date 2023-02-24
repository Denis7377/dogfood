import React from "react";
import { Star, StarFill } from "react-bootstrap-icons";
import AuthorReview from "../AuthorReview/AuthorReview";
import Rating from "../Rating/Rating";

export default ({author, rating, created_at, text}) => {



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
        <AuthorReview 
        author={author} text={text}>
        </AuthorReview>
        <Rating rating={rating}></Rating>
        <div>{new Date(created_at).toLocaleString()}</div>
        
    </>
}
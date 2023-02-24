import React, {useContext} from "react";
import Ctx from "../../Ctx";
import style from "./style.module.css";


export default ({author, text}) => {
    const {authors} = useContext(Ctx);
    const person = authors.filter(a => a._id === author)[0];


    // const setRating = (n) => {
    //     let stars = [];
    //     for (let i = 0; i < n; i++) {
    //         stars.push(<StarFill key={i}/>);
    //     }
    //     for (let i = stars.length; i < 5; i++) {
    //         stars.push(<Star key={i}/>);
    //     }
    //     return stars;
    // }
    return <>
        <div className={style.userName}>{person && person.name || ""}</div>
        <img className={style.avatar} src={person && person.avatar} alt={author}></img>
        <div className={style.about}>{text}</div>
        {/* <div>{setRating(rating)}</div>
        <div>{new Date(created_at).toLocaleString()}</div> */}
    </>
}
import React from "react";
import Cards from "../components/Cards";
import Sqr from "../img/513-bg.png";
import Ads from "../components/Ads/ads";
import {Link} from "react-router-dom";

export default ({data}) => {
    return <>
    {/* ниже рпанозначные 2 строки, если тег а то есть перезагрузка страницы, если чз компонент Линк, то перезагрузкки нет */}
   {/* <a href="/catalog">Перейти в КАТАЛОГ</a> */}
   {/* <Link to="/catalog">Перейти в КАТАЛОГ</Link> */} 
   {/* реализовано ниже */}
        <div className="home-banner">
        <h1>Крафтовые <br /> лакомства для <br /> собак</h1>
        <p>Всегда свежие лакомства ручной <br /> работы с доставкой по Всему Миру</p>
        <button className="catalog__btn"> <Link to="/catalog">ПЕРЕЙТИ В КАТАЛОГ &#62;</Link></button>
        </div>
        <div className="bonus">
            {/* <h2 className="bonus-title" >Подарки за <br /> первый заказ!</h2> */}
            <img className="bonus-img_1" src={Sqr} alt="" />
        </div>
        <div className="cards-home">
        <div className="card-reklama"></div>
        <div className="card-reklama_2"></div>
            {data.map((el, i) => <Cards key={"card_" + i} 
           {...el}/>)}
        </div>
    </>
}
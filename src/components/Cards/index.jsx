import React from "react";
import "./style.css";
import classnames from "classnames";

export default ({name, pictures, price, discount, stock, wight, description}) => {
    const discount_price = Math.round(price - price * discount / 100);
    return <>
    <div className="card">
                    <div className="card__sticky card__sticky_type_top-left">
                        {!!discount && <span className="card__discount">
                            {`-${discount}%`}
                        </span>}
                    </div>
                        <img src={pictures} alt={description} className="card-image" />
                        <div className="card__desc">
                            {!!discount && <span className="card__old-price">{price} ₽</span>}
                            <span className={classnames("card__price", { "card__price_type_discount": !!discount })}>{discount_price}₽</span>
                            <span className="card__wight">{wight}</span>
                            <span className="card__wight">в наличии: {stock} шт</span>
                            <p className="card__name">{name}</p>
                        </div>
                </div >
        
    </> 
}
import React, { useState, useEffect, useContext } from "react";
import {useParams, Link, useNavigate, Navigate} from "react-router-dom";
import {Trash3} from "react-bootstrap-icons";
import Rating from "../components/Rating/Rating";
import Review from "../components/Review/review";
import Ctx from "../Ctx";
import style from "./style.module.css";
import classNames from "classnames";
import truck from "./img/truck.svg";
import quality from "./img/quality.svg";
import Button from "../components/Button/Button";

export default ({_id, discount, price, rating}) => {
    const [count, setCount] = useState(0);
    const discount_price = Math.round(price - price * discount / 100);
    const {id} = useParams();
    const [product, setProduct] = useState({});
    // По id товара получаются данные о товаре для отрисовки страницы с товаром
    const {api, PATH, user, setGoods, setUser} = useContext(Ctx);
    const {setBasket} = useContext(Ctx);
    const navigate = useNavigate();
    useEffect(() => {
        api.getProduct(id)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    }, []);
    const remove = () => { 
        api.delProduct(id) 
        .then(res => res.json()) 
        .then(data => { 
             
            if (!data.error){ 
                alert(data.name + " товар удален") 
                setGoods(prev => prev.filter(g => g._id !== data._id)) 
                navigate(`${PATH}catalog`); 
            } 
        } 
             
            ) 
         
         
        }


    const removeUser = () => {
        api.deleteReview(_id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data.error) {
                    setUser(prev => prev.filter(g => g._id !== data._id))
                    navigate(`${PATH}catalog`);
                }
            })
    }

    const buy = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setBasket(prev => {
            const test = prev.filter(el => el.id === _id)
            if (test.length) {
                return prev.map(el => {
                    if (el.id === _id) {
                        el.cnt++;
                    }
                    return el;
                })
            } else {
                return [...prev, {id: _id, cnt: 1}]
            }
        })
    }
    const choiseConfirm = () => { 
        if (window.confirm('Вы действительно хотите удалить товар?')) { 
           return remove() 
          }  
    }


    return <>
    
        <Link  to={PATH + "catalog"}><button className="btn">Назад</button></Link>
        <div className={style.productInfo}>
                    <span >Артикул: <b>2388907</b></span>
                    <Rating rating={rating}></Rating>
                </div>
                <div className={style.title} >{product.name}</div>
        <div className={style.product}>
                <div className={style.imgWrapper}>
                    <img className={style.img_product} src={product.pictures} alt={`Изабражение товара`} />
                </div>
                <div className={style.desc}>
                <span className={!!discount ? style.oldPrice : style.price}>{product.price} ₽ <p>за 100 грамм</p></span>
                    {!!discount && <span className={classNames(style.price, style['price_type_discount'])}>{discount_price}₽</span>}
                    <div className={style.btnWrap}>
                    <div className={style.btnLeft}>
                            <button className={style.minus}> - </button>
                            <span className={style.amount}>{count}</span>
                            <button className={style.plus}> + </button>
                        </div>
                        <button className="btn" onClick={buy}>В корзину</button>
                        {product && product.author && product.author._id === user._id && <button 
            onClick= {choiseConfirm}
            className="btn" 
        >
            <Trash3/>
        </button>}
                    </div>
                    <div className={style.delivery}>
                        <img src={truck} aria-hidden="true" />
                        <div className={style.right}>
                            <h3 className={style.name}>Доставка по всему Миру!</h3>
                            <p className={style.text}>Доставка курьером - <span className={style.bold}>от 399 ₽</span></p>
                            <p className={style.text}>Доставка в пункт выдачи - <span className={style.bold}>от 199 ₽</span></p>
                        </div>
                    </div>
                    <div className={style.delivery}>
                        <img src={quality} aria-hidden="true" />
                        <div className={style.right}>
                            <h3 className={style.name}>Гарантия качества</h3>
                            <p className={style.text}>Если вам не понравилось качество нашей продукции, мы вернем деньги, либо сделаем все возможное, чтобы удовлетворить ваши нужды</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.box}>
                <h3 className={style.title}>Описание</h3>
                <p>{product.description}</p>
                <h3 className={style.title}>Характеристики</h3>
                <div className={style.grid}>
                    <div className={style.naming}>Вес</div>
                    <div>1 шт. 120-200 грамм</div>
                    <div className={style.naming}>Цена</div>
                    <div> {product.price} ₽ за 100 грамм</div>
                    <div className={style.naming}>Польза</div>
                    <div className={style.description}>
                        <p>
                            Большое содержание аминокислот и микроэлементов оказывает
                            положительное воздействие на общий обмен веществ собаки.
                        </p>
                        <p>Способствуют укреплению десен и жевательных мышц.</p>
                        <p>
                            Развивают зубочелюстной аппарат, отвлекают собаку во время смены
                            зубов.
                        </p>
                        <p>
                            Имеет цельную волокнистую структуру, при разжевывание получается
                            эффект зубной щетки, лучше всего очищает клыки собак.
                        </p>
                        <p>Следует учесть высокую калорийность продукта.</p>
                    </div>
                </div>
            </div>
        <h2>Отзывы</h2>
        <div className="reviews">
            {product.reviews && product.reviews.length > 0 && product.reviews.map((el, i) =>
            <Review {...el} key={i}/>)}
        </div>
        
        <form className={style.form} >
            <h3>Оставить отзыв</h3>
            <textarea
                className={style.inputForm}
                type="text"
                id="text"
                placeholder="Ваш отзыв"
            />
            {/* <div>
                {errors?.text && <p className={style.errorMessage}>{errors?.text?.message}</p>}
            </div> */}
            <div className={style.rating}>
                <p>Ваша оценка</p>
                <Rating rating={rating}></Rating>
            </div>
            <div className={style.buttonForm}>
                <Button
                    type="secondary"
                >Отправить отзыв
                </Button>
            </div>
            <Button className="btn" onClick={removeUser}>Удалить отзыв</Button>
        </form>
    </>
}



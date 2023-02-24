class Api {
    constructor(token) {
        this.path = "https://api.react-learning.ru";
        this.group = "group-8";
        this.token = token;
    }
    signUp(body) { // регистрация
        body.group = this.group;
        return fetch(`${this.path}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
    signIn(body) { // авторизация
        return fetch(`${this.path}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
    getProducts() {
        return fetch(`${this.path}/products`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    getProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    addProduct(body) {
        return fetch(`${this.path}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        })
    }
    delProduct(id) {
        return fetch(`${this.path}/products/${id}`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    setLike(id, isLike) {
        return fetch(`${this.path}/products/likes/${id}`, {
            method: isLike ? "DELETE" : "PUT",
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    seleteLike() { // убрать лайк
        return fetch(`${this.path}/products/likes/:productId`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            } 
        })
    }
    
    
    
    passwordReset(){ // забsли пароль?
        return fetch(`${this.path}/password-reset`), {
            method: "POST",
            headers: {
                "authorization": `Bearer ${this.token}`
            },
            body: {
                'email' : 'a.brusentsev@gmail.com'}
        }
    }
    
    deleteProducts() { // удаление товара
        return fetch(`${this.path}/products/:productId`, {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            } 
        })
    }
    
    createReview(){ //добавить отзыв
        return fetch(`${this.path}/products/review/:productId`), {
            method: "PUT",
            headers: {
                "authorization": `Bearer ${this.token}`
            } 
        }
    }
    
    deleteReview(){ //удалить отзыв
        return fetch(`${this.path}/products/review/:postId/:reviewId`), {
            method: "DELETE",
            headers: {
                "authorization": `Bearer ${this.token}`
            } 
        }
    }
    
    
    setAllReviews(){ // получить все отзывы
        return fetch(`${this.path}/products/review/`), {
            method: "GET",
            headers: {
                "authorization": `Bearer ${this.token}`
            } 
        }
    }
    
    setIdReviews(){ // получить отзывы по конкретному товару
        return fetch(`${this.path}/products/review/:productId`), {
            method: "POST",
            headers: {
                "authorization": `Bearer ${this.token}`
            } 
        }
    }
    
    // Данные о пользователе
    getUsers() {
        return fetch(`${this.path}/v2/${this.group}/users`, {
            headers: {
                "authorization": `Bearer ${this.token}`
            }
        })
    }
    
    updUser(body, img = false) {
        return fetch(`${this.path}/v2/${this.group}/users/me${img ? "/avatar" : ""}`, {
            method: "PATCH",
            headers: {
                "authorization": `Bearer ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
    }
    
    }

export {Api};
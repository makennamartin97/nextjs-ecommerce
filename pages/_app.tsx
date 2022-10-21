import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {Stripe} from 'stripe'
import React,{useState} from 'react'
import _ from 'lodash'
import CartContext, {CartContextProps} from "../components/context/CartContext";

function MyApp({ Component, pageProps }: AppProps) {
  //manage cart items state
  const [items, setItems] = useState<Stripe.Price[]>([]);
  //remove fxn with items id as parameter
  const remove = (id:string) =>{
    //lodashes reject method 
    let i = _.reject(items, function (item) {
      return item.id === id;
    });
    setItems(i)
  }

  //passing in stripe price object as param
  const add = (product: Stripe.Price) => {
    //using lodashes union method to add the new item to the items array
    console.log('items',items)
    // let i = _.union(items, [product]);
    let i = [...items, product]
    setItems(i)
  }
//creating variable for context props
  const cartContext: CartContextProps = {
      items: items,
      add: add,
      remove: remove
  }

  return (
    //wrapping app component w the cart context provider and 
    //vpass in the context variable into the value prop
    <CartContext.Provider value={cartContext}>
        <Component {...pageProps} />
    </CartContext.Provider>
)


 
}

export default MyApp

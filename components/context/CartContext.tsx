import Stripe from 'stripe'
import {createContext} from 'react'

//adding type- items array, remove and add methods
export type CartContextProps = {
    items?: Stripe.Price[],
    remove?: (id:string) => void,
    add?:(p:Stripe.Price) => void
}
//initializing context props variable
const cartContextProps: CartContextProps = {};
//context method provided by array
const CartContext = createContext(cartContextProps)
//export cart context
export default CartContext;
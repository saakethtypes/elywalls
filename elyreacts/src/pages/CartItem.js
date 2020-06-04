import React,{useState,useContext} from 'react'
import { FormInput } from '../components/FormInput';
import { Poster } from '../components/Poster';
import { GlobalContext } from '../context/GlobalState';

export const CartItem = ({ci}) => {
    let { removeFromCart,setCartItemQuantity } = useContext(GlobalContext);
    const [quantity, setquantity] = useState(ci.quantity)
    const remfromcart = (e,cid) => {
        e.preventDefault()
        removeFromCart(cid)
      }
    const cq = (q) => {
        setCartItemQuantity(ci._id,Number(q),ci.item.price*Number(q))
    }
    return (
        <div >
             < Poster key={ci.item._id}  poster={ci.item} /> 
         <button onClick={e=>remfromcart(e,ci._id)}>Remove</button>
         <FormInput
                        type="number"
                        name="Quantity"
                        value={quantity}
                        inputProps={{
                            inputMode: "number",
                            onChange: e => {
                                setquantity(e.target.value)
                                cq(e.target.value)
                            }
                        }} />
          </div>
    )
}

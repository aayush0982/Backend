"use client"
import { createContext, useEffect, useState } from "react";
import { products } from "@/public/product_assets";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 50;
    const [showSearch, setshowSearch] = useState(false);
    const [cartItems, setcartItems] = useState({})
    const [cartitemCount, setcartitemCount] = useState(0)
    const [cartTotalAmount, setcartTotalAmount] = useState(0)
    // const [first, setfirst] = useState(second)

    const addtocart = async (item, size) => {
        if (!size) {
            alert("Please select a size")
            return;
        }
        let tempcartdata = structuredClone(cartItems);
        if (tempcartdata[item]) {
            if (tempcartdata[item][size]) {
                tempcartdata[item][size] += 1
            }
            else {
                tempcartdata[item][size] = 1
            }
        }
        else {
            tempcartdata[item] = {}
            tempcartdata[item][size] = 1
        }

        setcartItems(tempcartdata)
    }

    const cartItemCount = () => {
        let tempcount = 0

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                tempcount += cartItems[items][item]
            }
        }
        setcartitemCount(tempcount)
    }

    const updateQuantity = async(itemId,size,quantity)=>{
        let tempCartData = structuredClone(cartItems);
        tempCartData[itemId][size] = quantity;
        setcartItems(tempCartData)
    }

    const totalAmount = async ()=>{
        let tempamount = 0;
        for(const item in cartItems){
            let selectedproduct = products.find((p)=> p._id === item)
            for(const items in cartItems[item]){
                tempamount += selectedproduct.price * cartItems[item][items]
            }
        }
        setcartTotalAmount(tempamount)
    }


    useEffect(() => {
        cartItemCount()
        totalAmount()
        // console.log(cartItems)
        // console.log(cartitemCount)
    }, [cartItems])


    const value = { products, currency, delivery_fee, showSearch, setshowSearch, cartItems, addtocart, cartitemCount, updateQuantity, cartTotalAmount,setcartitemCount };
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider;
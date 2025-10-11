import React, { createContext,useEffect, useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

export const CartContext = createContext();
export const CartProvider = ({children}) => {
//    const loggedInUser = localStorage.getItem("loggedinuser")
    const [user, setUser] = useState(null);
    const[cartItems,setCartItems]=useState([])
    const[totalPrice,setTotalPrice]=useState(0)
     const loggedInUser = localStorage.getItem("loggedinuser");
 useEffect(() => {
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser);
      setUser(parsedUser);
      setCartItems(parsedUser.cart || []);
    }
  }, []);

  const saveCartToUser = async (updatedCart) => {
    setCartItems(updatedCart);
    if (user) {
    const updatedUser = { ...user, cart: updatedCart };
    localStorage.setItem("loggedinuser", JSON.stringify(updatedUser));
  }
   

    if (!user){ 
        toast.error("please login");
        
         return ;
    }
    try{
    await axios.patch(`http://localhost:3000/users/${user.id}`, {
      cart: updatedCart
    });
    setUser({ ...user, cart: updatedCart });
  }catch(err){
    toast.error("failed to update cart")
    console.log(err);
  }
}
    

  const addToCart=(product)=>{
     if (!user) {
      toast.error("Please login to add items");
      return;
    }

        const existing=cartItems.find(item=>item.productId===product.id)
        let updatedCart

        if(existing){ 
            if (existing.quantity >= product.stock) {
        toast.error("Cannot add more than stock available");
        return
    }
           updatedCart=cartItems.map(item=>item.productId===product.id ? {...item,quantity:item.quantity+1}:item )
            toast.success(`Quantity increased for ${product.name}`);
        }
        else{
            updatedCart = [...cartItems, {
        productId: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.image,
        stock:product.stock,
        quantity: 1
            }]
             toast.success(`${product.name} added to cart`);
        }
        saveCartToUser(updatedCart);

        }

        const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    saveCartToUser(updatedCart);
    toast.success("Item removed from cart");
  };

  const updateQuantity = (productId, type) => {
    const updatedCart = cartItems.map(item => {
      if (item.productId === productId) {
        let newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
        
        if ( newQty > item.stock) {
        toast.error("Exceeded limit");
        newQty = item.stock ; 
    }
        if (newQty < 1) newQty = 1;
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveCartToUser(updatedCart);
  };

    useEffect(()=>{
        const price=cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0);
        setTotalPrice(price)
    },[cartItems])

    

  return (
    <>
    <CartContext.Provider value={{
      user,
      cartItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      loadUserCart:setUser,
    }}>
      {children}
    </CartContext.Provider>

    </>
  )
}

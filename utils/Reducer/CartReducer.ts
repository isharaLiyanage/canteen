// "use client";
// import React, { createContext, useReducer, useContext, Dispatch, forwardRef } from "react";

// // Define the type for your product
// type Product = {
//   id: string;
//   name: string;
//   desc: string;
//   image: string[];
//   category: string;
//   price: number;
//   star: number | null;
//   tag: string[];
// };

// // Define the type for the items in the cart
// type CartItem = {
//   product: Product;
//   quantity: number;
// };

// // Define the type for the state of the cart
// type CartState = {
//   items: CartItem[];
// };

// // Define the actions that can be performed on the cart
// type CartAction =
//   | { type: "ADD_ITEM"; payload: CartItem }
//   | { type: "REMOVE_ITEM"; payload: string }; // Assuming payload is the ID of the item to remove

// // Create the context for the cart

// // Define the reducer function to update the cart state
// const cartReducer = (state: CartState, action: CartAction): CartState => {
//   switch (action.type) {
//     case "ADD_ITEM":
//       return {
//         items: [...state.items, action.payload],
//       };
//     case "REMOVE_ITEM":
//       return {
//         items: state.items.filter((item) => item.product.id !== action.payload),
//       };
//     default:
//       return state;
//   }
// };
// // export const CartContext = createContext<{
// //   state: CartState;
// //   dispatch: Dispatch<CartAction>;
// // }>({
// //   state: { items: [] },
// //   dispatch: () => null as any,
// // });
// // Create a custom hook to use the cart context in components

// // export const CartContext = createContext<{
// //   state: CartState;
// //   dispatch: Dispatch<CartAction>;
// // }>({
// //   state: { items: [] },
// //   dispatch: () => null as any,
// // });
// export const CartContext = React.createContext<any>(null);
// const initialState = { items: [] }
// export const useCart = () => useContext(CartContext);
// // Create a provider component to wrap your application and provide the cart context
// export const CartProvider = ({ children }: any) => {
// export const CartProvider = forwardRef(({ children }: any, ref) => {
//   const [state, dispatch] = useReducer(cartReducer, initialState);

//   return (
//     <CartContext.Provider>
//       {children}
//     </CartContext.Provider>
//   );
// });

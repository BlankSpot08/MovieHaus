import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Avatar } from "@mui/material";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import Head from "next/head";
import axios from "axios";
import UserNav from "../../../components/navigations/UserNav";

toast.configure();

const Cart = () => {
  const [getCart, setCart] = useState([])

  const router = useRouter();

  const created = () => {
    const cart = [
      {
        image_src: 'https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg',
        name: 'Joker',
        quantity: 1,
        unit_price: 12
      },
      {
        image_src: 'https://m.media-amazon.com/images/M/MV5BNzE4ZDEzOGUtYWFjNC00ODczLTljOGQtZGNjNzhjNjdjNjgzXkEyXkFqcGdeQXVyNzE5ODMwNzI@._V1_.jpg',
        name: 'Weathering With You',
        quantity: 2,
        unit_price: 625
      },
    ]

    setCart(cart)
  };

  const sumOfArray = (array, property) => {
    let i

    let sum = 0
    for (i = 0; i < array.length; i++) {
      sum += array[i][property]
    }

    return sum
  }

  const removeItem = (array, index) => {
    const startArray = array.slice(0, index)
    const endArray = array.slice(index + 1, array.length)

    const newCart = startArray.concat(endArray)
    setCart(newCart)
  }

  React.useEffect(() => {
    created()
  }, []);

  return (
    <div className=" h-screen">
      <Head>
        <title>Cart</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="h-full bg-pink-100">
        <UserNav />

        <div className="flex justify-center">
          <div className="flex flex-col w-full pt-8 text-gray-800 pin-r pin-y md:w-4/5 lg:w-4/5">
            <div className="flex-1">
              <table className="w-full text-sm lg:text-base" cellSpacing="0">
                <thead>
                  <tr className="h-12 uppercase">
                    <th className="hidden md:table-cell"></th>
                    <th className="text-left">Product</th>
                    <th className="lg:text-right text-left pl-5 lg:pl-0">
                      <span className="lg:hidden" title="Quantity">Qtd</span>
                      <span className="hidden lg:inline">Quantity</span>
                    </th>
                    <th className="hidden text-right md:table-cell">Unit price</th>
                    <th className="text-right">Total price</th>
                  </tr>
                </thead>
                <tbody>
                  {getCart.map((item, index) => (
                    <tr key={index}>
                      <td className="hidden pb-4 md:table-cell bg-red">
                        <a href={'/views/user/Movie?title=' + item.name}>
                          <img src={item.image_src} className="w-20 rounded" alt="Thumbnail" />
                        </a>
                      </td>
                      <td>
                        <a href="#">
                          <p className="mb-2 md:ml-4">{item.name}</p>
                          <form action="" method="POST">
                            <button className="text-gray-700 md:ml-4" onClick={(e) => {
                              e.preventDefault();

                              removeItem(getCart, index)
                            }}>
                              <small>(Remove item)</small>
                            </button>
                          </form>
                        </a>
                      </td>
                      <td className="justify-center md:justify-end md:flex mt-6">
                        <div className="w-20 h-10">
                          <div className="relative flex flex-row w-full h-8">
                            <input type="number" value={item.quantity}
                              className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />
                          </div>
                        </div>
                      </td>
                      <td className="hidden text-right md:table-cell">
                        <span className="text-sm lg:text-base font-medium">
                          {item.unit_price}₱
                        </span>
                      </td>
                      <td className="text-right">
                        <span className="text-sm lg:text-base font-medium">
                          {item.unit_price * item.quantity}₱
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr className="pb-6 mt-6" />
              <div className="my-4 mt-6 -mx-2 lg:flex">
                <div className="lg:px-2 lg:w-1/2">
                </div>
                <div className="">
                  <p className="mb-6 italic">Shipping and additionnal costs are calculated based on values you have entered</p>
                  <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Total
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      {sumOfArray(getCart, 'unit_price')}₱
                    </div>
                  </div>
                  <a href="#">
                    <button className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-pink-400 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                      <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z" /></svg>
                      <span className="ml-2 mt-5px">Procceed to checkout</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Cart;

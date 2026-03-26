import JustEatLogo from '../assets/Just-Eat-Logo.png'
import '../App.css'
import { useState, useEffect } from 'react';
import { getRestaurantApiPostcode } from '../api/restaurantsapi';
import type { RestaurantProps } from "../types/types";


const RestaurantList = ({ Restaurants}: RestaurantProps) => {

    // Debug
    ///useEffect(() => {
    ///    console.log("res",Restaurants)
    ///}, [Restaurants]);



    return (
        <>

            <div className="centered-div">
                <img src={JustEatLogo} className="framework" alt="React logo" width="250px" />
                <h1> Restaurant List</h1>

               <div className="cards">
                {Restaurants.map((restaurant, index) => (
                    <div className="restaurant-block" key={index}>
                        <h4 className="restaurant-title-text">{restaurant.name}</h4>
                        <h5 className="text-header">Cuisines </h5>
                         <ul>
                        {restaurant.cuisines.map((cuisine) => (
                            <li key={cuisine.name}>
                            <div className="card-text">{cuisine.name} </div>
                            </li>
                        ))}
                         </ul> 
                        <span className="card-text">Rating {restaurant.rating.starRating} </span>
                        <div className="text-header">Address </div>
                        <div className="card-text">{restaurant.address.firstLine} </div>
                        <div className="card-text">{restaurant.address.city} </div>
                        <div className="card-text">{restaurant.address.postalCode} </div>
                    </div>

                ))}
            </div>
            </div>

        </>
    )
}

export default RestaurantList

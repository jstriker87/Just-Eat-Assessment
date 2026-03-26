import JustEatLogo from '../assets/Just-Eat-Logo.png'
import '../App.css'
import { useState, useEffect } from 'react';
import { getRestaurantApiPostcode } from '../api/restaurantsapi';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

interface Address {
    firstLine: string;
    city: string;
    postalCode: string;
}


interface Restaurant {
    name: string,
    cuisines: { name: string }[];
    rating: string,
    address: Address,
};

interface RestaurantProps {
    Restaurants: Restaurant[];
}

const RestaurantList = ({ Restaurants }: RestaurantProps) => {

    useEffect(() => {
        console.log("res",Restaurants)
    }, [Restaurants]);


    return (
        <>

            <div className="centered-div">
                <img src={JustEatLogo} className="framework" alt="React logo" width="250px" />
                <h1> Restaurant List</h1>

                {Restaurants.map((restaurant, index) => (
                    <div className="restaurant-block" key={index}>
                        <h4 className="restaurant-title-text">{restaurant.name}</h4>
                        <h5 className="restaurant-title-text">Cuisines
                        {restaurant.cuisines.map((cuisine,key) => (
                            <div className="desc" key={key}>{cuisine.name} </div>
                        ))}
                        </h5>
                        <h5 className="desc">Rating {restaurant.rating}</h5>
                        <div className="desc">Address
                        <div className="desc">{restaurant.address.firstLine} </div>
                        <div className="desc">{restaurant.address.city} </div>
                        <div className="desc">{restaurant.address.postalCode} </div>
                        </div>
                    </div>

                ))}
            </div>

        </>
    )
}

export default RestaurantList

import JustEatLogo from '../assets/Just-Eat-Logo.png'
import '../App.css'
import { useState, useEffect } from 'react';
import { getRestaurantApiPostcode } from '../api/restaurantsapi';
import type { RestaurantProps } from "../types/types";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
const RestaurantList = ({ Restaurants, setShowSearch, showSearch }: RestaurantProps) => {


    const [cardIndex, setCardIndex] = useState<number | undefined>(undefined);
    const [hovered, setHovered] = useState(false)
    // Debug
    ///useEffect(() => {
    ///    console.log("res",Restaurants)
    ///}, [Restaurants]);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto'
    }, [hovered])

    return (
        <>

            <div className="centered-div">
                <img src={JustEatLogo} className="framework" alt="React logo" width="250px" />
                <h1> Restaurant List</h1>

                <RiArrowGoBackFill size={30}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={() => {
                        setShowSearch(true)

                    }}
                />

                {Restaurants.length > 0 ? (
                    <div className="cards">
                        {Restaurants.map((restaurant, index) => (
                            <div className="restaurant-block" key={index}

                                onPointerOver={() => {
                                    setCardIndex(index)
                                    setHovered(true)

                                }}
                                onPointerOut={() => setHovered(false)}

                            >

                                <h4 className={hovered && index == cardIndex ? "restaurant-title-text-hovered" : "restaurant-title-text-standard"}> {restaurant.name} </h4>
                                <h5 className={hovered && index == cardIndex ? "text-header-hovered" : "text-header-standard"}> Cuisines</h5>
                                <ul className="ul-card">
                                    {restaurant.cuisines.map((cuisine) => (

                                        <li className={hovered && index == cardIndex ? "li-card-hovered" : "li-card-standard"} key={cuisine.name}>
                                            <div className={hovered && index == cardIndex ? "card-text-hovered" : "card-text-standard"}> {cuisine.name} </div>
                                        </li>
                                    ))}
                                </ul>

                                <span className={hovered && index == cardIndex ? "card-text-hovered" : "card-text-standard"}> {'\u2b50'} Rating {restaurant.rating.starRating} </span>
                                <div className={hovered && index == cardIndex ? "text-header-hovered" : "text-header-standard"}> <FaLocationDot /> Address </div>
                                <div className={hovered && index == cardIndex ? "card-text-hovered" : "card-text-standard"}> {restaurant.address.firstLine}
                                < br />
                                {restaurant.address.city}
                                < br />
                                {restaurant.address.postalCode} </div>
                            </div>

                        ))}
                    </div>


                ) :
                    <span className='no-restaurants-message'>Sorry no restaurants were found</span>
                }
            </div>

        </>
    )
}

export default RestaurantList

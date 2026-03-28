import JustEatLogo from '../assets/Just-Eat-Logo.png'
import '../App.css'
import { useState, useEffect } from 'react';
import type { RestaurantProps } from "../types/types";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";


/**
 * RestaurantList: Shows a structured page of 10 restaurants using the results of the postcode search
 * @prop restaurants: The list of restaurants passed in from 'RestaurantSearch'
 * @prop setShowSearch: A boolean React StateAction to show the search page passed in from 'RestaurantSearch'
 */

const RestaurantList = ({ Restaurants, setShowSearch }: RestaurantProps) => {

    /**
     * Set useStates for variables used during the pages lifecylcc
     * @var cardIndex: The useState of the index of the card that the user currently is hovered over
     * @var showInvalidPostcodeMessage: If the invalid postcode message should be visible
     * The useEffect is used to change the mouse pointer when the user hovers over the back arrow
     */

    const [cardIndex, setCardIndex] = useState<number | undefined>(undefined);
    const [hovered, setHovered] = useState(false)

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
            {/* If 'Restaurants' contains at least one result then display the results in card using a map function. */
            /* Otherwise display a message advising that no restaurants have been found*/
            }

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
                                <span className={hovered && index == cardIndex ? "card-text-hovered" : "card-text-standard"}> {'\u2b50'} {restaurant.rating.starRating} </span>
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

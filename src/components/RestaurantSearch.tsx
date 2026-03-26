import JustEatLogo from '../assets/Just-Eat-Logo.png'
import '../App.css'
import { useState, useEffect } from 'react';
import { getRestaurantApiPostcode } from '../api/restaurantsapi';
import RestaurantList from './RestaurantList';
import type { Restaurant } from "../types/types";


function RestaurantSearch() {


    const [showSearch, setShowSearch] = useState(true);
    const [showResults, setShowResults] = useState(true);
    const [postcode, setPostcode] = useState("");
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    async function searchRestaurants() {
        try {
            setPostcode(postcode.replaceAll(' ', ''));
            const result = await getRestaurantApiPostcode(postcode);
            setRestaurants(result)
        } catch (error) {
            console.error('Error:', error);
        }

    }

    return (
        <>


            {showSearch ? (
                <div className="centered-div">
                    <img src={JustEatLogo} className="framework" alt="React logo" width="250px" />
                    <h1> Restaurant Finder </h1>
                    <input
                        name="input"
                        id="postcode"
                        type="text"
                        title="Postcode"
                        placeholder="Postcode"
                        value={postcode}
                        className="input-text"
                        onChange={(e) => setPostcode(e.target.value)}
                    />
                    <button
                        className="submit-button"
                        onClick={() => {
                            setShowSearch(false)
                            searchRestaurants();
                        }}
                    >Search</button>
                </div>

            ) : null}

            {restaurants && restaurants.length > 0 ? (
            <RestaurantList
                Restaurants={restaurants}
            />


            ) : null}
        </>
    )
}

export default RestaurantSearch

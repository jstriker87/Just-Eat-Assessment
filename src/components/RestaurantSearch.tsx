import JustEatLogo from '../assets/Just-Eat-Logo.png'
import '../App.css'
import { useState, useEffect } from 'react';
import { getRestaurantApiPostcode } from '../api/restaurantsapi';
import RestaurantList from './RestaurantList';
import type { Restaurant } from "../types/types";


function RestaurantSearch() {


    const [showSearch, setShowSearch] = useState<boolean>(true);
    const [postcode, setPostcode] = useState("");
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [showInvalidPostcodeMessage, setShowInvalidPostcodeMessage] = useState(false);


    // Debug
    //useEffect(() => {
    //    console.log("showSearch",showSearch)
    //}, [showSearch]);


    async function searchRestaurants() {
        try {
            const postcodeRegex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;
            if (!postcodeRegex.test(postcode) || postcode.length == 0) {
                setShowInvalidPostcodeMessage(true)
                setTimeout(() => {
                    setShowInvalidPostcodeMessage(false)
                }, 1200);
                return
            } else {
                setPostcode(postcode.replaceAll(' ', ''));
                const result = await getRestaurantApiPostcode(postcode);
                setRestaurants(result)
                setShowSearch(false)
                setPostcode("")
            }
        } catch (error) {
            console.error('Error:', error);
            return
        }
    }

    return (
        <>


            {showSearch ? (
                <>
                <div className="centered-div">
                    <img src={JustEatLogo} className="framework" alt="React logo" width="250px" />
                    <h1> Restaurant Finder </h1>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        searchRestaurants();
                    }}>
                        <input
                            name="input"
                            id="postcode"
                            type="text"
                            title="Postcode"
                            placeholder="Enter Postcode"
                            value={postcode}
                            className="input-text"
                            onChange={(e) => setPostcode(e.target.value)}
                        />
                        <button
                            className="submit-button"
                        >Search</button>
                    </form>

            {showInvalidPostcodeMessage ? (
                <span className='invalid-postcode-message'>Invalid postcode</span>
            ) : (
                <p></p>
            )}
            </div>
            </>
            ) : null}

            {!showSearch ? (
                <RestaurantList
                    Restaurants={restaurants}
                    setShowSearch={setShowSearch}
                    showSearch={showSearch}
                />

            ) : null}
        </>
    )
}

export default RestaurantSearch

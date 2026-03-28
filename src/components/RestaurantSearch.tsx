import JustEatLogo from '../assets/Just-Eat-Logo.png'
import '../App.css'
import { useState, useEffect } from 'react';
import RestaurantList from './RestaurantList';
import type { Restaurant } from "../types/types";
import { getData } from '../hooks/dataManager';


/**
 * RestaurantSearch: Allows users to enter a postcode and search for restaurants in Just Eat 
 */

function RestaurantSearch() {

    /**
     * Set useStates for variables used during the pages lifecylc
     * Represents a book.
     * @var showSearch: If this search page should be visible
     * @var postcode: The postcode that the user enters into the input box
     * @var restaurants: The list of restaurants of type 'Restaurant' returned after searching using a postcode
     * @var showInvalidPostcodeMessage: If the invalid postcode message should be visibile
     */
    const [showSearch, setShowSearch] = useState<boolean>(true);
    const [postcode, setPostcode] = useState<string>("");
    const [displayError, setError] = useState<string>("");
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [showInvalidPostcodeMessage, setShowInvalidPostcodeMessage] = useState<boolean>(false);


  /* This useEffect is used to temporarily display any error messages on the screen*/

    useEffect(() => {
        setTimeout(() => {
            setError("")
        }, 2000);

    }, [displayError]);

    /**
        * The search restaurants function
    * Validates if the user has entered a valid UK postcode, or that the postcode is not empty 
        * If either of the above is not true then display an invalid postcode error message for 1.2 seconds 
            * Otherwise remove any spaces in the postcode and make a request to the api wrapper 'getRestaurantApiPostcode' with the postcode
    * Then set return value from this requests to the restaurants useState value and set the postcode to an empty string
    */

    async function searchRestaurants() {
        try {
            setPostcode(postcode.replaceAll(' ', ''));
            getData({
                postcode,
                setRestaurants,
                setShowSearch,
                setError,
                setShowInvalidPostcodeMessage
            });
            setPostcode("")

        } catch (error : any) {
            setError(String(error))
            console.error(error.toString())
            return
        }
    }

    return (
        <>

            {/* If an error occurs this will display the message in an error message at the top of the screen*/}
            {displayError ? (
                <>
                    <div className="centered-div">
                        <span className='invalid-postcode-message'>{displayError}</span>
                    </div>
                </>
            ) : null}


            {/* If 'showSearch' is true then show the search page below. */
            /* This page consists of: */
            /* A 'centered-div' to contain the contents of the page*/
            /* A logo */
            /* A form with an input box to enter a postcode and a submit button */
            /* A conditional message box to alert the user has entered an invalid postcode */
            }

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

            {/**
             * If 'showSearch' is false then load the 'RestaurantList" page
             * @prop Restaurants: The list of restaurants returned from query to dataManaager and then to the api wrapper, or else an empty array
             * @prop setShowSearch: A boolean React StateAction to show the search page
            */}


            {!showSearch ? (
                <RestaurantList
                    Restaurants={restaurants}
                    setShowSearch={setShowSearch}
                />

            ) : null}
        </>
    )
}

export default RestaurantSearch

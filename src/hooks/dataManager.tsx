
// Imports the 'DataManagerProps' which contains the types / interfaces
import type { DataManagerProps, Restaurant } from "../types/types";
// Import the 'getRestaurantApiPostcode' api wrapper
import { getRestaurantApiPostcode } from '../api/RestaurantsApi';


/**
 * getData: A Data manager which allows management of the lifecycle of the process to retrieve data using the api wrapper
 * @prop restaurants: The list of restaurants passed in from 'RestaurantSearch'
 * @prop setRestaurants: A React StateAction of type 'Restaurants[]' to set the restaurants returned from the api wrapper call
 * @prop setShowSearch: A boolean React StateAction to show the search page passed in from 'RestaurantSearch'
 * @prop setError: A string React StateAction to set an error message. Passed in from 'RestaurantSearch'
 * @prop setShowInvalidPostcodeMessage: A string React StateAction to set an invalid podcast message message. Passed in from 'RestaurantSearch'
 * @prop DataManagerProps: An interface used to manage the data and types used as props in 'getData'
 */


export const getData = ({ postcode, setRestaurants, setShowSearch, setError, setShowInvalidPostcodeMessage }: DataManagerProps) => {
    try {
        async function searchRestaurants() {
            // If the postcode is invalid or the postcode is empty then set 'setShowInvalidPostcodeMessage' to true for 1.2 seconds to an error message is displayed to the user
            if (!checkPostcode(postcode)) {
                setShowInvalidPostcodeMessage(true)
                setTimeout(() => {
                    setShowInvalidPostcodeMessage(false)
                }, 1200);
                return
                // If the postcode is valid then make a request to the api wrapper's function 'getRestaurantApiPostcode' with the entered postcode
                // Then set 'setRestaurants' to the result of the api call and set 'setShowSearch' to false so the user no longer sees the search page
            } else {
                const result = await getRestaurantApiPostcode(postcode);

                setRestaurants(result as Restaurant[])
                setShowSearch(false)
            }

        }
        // As the 'searchRestaurants' needs an async / await call I call it from outside of the function and also handle any errors
        searchRestaurants().catch((error) => {
            setError(String(error));
            console.error(String(error));
        });
    } catch (error) {
        setError(String(error))
        console.error(String(error));
        return
    }
};

export function checkPostcode(postcode: string) {
    postcode = postcode.trim()
    // A Regex provided from Gov.uk website for validating postcodes
    const postcodeRegex = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$/;
    // If the postcode is invalid or the postcode is empty then set 'setShowInvalidPostcodeMessage' to true for 1.2 seconds to an error message is displayed to the user
    return postcode.length > 0 && postcodeRegex.test(postcode)
}

export default getData

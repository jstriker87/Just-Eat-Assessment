

// Basic address info for a restaurant
interface Address {
    firstLine: string; // The first line of the address
    city: string;
    postalCode: string;
}

// Rating details for a restaurant
interface rating {
    count: number,
    starRating: number,
    userRating: number
}


// Main restaurant object used across the app
export interface Restaurant {
    name: string,
    cuisines: { name: string }[];
    rating: rating,
    address: Address,
};

// Props for the components that display the restaurants information
export interface RestaurantProps {
    Restaurants: Restaurant[];
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>; 
}


// Props for the data handling / fetching logic
export interface DataManagerProps {
    setRestaurants: React.Dispatch<React.SetStateAction<Restaurant[]>>; 
    setShowInvalidPostcodeMessage: React.Dispatch<React.SetStateAction<boolean>>; 
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>; 
    setError: React.Dispatch<React.SetStateAction<string>>;
    postcode: string;
}

// Wrapper type for API responses (if returning a list of restaurants)
export interface AllRestaurants {
    restaurants: Restaurant[];

}


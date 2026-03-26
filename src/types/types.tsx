

interface Address {
    firstLine: string;
    city: string;
    postalCode: string;
}

interface rating {
    count: number,
    starRating: number,
    userRating: number
}

export interface Restaurant {
    name: string,
    cuisines: { name: string }[];
    rating: rating;
    address: Address,
};

export interface RestaurantProps {
    Restaurants: Restaurant[];
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>; 
    showSearch: boolean; 
}


export interface AllRestaurants {
    restaurants: Restaurant[];

}


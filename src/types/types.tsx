

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
}


export interface AllRestaurants {
    restaurants: Restaurant[];

}


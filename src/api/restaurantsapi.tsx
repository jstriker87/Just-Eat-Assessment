import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse} from "axios";
export const getRestaurantApiPostcode= async (postcode: string, configs?: AxiosRequestConfig<any>) => {
    let res: AxiosResponse<AllRestaurants>;
    res = await axiosIns({
        method: 'get',
        url: `/api/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
        ...configs
    })

    const Results: AllRestaurants = res.data;

    const AddressResults = Results.restaurants.splice(0,10).map(item => ({
        name: item.name,
        cuisines: item.cuisines,
        rating: Number(item.rating.starRating),
        address: item.address
    }));

    return AddressResults
}
const axiosIns = axios.create({
    withCredentials: false,
    headers: { "Content-Type": "application/json" },
});


interface RestaurantData {
    name: string,
    cuisines: { name: string }[];
    rating: { starRating: number };
    address: string[],
};

interface AllRestaurants {
    restaurants: RestaurantData[];

}

export default getRestaurantApiPostcode

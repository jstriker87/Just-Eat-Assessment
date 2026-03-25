import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse} from "axios";
export const getRestaurantApiPostcode= async (postcode: string, configs?: AxiosRequestConfig<any>) => {
    let res: AxiosResponse<AllRestaurants>;
    res = await axiosIns({
        method: 'get',
        url: `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
        ...configs
    })

    return res.data
}
const axiosIns = axios.create({
    withCredentials: false,
    headers: { "Content-Type": "application/json" },
});

type RestaurantData  = {

    name: string,
    cuisines: { name: string }[];
    rating: {starRating: number };
    address: any;

}

type AllRestaurants = {
    restaurants: RestaurantData[];

}

export default getRestaurantApiPostcode

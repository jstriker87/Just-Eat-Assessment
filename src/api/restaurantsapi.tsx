import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { Restaurant, AllRestaurants } from "../types/types";

export const getRestaurantApiPostcode = async (postcode: string, configs?: AxiosRequestConfig<any>) => {
    let res: AxiosResponse<AllRestaurants>;
    res = await axiosIns({
        method: 'get',
        url: `/api/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
        ...configs
    })

    const Results: AllRestaurants = res.data;

    const AddressResults = Results.restaurants.splice(0, 40).map(item => ({
        name: item.name,
        cuisines: item.cuisines,
        rating: item.rating,
        address: item.address
    }));

    return AddressResults
}
const axiosIns = axios.create({
    withCredentials: false,
    headers: { "Content-Type": "application/json" },
});





export default getRestaurantApiPostcode

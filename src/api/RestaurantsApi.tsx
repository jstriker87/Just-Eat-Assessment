import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import type { AllRestaurants } from "../types/types";

/**
 * getRestaurantApiPostcode: An api wrapper that makes calls using Axios to Just Eats Api
 * @param postcode: The postcode that the user searched for
 * @param configs (optional): An optional config paramater to allow users to provide any additional information such as headers if required
 * The url is proxied using a proxy in the Vite config to avoid issues with Cors so /api/ is replaced with the full url of the Just Eat API
 * The 'res' result of the request is structured using the 'AllRestaurants' interface from the 'types' page which is an array of the 'Restaurant' interface
 * @return RestaurantResults An array of restaurants which uses the 'Restaurant' interface

 */

export const getRestaurantApiPostcode = async (postcode: string, configs?: AxiosRequestConfig<any>) => {
    let res: AxiosResponse<AllRestaurants>;
    res = await axiosIns({
        method: 'get',
        url: `/api/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
        ...configs
    })

    const Results: AllRestaurants = res.data;

    const RestaurantResults = Results.restaurants.splice(0, 40).map(item => ({
        name: item.name,
        cuisines: item.cuisines,
        rating: item.rating,
        address: item.address
    }));

    return RestaurantResults
}
const axiosIns = axios.create({
    withCredentials: false,
    headers: { "Content-Type": "application/json" },
});

export default getRestaurantApiPostcode

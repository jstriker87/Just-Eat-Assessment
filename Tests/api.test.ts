import { test } from 'vitest'
import { getRestaurantApiPostcode } from '../src/api/RestaurantsApi';


test('Expect call using API wrapper to Just Eat API to return array of restaurants with length more than 0', async ({ expect }) => {
    const apiCall = await getRestaurantApiPostcode('EC4M7RF', `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/`);
    expect(apiCall).toEqual(expect.any(Array));
    expect(apiCall && apiCall.length).toBeGreaterThan(0);

})

test('Expect call using API wrapper to Just Eat API to return array of zero restaurants due invalid postcode', async ({ expect }) => {
    const apiCall = await getRestaurantApiPostcode('WD900DS:', `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/`);
    expect(apiCall).toEqual(expect.any(Array));
    expect(apiCall && apiCall.length).toBe(0);

})

test('Expect call using API wrapper to invalid API endpoint to throw an error', async ({ expect }) => {
    const apiCall = getRestaurantApiPostcode('EC4M7RF', `https://uk.api.just-eat.io/discovery/GB/restaurants/enriched/bypostcode/`);
    await expect(apiCall).rejects.toThrow()

})

import { describe, test } from 'vitest'
import { getRestaurantApiPostcode } from '../src/api/RestaurantsApi';


test('Expect call using API wrapper to invalid API endpoint to throw an error', async ({ expect }) => {
    const apiCall = getRestaurantApiPostcode('EC4M7RF', `https://uk.api.just-eat.io/discovery/GB/restaurants/enriched/bypostcode/`);
    await expect(apiCall).rejects.toThrow()

})



import AxiosMockAdapter from "axios-mock-adapter";
import { describe, test, expect, beforeEach, vi } from "vitest"
import { axiosIns, getRestaurantApiPostcode } from '../src/api/RestaurantsApi';

describe('Testing API Wrapper using mock Axios ', () => {

    let mock = new AxiosMockAdapter(axiosIns);
    test('Get restaurants request to mock API endpoint should pass', async () => {
        mock.onGet(/api/).reply(200, {
            restaurants: [{ name: 'Sainsburys - Farringdon' }]
        });
        const result = await getRestaurantApiPostcode('EC4M7RF');

        expect(result.length).toBe(1);
        expect(result[0].name).toBe('Sainsburys - Farringdon');
    });


    test('Get restaurants request to mock API endpoint where no restaurants should pass', async () => {
        mock.onGet(/api/).reply(200, {
        });
        const result = await getRestaurantApiPostcode('EC4M7RF');

        expect(result).toStrictEqual([]);
    });


});

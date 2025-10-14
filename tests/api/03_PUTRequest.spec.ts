import { test, expect } from '@playwright/test';
import { userid } from './02_postRequest.spec';

test('PUT update user', async ({ request }) => {
    const response =await request.put('https://api.restful-api.dev/objects/'+userid, {
        data: {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 2049.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB",
                "color": "silver"
            }
        },
        headers : {
            "Accept": "application/json"
        }
    });

    var responseBody = await response.json(); 
    console.log("PUT Request : ", responseBody);

})

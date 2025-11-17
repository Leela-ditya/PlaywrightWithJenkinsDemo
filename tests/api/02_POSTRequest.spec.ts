import { test, expect } from '@playwright/test'

export let userid: string = '';
// export var type: string = userid;

test('POST create user', {tag: '@postMethodAPI'}, async ({ request }) => {
    const response = await request.post('https://api.restful-api.dev/objects', {
        data: {
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        },
        headers: {
            "Accept": "application/json"
        }
    });
    console.log(await response.json())

    expect(await response.status()).toBe(200)
    var res = await response.json();
    userid = res.id;
    console.log("Response ID : ",userid);
    console.log('Post response status text : ',response.statusText())

})

// reqres.in website POST request
// test('POST create user', async ({ request }) => {
//     const response = await request.post('https://reqres.in/api/users', {
//         data: {
//             "name": "morpheus",
//             "job": "leader",
//         },
//         headers: {
//             "Accept": "application/json"
//         }
//     });
//     console.log(await response.json())
//     var res = await response.json();
//     userid = res.id;
// })

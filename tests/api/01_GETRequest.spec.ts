import { test, expect } from '@playwright/test';


test('GET list of users', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users?page=2');
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.data.length).toBeGreaterThan(0);

    if (response.status() !== 200) {
        throw new Error('Request Not Found !')
    } else {
        console.log('Headers : ', response.headers())
        console.log('Response Status : ', response.status())
        console.log("Response Body : ", data);
    }
})

test('GET single user', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/2');
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

     if (response.status() !== 200) {
        throw new Error('Response Not Found !')
    } else {
        console.log('Response Status : ', response.status())
    }

    const data = await response.json();
    console.log(data);

    expect(data.data.email).toBe("janet.weaver@reqres.in")
    expect(data.support.url).toBe("https://contentcaddy.io?utm_source=reqres&utm_medium=json&utm_campaign=referral")
    expect(data._meta.docs_url).toBe("https://reqres.in")
    expect(data._meta.upgrade_cta).toBe("Upgrade to Pro for unlimited requests, custom endpoints, and data persistence")
   
})

test('GET single user not found', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/users/23');
    expect(response.status()).toBe(401);
    expect(response.ok()).toBeFalsy();
    expect(await response.json()).toStrictEqual({"error": "Missing API key"});
})

test('GET list resource', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/unknown');
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.data.length).toBeGreaterThan(0);
    expect(data.data[2].color).toBe('#BF1932');

    const arrColors = ['#98B2D1','#C74375','#BF1932','#7BC4C4','#E2583E','#53B0AE']

    for(let i=0;i<data.data.length;i++){
        const UIColor = data.data[i].color;
        expect(arrColors[i]).toBe(UIColor);
        // console.log('array color value : ', arrColors[i])
    }

    if (response.status() !== 200) {
        throw new Error('Request Not Found !')
    } else {
        console.log('Response Status : ', response.status())
    }
})

test('GET single resource', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/unknown/2'); 
    expect(await response.status()).toBe(200);
    expect(await response.ok()).toBeTruthy();

    const data = await response.json();
    expect(data.data.id).toBe(2)
    expect(data.data.pantone_value).toBe('17-2031')
})

test('GET single resource not found', async ({ request }) => {
    const response = await request.get('https://reqres.in/api/unknown/23');
    expect(await response.status()).toBe(404);
    expect(await response.ok()).toBeFalsy();
    expect(await response.json()).toStrictEqual({});
})


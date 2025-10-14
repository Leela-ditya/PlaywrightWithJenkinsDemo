import {test, expect} from "@playwright/test";

test("GET list of users", async({request})=>{
    const response = await request.get('https://reqres.in/api/users?page=2');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    console.log(data)
    expect(data.data.first_name).toBe('George');
})

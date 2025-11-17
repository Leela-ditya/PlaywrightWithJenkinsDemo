import {test, expect} from '@playwright/test'

test('DELETE user', async({request})=>{
    const response = await request.delete('https://api.restful-api.dev/objects/6', {
        headers : {
            "Accept": "application/json"
        }
    });
})
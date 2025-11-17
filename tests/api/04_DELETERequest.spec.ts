import {test, expect} from '@playwright/test'
import { userid } from './02_POSTRequest.spec';

test('DELETE user', async({request})=>{
    const response = await request.delete('https://api.restful-api.dev/objects/'+userid, {
        headers : {
            "Accept": "application/json"
        }
    });
})
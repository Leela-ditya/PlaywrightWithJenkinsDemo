import {test, expect} from '@playwright/test'

test('DELETE user', async({request})=>{
    const response = await request.delete('')
})
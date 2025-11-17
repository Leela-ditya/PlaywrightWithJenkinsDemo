import { test } from '@playwright/test';

test('forEach Program', async () => {
    const expectedValue = ['Apple', 'Banana', 'Mango', 'Grapes'];

    const actualValue = ['Apple ', 'Banana', 'Mango ', 'Grapes'];

    actualValue.forEach((actualValueItem, index) => {
        const value = actualValueItem.trim();
        if (value === expectedValue[index]) {
            console.log(`Item at index ${index} matches: ${value}`);
        }
    })
})
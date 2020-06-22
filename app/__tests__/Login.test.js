import { mount } from "@vue/test-utils"
import Login from './../src/components/Login.vue';

describe("Login", () => {
    // Inspect the raw component options
    it('has data', () => {
        expect(typeof Login.data).toBe('function')
    })
})

// describe("Login", () => {
//     const wrapper =  mount(Login);
    
//     test('is a Vue instance', () => {
//         expect(wrapper.isVueInstance()).toBeTruthy()
//     })
// })

import App from './../src/App.vue'
import { shallowMount } from '@vue/test-utils'

describe('App', () => {
    // Inspect the raw component options
    it('has data', () => {
        expect(typeof App.components).toBe('object')
    })
})

describe("mounted App", () => {
    const wrapper =  shallowMount(App);
    
    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance()).toBeTruthy()
    })
})
//import vuex
import vuex from 'vuex'
//import vue
import Vue from 'vue'



// use vuex
Vue.use(vuex)
    // There needs to be a place where business operations are written, such as where ajax needs to be sent
const actions = {

    }
    //where data is manipulated
const mutations = {
    saveImg(state, value) {
        state.img = value
    },
    clearImg(state) {
        state.img = null;
    },
    updateStyle(state, value) {
        console.log("Edit theme")
        state.style = value;
    },
    saveCommodity(state, value) {
        console.log("Save data")
        state.commod = value
    },
    clearData(state) {
        state.commod.coname = null
        state.commod.price = null
        state.commod.title = null
        state.commod.productDescription = null
        state.commod.imgUrl = null
    },
    againLogin(state) {
        state.login.isLogin = false;
        state.login.isLoginShow = true;

    },
    updateLogin(state, login) {
        state.login = login;
    }

}

//The place where the data is stored is similar to the data on the vm but shared globally
const state = {
        img: null,
        style: 1,
        login: {
            isLogin: false,
            isLoginShow: false
        },
        commod: {
            coname: null,
            price: null,
            title: null,
            jhtitle: null,
            productDescription: null,
            imgUrl: null
        },
    }
    // Where data is processed, multiple components reuse the processed data and can use this type to calculate properties, but this is globally shared
const getters = {

    }
    //Create an exposed Store object
export default new vuex.Store({
    actions,
    mutations,
    state,
    getters
})
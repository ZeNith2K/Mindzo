const state = {
    comments: []
}

const getters = {
    getComments(state){
        return state.comments
    }
}

const mutations = {
    setComments(state, payload){
        state.comments = payload
    }
}

const actions = {
    setComments({commit}, payload){
        commit('setComments', payload)
    }
}

export default {
    state, getters, mutations, actions
}
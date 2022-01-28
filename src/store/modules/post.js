const state = {
    posts : [],
    selectedPostId: 1,
    selectedPost: {}
}

const getters = {
    getPosts: state => {
        return state.posts
    },
    getSelectedPostId : state => {
        return state.selectedPostId
    },
    getSelectedPost : state => {
        return state.selectedPost
    }
}

const mutations = {
    setPosts: (state, payload) => {
        state.posts = payload
    },
    setSelectedPostId: (state, payload) => {
        state.selectedPostId = payload
    },
    setSelectedPost: (state ,payload) => {
        state.selectedPost = payload
    }
}

const actions = {
    setPosts: ({commit}, payload) => {
        commit('setPosts', payload)
    },
    setSelectedPostId: ({commit}, payload) => {
        commit('setSelectedPostId', payload)
    },
    setSelectedPost : ({commit}, payload) => {
        commit('setSelectedPost', payload)
    }
}

export default {
    state, getters, mutations, actions
}
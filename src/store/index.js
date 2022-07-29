import vuex from 'vuex'

const store = new vuex.Store({
    state: {
        files : [],
    },
    mutations: {
        addFile(state, file) {
            state.files.push(file)
        },
        removeFile(state, file) {
            state.files.splice(state.files.indexOf(file), 1)
        },
        removeAllFiles(state) {
            state.files = []
        }
    },
    actions: {
        addRecording({commit}, file) {
            commit('addFile', file)
        },
        removeFile({commit}, file) {
            commit('removeFile', file)
        },
        removeAllFiles({commit}) {
            commit('removeAllFiles')
        }
    },
    getters: {
        files: state => state.files
    }
})

export default store
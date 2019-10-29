import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex )

export default new Vuex.Store( {
  state: {
    io: {},
    username: '',
    message: '',
    messages: []
  },
  mutations: {
    setSocket: ( state, socket ) => {
      state.io = socket
      console.log( 'socket connected' )
    },
    SOCKET_USERNAME: (state, username) => {
      state.username = username
    },
    SOCKET_MESSAGE: (state, message) => {
      state.message = message
    }
  },
  actions: {
    socket_change_username: ( { state, rootState } ) => {
      rootState.io.emit( 'user', state.username )
    },
    socket_message: ( { state, rootState } ) => {
      rootState.io.emit( 'message', state.message )
    },
    socket_join: ( { rootState } ) => {
      rootState.io.emit( 'join_user' )
    }
  },
  getters: {
    username: (state) => {
      return state.username
    }
  }
} )


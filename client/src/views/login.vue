<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-md-3 absolute-center">
        <div class="q-card">
          <div class="q-card__section">
            <div class="text-h6">Chat com Socket.io</div>
            <div class="text-subtitle2">Redes de Computadores</div>
          </div>
          <div class="q-card__section">
            <div class="col-12">
              <q-input filled v-model="usuario" @keydown.enter="username" label="Usuário" />
            </div>
            <div class="col-12 text-right">
              <br><br>
              <q-btn label="Entrar" clickable @click="username" class="bg-blue text-white"></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'login',
  data() {
    return {
      usuario: ''
    }
  },
  sockets: {
    user: function() {
      this.$store.commit('SOCKET_USERNAME', this.usuario)
    }
  },
  watch: {
    usuario(value) {
      this.$store.commit('SOCKET_USERNAME', value)
    }
  },
  methods: {
    username() {
      this.$store.dispatch('socket_change_username');
      this.$store.dispatch('socket_join')
      this.$router.push('/chat')
    }
  }
}
</script>

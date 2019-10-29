<template>
  <div class="q-pa-md">
    <div class="row">
      <div class="col-md-3 absolute-center">
        <div class="q-card">
          <div class="q-card__section">
            <div class="text-h6">Chat com Socket.io</div>
            <div class="text-subtitle2">Usuário conectado: {{username}}</div>
          </div>
          <div class="q-card__section">
            <div>
              <div id="caixa_dialogo" style="width: 100%; height: 400px; overflow-y: auto; overflow-x: hidden; padding: 20px">
                <q-chat-message
                  v-for="mensagem in mensagens"
                  :key="mensagem.user + mensagem.message"
                  :name="mensagem.user"
                  :text="[mensagem.message]"
                  :sent="souEu(mensagem)"
                  :avatar="souEu(mensagem) ? 'http://www.cippoweb.com.ar/wp-content/uploads/2018/08/desencanto-netflix-animacao-Matt-Groening-05-demonio.jpg' : 'http://placehold.it/180'"
                  stamp="4 minutes ago"
                />
              </div>
            </div>
          </div>
          <div class="q-card__actions q-card__actions--horiz row">
            <div class="col-10">
              <q-input round dense filled placeholder="Digite a mensagem" counter v-model="mensagem" @keydown.enter="msg" id="mensageiro" />
            </div>
            <div class="col-2 text-right">
              <q-btn class="bg-blue-7 text-white" icon="send" round ></q-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chat',
  data() {
    return {
      mensagem: '',
      mensagens: []
    }
  },
  sockets: {
    message: function(message) {
      this.mensagens.push(message)
      this.$store.commit('SOCKET_MESSAGE', this.mensagem)
      var objDiv = document.getElementById("caixa_dialogo");
      objDiv.scrollTop = objDiv.scrollHeight;
    },
    user: function() {
      this.$store.commit('SOCKET_USERNAME', this.usuario)
    }
  },
  watch: {
    mensagem(value) {
      this.$store.commit('SOCKET_MESSAGE', value)
    }
  },
  methods: {
    msg() {
      this.$store.dispatch('socket_message')
      this.mensagem = ''
    },
    souEu(valor) {
      return valor.identifier === this.$socket.id
    }
  },
  computed: {
    username() {
      return this.$store.getters.username
    }
  },
  mounted() {
    setTimeout(() => {
      document.getElementById('mensageiro').focus()
    }, 200)
  }
}
</script>
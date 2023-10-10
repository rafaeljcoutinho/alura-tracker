<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': darkMode}">
    <div class="column is-one-quarter">
      <BarraLateral @onChangeMode="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes />
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Notificacoes from './components/Notificacoes.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Notificacoes
},
  data() {
    return {
      darkMode: false
    }
  },
  methods: {
    trocarTema(darkMode) {
      this.darkMode = darkMode
    }
  }
});
</script>

<style>
.lista {
  padding: 1.25rem;
}
main {
  --bg-primario: #fff;
  --texto-primario: #000;
}
main.modo-escuro {
  --bg-primario: #2b2d42;
  --texto-primario: #959595;
}
.conteudo {
  background-color: var(--bg-primario);
}
</style>
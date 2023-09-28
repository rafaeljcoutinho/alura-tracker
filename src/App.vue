<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': darkMode}">
    <div class="column is-one-quarter">
      <BarraLateral @onChangeMode="trocarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-if="listaEstaVazia">
          Nenhuma tarefa concluida hoje
        </Box>
      </div>
    </div>
  </main>
</template>

<script>
import { defineComponent } from 'vue';
import BarraLateral from './components/BarraLateral.vue';
import Formulario from './components/Formulario.vue';
import Tarefa from './components/Tarefa.vue';
import Box from './components/Box.vue';

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box
  },
  data() {
    return {
      tarefas: [],
      darkMode: false
    }
  },
  computed: {
    listaEstaVazia () {
      return this.tarefas.length === 0
    }
    
  },
  methods: {
    salvarTarefa(tarefa) {
      this.tarefas.push(tarefa)
    },
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
<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
        <Box v-if="listaEstaVazia">
            Nenhuma tarefa concluida hoje
        </Box>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
    </div>
</template>
  
<script>
import { defineComponent } from 'vue';
import Formulario from '../components/Formulario.vue';
import Tarefa from '../components/Tarefa.vue';
import Box from '../components/Box.vue';

export default defineComponent({
    name: 'App',
    components: {
        Formulario,
        Tarefa,
        Box
    },
    data() {
        return {
            tarefas: []
        }
    },
    computed: {
        listaEstaVazia() {
            return this.tarefas.length === 0
        }

    },
    methods: {
        salvarTarefa(tarefa) {
            this.tarefas.push(tarefa)
        }
    }
});
</script>
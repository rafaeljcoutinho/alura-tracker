<template>
    <div class="boxx formulario">
        <div class="columns">
            <div 
                class="column is-8" 
                role="form" 
                aria-label="Formulario para criacao de uma nova tarefa"
            >
                <input 
                    type="text" 
                    class="input" 
                    placeholder="Qual tarefa voce deseja iniciar"
                    v-model="descricao"
                    :disabled="isRunning"
                />
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" @aoTemporizadorIniciado="iniciarTarefa"/>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';

export default defineComponent({
    name: 'MeuFormulario',
    emits: ['aoSalvarTarefa'],
    components:{
        Temporizador,
    },
    data () {
        return {
            descricao: '',
            isRunning: false
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido, cronometroRodando) {
            this.isRunning = cronometroRodando
            this.$emit('aoSalvarTarefa', {
                tempo: tempoDecorrido,
                descricao: this.descricao
            })
            this.descricao = ''
        },
        iniciarTarefa(cronometroRodando) {
            this.isRunning = cronometroRodando
        }
    }
});
</script>


<style>
.formulario {
    color: var(--texto-primario);
    background-color: var(--bg-primario);
}
.boxx {
    border-radius: 6px;
    padding: 1.25rem;
}
</style>
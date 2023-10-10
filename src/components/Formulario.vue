<template>
    <div class="boxx formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulario para criacao de uma nova tarefa">
                <input type="text" class="input" placeholder="Qual tarefa voce deseja iniciar" v-model="descricao"
                    :disabled="isRunning" />
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione o projeto</option>
                        <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
                            {{ projeto.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
                <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" @aoTemporizadorIniciado="iniciarTarefa" />
            </div>
        </div>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue';
import Temporizador from './Temporizador.vue';
import { useStore } from "@/store";
import { NOTIFICAR } from '@/store/mutations-type';
import { TipoNotificacao } from '@/store/tipoNotificacoes';

export default defineComponent({
    name: 'MeuFormulario',
    emits: ['aoSalvarTarefa'],
    components: {
        Temporizador,
    },
    data() {
        return {
            descricao: '',
            idProjeto: '',
            isRunning: false
        }
    },
    methods: {
        finalizarTarefa(tempoDecorrido, cronometroRodando) {
            const projeto = this.projetos.find((p) => p.id == this.idProjeto);
            if(!projeto) {
                this.store.commit(NOTIFICAR, {
                    titulo: 'Tarefa "solta"',
                    texto: "Nenhum projeto vinculado a essa tarefa...",
                    tipo: TipoNotificacao.ATENCAO
                });
            }
            else {
                this.store.commit(NOTIFICAR, {
                    titulo: 'Parabéns!',
                    texto: "Tarefa concluída com sucesso!",
                    tipo: TipoNotificacao.SUCESSO
                })
            }
            this.isRunning = cronometroRodando
            this.$emit('aoSalvarTarefa', {
                tempo: tempoDecorrido,
                descricao: this.descricao,
                projeto: this.projetos.find(proj => proj.id == this.idProjeto)
            })
            this.descricao = ''
        },
        iniciarTarefa(cronometroRodando) {
            this.isRunning = cronometroRodando
        }
    },
    setup() {
        const store = useStore()
        return {
            projetos: computed(() => store.state.projetos),
            store
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
<template>
    <section>
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="flied">
                <button class="button" type="submit">Salvar</button>
            </div>
        </form>
    </section>
</template>

<script>
import { useStore } from "@/store";
import { defineComponent } from "vue";
import { TipoNotificacao } from "@/store/tipoNotificacoes";
import { useNotificador } from "@/hooks/notificador"
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from "@/store/actions-type";
//import { notificacaoMixin } from "@/mixin/notificar"

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Formulario',
    props: {
        id: {
            type: String
        }
    },
    //mixins: [notificacaoMixin],
    mounted() {
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
            this.nomeDoProjeto = projeto.name
        }
    },
    data() {
        return {
            nomeDoProjeto: ""
        }
    },
    methods: {
        salvar() {
            if (this.id) {
                this.store.dispatch(ALTERAR_PROJETO, {
                    id: this.id,
                    name: this.nomeDoProjeto
                })
                    .then(() => { this.sucesso() })
            }
            else {
                this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
                    .then(() => { this.sucesso() })
            }

        },
        sucesso() {
            this.nomeDoProjeto = ""
            this.notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi cadastrado com sucesso!')
            this.$router.push('/projetos')
        }
    },
    setup() {
        const store = useStore()
        const { notificar } = useNotificador()
        return {
            store,
            notificar
        }
    }
})
</script>
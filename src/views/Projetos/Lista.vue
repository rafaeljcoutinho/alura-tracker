<template>
    <section>
        <router-link to="/projetos/novo" class="button">
            <span class="icon is-small">
                <i class="fas fa-plus"></i>
            </span>
            <span>New project</span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody v-for="projeto in projetos" :key="projeto.id">
                <tr>
                    <td>{{ projeto.id }}</td>
                    <td>{{ projeto.name }}</td>
                    <td>
                        <router-link :to="`/projetos/${projeto.id}`" class="button">
                            <span class="icon is-small">
                                <i class="fas fa-pencil-alt"></i>
                            </span>
                        </router-link>
                        <button class="button ml-2 is-danger" @click="Delete(projeto.id)">
                            <span class="icon is-small">
                                <i class="fas fa-trash"></i>
                            </span>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </section>
</template>

<script>
import { useStore } from "@/store";
import { defineComponent, computed } from "vue";
import { EXCLUIR_PROJETO } from "@/store/mutations-type";

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Lista',
    setup() {
        const store = useStore()
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    },
    methods: {
        Delete(id){
            this.store.commit(EXCLUIR_PROJETO, id)
        }
    }
})
</script>
<template>
    <Box>
        <div class="columns">
            <div class="column is-4">
                {{ tarefa.descricao || 'tarefa sem descricao' }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.name || 'N/D'}}
            </div>
            <div class="column">
                <Cronometro :tempoEmSegundos="tarefa.tempo" />
            </div>
        </div>
    </Box>
</template>

<script>
import { defineComponent } from 'vue';
import Cronometro from './Cronometro.vue';
import Box from './Box.vue';

export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Tarefa',
    components: { Cronometro, Box },
    props: {
        tarefa: {
            type: Object,
            required: true
        }
    }
})
</script>

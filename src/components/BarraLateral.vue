<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="">
        </h1>
        <button class="button" @click="changeMode">{{ textoBotao }}</button>
    </header>
</template>

<script>
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'BarraLateral',
        emits: ['OnChangeMode'],
        data() {
            return {
                darkMode: false
            }
        },
        computed: {
            textoBotao () {
                if(this.darkMode) {
                    return 'Light mode'
                }
                return 'Dark mode'
            }
        },
        methods: {
            changeMode(){
                this.darkMode = !this.darkMode
                this.$emit('OnChangeMode', this.darkMode)
            }
        }
    });
</script>

<style scoped>
    header {
        padding: 1rem;
        background: #0d3b66;
        width: 100%;
        height: 100vh;
        text-align: center;
    }
    @media only screen and (max-width: 768px){
        header{
            padding: 2.5rem;
            height: auto;
        }
    }
</style>
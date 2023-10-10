import { createStore, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR } from "./mutations-type";

// eslint-disable-next-line no-unused-vars
const estado = {
  projetos: [],
  notificacoes: []
};

export const store = createStore({
  state: {
    projetos: [],
    notificacoes: []
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto) {
      const projeto = {
        id: new Date().toISOString(),
        name: nomeDoProjeto,
      };
      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto) {
      const index = state.projetos.findIndex((proj) => proj.id == projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUIR_PROJETO](state, id) {
      state.projetos = state.projetos.filter((proj) => proj.id != id);
    },
    [NOTIFICAR] (state, novaNotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
      }, 3000)
    }
  },
});

export function useStore() {
  return vuexUseStore();
}

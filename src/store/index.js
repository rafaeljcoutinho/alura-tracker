import { createStore, useStore as vuexUseStore } from "vuex";
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUIR_PROJETO, NOTIFICAR, DEFINIR_PROJETOS} from "./mutations-type";
import { OBTER_PROJETOS, CADASTRAR_PROJETO, ALTERAR_PROJETO, REMOVER_PROJETO} from "./actions-type";
import http from "@/http"

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
    [DEFINIR_PROJETOS](state, projetos) {
      state.projetos = projetos
    },
    [NOTIFICAR] (state, novaNotificacao) {
      novaNotificacao.id = new Date().getTime()
      state.notificacoes.push(novaNotificacao)

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id)
      }, 3000)
    }
  },
  actions: {
    [OBTER_PROJETOS] ({ commit }){
      http.get('projetos')
      .then(response => commit(DEFINIR_PROJETOS, response.data))
    },
    [CADASTRAR_PROJETO] (context, nomeDoProjeto){
      return http.post('/projetos', {
        name: nomeDoProjeto
      })
    },
    [ALTERAR_PROJETO] (context, projeto){
      return http.put(`/projetos/${projeto.id}`, projeto)
    },
    [REMOVER_PROJETO] ({ commit }, id){
      return http.delete(`/projetos/${id}`)
      .then(() => commit(EXCLUIR_PROJETO, id))
    }
  }
});

export function useStore() {
  return vuexUseStore();
}

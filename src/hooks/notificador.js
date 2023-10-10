import { store } from "@/store";
import { NOTIFICAR } from "@/store/mutations-type";

export const useNotificador = () => {
  const notificar = (tipo, titulo, texto) => {
    store.commit(NOTIFICAR, {
      titulo,
      texto,
      tipo
    });
  };

  return { notificar };
};
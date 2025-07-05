import { fetch } from "../../../api/api";
import { _URL_DEV } from "../../../const/url";
import { setLoading, setResultadoBusqueda } from "./busquedaSlice";

export const startGetResultadoBusqueda = (texto, page, pageSize) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await fetch('get', `${_URL_DEV}/Search/GetSearch/${texto}?page=${page}&pageSize=${pageSize}`);
      if (res.ok) {
        dispatch(setResultadoBusqueda(res.data));
      }
    } catch (error) {
      console.log('Error en búsqueda:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};
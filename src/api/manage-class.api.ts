import http from "utils/http";
export const createClass = (id: string) => http.post('/abcdef', {id:id})
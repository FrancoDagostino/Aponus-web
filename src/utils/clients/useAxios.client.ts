import axios from "axios";

// Crear una instancia de Axios con configuraciones por defecto
const axiosClient = axios.create({
  baseURL: "https://localhost:7038/Aponus/", // Reemplaza con tu URL base
  // Aquí puedes agregar más configuraciones como headers, timeout, etc.
});

export default axiosClient;

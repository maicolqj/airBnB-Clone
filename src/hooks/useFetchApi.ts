import { useContext, useState } from 'react';
import { respApi } from '../interfaces/GlobalInterfaces';
import { AuthContext } from '../context/AuthContext';
import { PATH_SERVER } from '../../config';
import { Platform } from 'react-native';


interface ConfigFetch {
    method: "POST" | "GET" | "PUT";
    body?: any;
    headers?: any;
}
const baseUrl = `${PATH_SERVER}/api`;

const useFetchApi = () => {
    const {token,logout} = useContext(AuthContext)
    // para guardar la respuesta de api
    const [respApi, setRespApi] = useState<respApi|undefined>();
    // para guardar los errores de api
    const [errorApi, setErrorApi] = useState<string | null>(null);
    // para saber mientras se está haciendo una petición a api
    const [loadingApi, setLoadingApi] = useState<boolean>(false);
    
    const fetchApi = async (path: string, config: ConfigFetch) => {
        try {
            setLoadingApi(true);
            
            config.headers = {
                'XMLHttpRequest': 'X-Requested-With',
                'deviceName': Platform.OS,
                ...config.headers
            };
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }

            if (!(config.body instanceof FormData)) {
                config.headers = { ...config.headers, 'Content-Type': 'application/json' };
                config.body = JSON.stringify(config.body);
            }

            console.log('api', `${baseUrl}${path}`);

            let resp = await fetch(`${baseUrl}${path}`, config);
            if (resp.status === 401) {
                logout()
                // Hacer proceso para no autenticado
            }
            const jsonData = await resp.json()

            setRespApi(jsonData)
            return jsonData
        } catch (error:any) {
            console.log(error.message);
            setErrorApi(error.message || 'Error desconocido');
            return error
        } finally {
            setLoadingApi(false);
        }
    };

    return { respApi, errorApi, loadingApi, fetchApi };
};

export default useFetchApi;

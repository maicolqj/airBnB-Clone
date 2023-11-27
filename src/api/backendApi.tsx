import axios from 'axios'

// import AsyncStorage from '@react-native-async-storage/async-storage';


const PATH_SERVER = process.env.PATH_SERVER;


// console.log('PATH_SERVER api: ' + PATH_SERVER );


const baseURL = `${PATH_SERVER}/api`;



const BackendApi = axios.create({ baseURL,headers:{"XMLHttpRequest": "X-Requested-With"}});

// BackendApi.interceptors.request.use(

//     async (config) => {
//         const token = await AsyncStorage.getItem('Token');
//         if (token) {
//             config.headers!['x-token'] = token
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// )

export default BackendApi
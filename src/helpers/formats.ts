import moment from "moment";
import 'moment/locale/es';
import { File } from "../interfaces/GlobalInterfaces";
import { Asset } from "react-native-image-picker";


export const formatCurrency = (price:number) =>{
    const formatoMonedaColombiana = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
      });
    return formatoMonedaColombiana.format(price).replace(/,00$/, "") + " COP";
}

export const shortText = (texto:String, longitudMaxima:number=10, text:string='...') => {
    if (texto && texto.length > longitudMaxima) {
    return texto.slice(0, longitudMaxima) + text;
    } else {
    return texto;
    }
}

export const removeHyphenEndText = (text:string) => {
    let lastPosition = text.lastIndexOf("-")
    if (lastPosition !== -1) {
        return text.slice(0, lastPosition) + text.slice(lastPosition + 1);
    }
    return text
}

export const getDatesBetweenRange = (start_date:string, end_date:string) => {
    let dates = [];

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        const currentDateStr = currentDate.toISOString().split('T')[0];
        dates.push(currentDateStr)
    }
    return dates;
}

export const shortFormatDate = (date:string|null) => {
    moment.locale('es');
    return date ? moment(date).format("DD MMM") : ''
}  

export const reserveFormatDate = (date:string|null) => {
    moment.locale('es');
    return date ? moment(date).format('ddd, DD MMM') : ''
} 

export const capitalizeFirstLetter = (name:string):String =>{
    if (name) {
      if (name.length === 0 ){
        return name; // Retornar la cadena vacía tal como está
      }
      return name.charAt(0).toUpperCase();
    }
    return ''
}

export const getFirstWord = (word:string):String =>{
    let firstName:String = ''
    if (word) {
      firstName = word.split(' ')[0];
    }
    return firstName
}

export const imageToBackend = (file:Asset|undefined) => {
  if (file?.uri && file?.fileName && file?.type) {
      return { uri: file.uri, name: file.fileName, type:file.type }
  }
  return null
}

export const formatEsCalendar = () => {
    return {
        monthNames: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre'
        ],
        monthNamesShort: ['Ene','Feb', 'Mar', 'Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        today: 'Hoy'
      }
}

export const getBaseUrl = (urlCompleta:string) => {
    const urlPartes = urlCompleta.split('?'); // Dividir la URL en dos partes usando el signo de interrogación
  
    if (urlPartes.length >= 2) {
      const baseUrl = urlPartes[0]; // La primera parte es la base URL
      return baseUrl;
    }
    return urlCompleta; // Si no hay signo de interrogación, la URL completa es la base URL
};
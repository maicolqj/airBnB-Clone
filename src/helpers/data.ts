import { OptionProfile } from "../interfaces/UserInterfaces";

export const optionsProfile = <Array<OptionProfile>>([
  {
    icon:'school',
    text_button:'Dónde estudié',
    key:'where_student',
    modal:'#modal_edit_basic_profile',
    title:"¿A dónde fuiste a la escuela?",
    description:"No importa si estudiaste en casa, de manera regular o de intercambio, nombra la escuela que te hizo ser quien eres hoy.",
    placeholder:"Dónde estudié:",
    inputType:'text'
  },
  {
    icon:'bag-checked',
    text_button:'A qué me dedico',
    key:'dedicated_to',
    modal:'#modal_edit_basic_profile',
    title:"¿A qué te dedicas?",
    description:"Cuéntanos cuál es tu profesión. Si no tienes un trabajo tradicional, háblanos acerca de lo que haces en la vida. Ejemplo: enfermera, tengo cuatro hijos o surfista jubilada.",
    placeholder:"Me dedico a:",
    inputType:'text'
  },
  {
    icon:'google-maps',
    text_button:'Dónde vivo',
    key:'where_you_live',
    modal:'#modal_edit_basic_profile',
    title:"Dónde vives",
    description:"No importa si estudiaste en casa, de manera regular o de intercambio, nombra la escuela que te hizo ser quien eres hoy.",
    placeholder:"Donde vives:",
    inputType:'text'
  },
  {
    icon:'earth',
    text_button:'Idiomas que hablo',
    key:'languages_spoken',
    modal:'#modal_edit_basic_profile',
    title:"Idiomas que hablas",
    description:"Separados por coma, indica los idiomas que hablas",
    placeholder:"Idiomas que hablas",
    inputType:'text'
  },
  {
    icon:'calendar-month',
    text_button:'Fecha de nacimiento',
    key:'birthdate',
    modal:'#modal_edit_basic_profile',
    title:"Fecha en la que naciste",
    description:"No te preocupes, nadie más podrá ver tu cumpleaños exacto.",
    placeholder:"Fecha de nacimiento:",
    inputType:'date'
  },
  {
    icon:'music',
    text_button:'Mi canción favorita en la secundaria',
    key:'favorite_song',
    modal:'#modal_edit_basic_profile',
    title:"¿Cuál era tu canción favorita en la secundaria?",
    description:"Por muy vergonzoso que sea, comparte la canción que no podías dejar de escuchar cuando eras adolescente.",
    placeholder:"Mi canción favorita en la secundaria:",
    inputType:'text'
  },
  {
    icon:'heart',
    text_button:'Amo',
    key:'i_love',
    modal:'#modal_edit_basic_profile',
    title:"¿Cuál es tu obsesión?",
    description:"Comparte algo que no puedes dejar de hacer (algo bueno). Por ejemplo: focaccia de romero al horno.",
    placeholder:"Me encanta:",
    inputType:'text'
  },
  {
    icon:'lightbulb',
    text_button:'Dato curioso sobre mi',
    key:'curious_fact',
    modal:'#modal_edit_basic_profile',
    title:"Comparte un dato curioso sobre ti",
    description:"Comparte algo único o inesperado sobre ti. Ejemplo: salí en un video musical o soy malabarista.",
    placeholder:"un dato curioso sobre mi:",
    inputType:'text'
  },
  {
    icon:'star-half',
    text_button:'Mi habilidad menos útil',
    key:'less_useful_skill',
    modal:'#modal_edit_basic_profile',
    title:"¿Cuál es tu habilidad menos útil?",
    description:"Comparte un talento sorprendente, pero sin sentido, que tengas. Ejemplo: sé barajar cartas con una sola mano.",
    placeholder:"Mi habilidad menos útil:",
    inputType:'text'
  },
  {
    icon:'book-open',
    text_button:'El titulo de mi bigrafía sería',
    key:'biografy',
    modal:'#modal_edit_basic_profile',
    title:"¿Cuál sería el título de tu biografía?",
    description:"Si alguien escribiera un libro sobre tu vida, ¿cuál sería el título? Ejemplo: Nací para recorrer el mundo o Crónicas de la mamá de un perrito.",
    placeholder:"el título de tu biografía sería:",
    inputType:'text'
  },
  {
    icon:'alarm',
    text_button:'A qué dedico demasiado tiempo',
    key:'spend_time',
    modal:'#modal_edit_basic_profile',
    title:"¿A qué dedicas demasiado tiempo?",
    description:"Comparte una actividad o pasatiempo al que dedicas mucho de tu tiempo libre. Ejemplo: ver videos de gatitos o jugar al ajedrez.",
    placeholder:"Dedico demasiado tiempo a:",
    inputType:'text'
  },
  {
    icon:'paw',
    text_button:'Mascotas',
    key:'pets',
    modal:'#modal_edit_basic_profile',
    title:"¿Tienes alguna mascota?",
    description:"Comparte las mascotas que tienes y sus nombres. Ejemplo: tengo una gata con manchas que se llama Whiskers o Leonardo, mi tortuga veloz.",
    placeholder:"Mascotas:",
    inputType:'text'
  },
]);
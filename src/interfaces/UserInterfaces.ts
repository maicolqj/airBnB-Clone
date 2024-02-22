export interface OptionProfile {
    icon: string;
    text_button?:string,
    key: string;
    modal?:string;
    title?:string;
    description?:string;
    placeholder?: string;
    inputType?:"text" | "textArea" | "date"
  }
  
  export interface ItemInterestProfile {
    id?:number,
    icon?: string;
    name?:string,
  }
  
  export interface InterestProfiles {
    interests: ItemInterestProfile|[]
    sports: ItemInterestProfile|[]
  }
  
  
  export interface AdditionalInfoUser {
    birthdate?: string;
    show_birthdate?: string;
    dedicated_to?: string;
    favorite_song?: string;
    curious_fact?: string;
    pets?: Array<any>;
    where_student?: string;
    spend_time?: string;
    less_useful_skill?: string;
    i_love?: string;
    biografy?: string;
    languages_spoken?: string;
    where_you_live?: string;
    over_you?:string
  }
  
  export interface User {
    id?: Number
    name?: string;
    email?: string;
    phone?:string;
    password?: string;
    token?: string;
    image?: string;
    device_name?: string;
    additional_information_user?:AdditionalInfoUser
    user_interests?:Array<any>
    user_sports?:Array<any>
    is_host_user?: Boolean
    reviews?:number
    age_in_pltform?:number
  }
  
  export interface UserIdentity {
    front_face_image_url:string
    back_face_image_url: string
    country_id: number
    state_type_id: number
    user_id: number
    document_type_id:number
    country:any
    user:any
    document_type:any
    
  }
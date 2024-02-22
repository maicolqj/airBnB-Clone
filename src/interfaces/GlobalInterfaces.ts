// Generated by https://quicktype.io

export interface User {
    id: Number
    name: String,
    image: String
}


export interface Publication {
    id:                    number;
    title:                 string;
    slug:                  string;
    description:           string;
    user_id:               number;
    category_id:           number;
    state_type_id:         number;
    accommodation_type_id: number;
    automatic_reserve:     string;
    guest_photo_required:  string;
    city_id:               number;
    policie_type_Id:       null;
    damage_insurance:      null;
    created_at:            string;
    updated_at:            string;
    images:                Image[];
    rel_ubicacion:         RelUbicacion;
    price:                 Price;
    qualification: number;
    user: User;
    details: Array <Detail>
    city: City
    rel_categoria: Category
    is_favorite:boolean
}

export interface Category {
    id: number
    name: string
    icon: string
    selected: Boolean
}

export interface City {
    id: number;
    name: string;
}

export interface Image {
    publication_id: number;
    url:            string;
}

export interface Price {
    id:             number;
    publication_id: number;
    base:           number;
}

export interface RelUbicacion {
    publication_id:    number;
    address:           string;
    address_component: string;
    longitude:         string;
    latitude:          string;
}



export interface FilterData {
    adultos?:   number;
    ninos?:     number;
    bebes?:     number;
    mascotas?:  number;
    checkin?:   string | null;
    checkout?:  string | null;
    city?:      any;
    price_min?: number;
    price_max?: number;
}

export interface Detail {
    id: number
    name: string
    type: Type
    quantity: number
    new_quantity: number
    publication_id: Number
    icon: string
    value: number
    visible_in_subtitle: number
    required_price: Boolean
    price: number
}

export interface Type {
    id: number
    name: string,
    icon: string
    description: string
    default_quantity: number
    selectable_on_reservation: Boolean
    group_detail: GroupDetail
    fields: string

}

export interface GroupDetail {
    id: number
    singular_name: string
    plural_name: string
}

export interface Field {
    id: number
    name: string
    label: string
    regex: string
    type: string,
    value: any
    options: any[]
}
export interface DetailField {
    id: number
    name: string
    fields: Field[]
    position: number
}

export interface SearchPublication {
    publications: Array<Publication> | []
    isMorePage:boolean
    isLoading: boolean
    limit:number
    page:number
}

export interface respApi {
    code:number,
    data:any,
    message:string,
    status:boolean
}

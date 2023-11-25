// Generated by https://quicktype.io

export interface SearchPublications {
    status:  boolean;
    data:    Publication[];
    message: string;
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
    page?:      number;
    limit?:     number;
    adultos?:   number;
    ninos?:     number;
    bebes?:     number;
    mascotas?:  number;
    category: string;
    // city:      string;
    // price_min: number;
    // price_max: number;
    // checkin:   string;
    // checkout:  string;
}

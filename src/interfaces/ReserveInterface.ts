import { Publication } from "./GlobalInterfaces"
import { User } from "./UserInterfaces"

export interface DataSearchReserve {
    limit:number
    page:number
    isMorePage:boolean
    isLoading:boolean
    reserves:Array<Reserve> | []
}


export interface State {
    id: number,
    name: string,
    color: string,
    flow: State
}

export interface ReserveDays {
    id: number,
    day: string,
}

export interface Reserve {
    id:number,
    publication_id:number,
    publication:Publication
    state_type_id:number,
    payment_type_id:number,
    guest_id:number,
    start_date:string,
    end_date:string,
    state_type:State,
    rel_huesped:User,
    price:number,
    payment:any,
    reserve_days:Array<ReserveDays>
    guest_quantity: number
    match_title_response:string
    can_chat:boolean
}
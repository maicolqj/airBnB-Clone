import { DefaultSearch } from "./GlobalInterfaces"
import { User } from "./UserInterfaces"

export interface Message {
  id: Number
  to_user_id: Number
  message: String
  to_user: User
  from_user: User
  from_user_id: Number
  is_read: Number
}
  
export interface Contact {
  reserve_id: Number
  messages: Array<Message>
  to_user_id: Number
  from_user: User
  from_user_id: Number
  isSelected: Boolean
  to_user: User
}

export type SearchMessages = DefaultSearch & {
  messages: Array<Message>
}
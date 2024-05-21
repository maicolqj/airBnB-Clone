import React, { createContext,useContext,useState } from 'react';
import useFetchApi from '../hooks/useFetchApi';
import { Contact, Message, SearchMessages } from '../interfaces/Chat';
import { AuthContext } from './AuthContext';

type ChatContextProps = {
    optionContact:any
    getContacts: (isRefresh?:boolean) => void
    contacts:Array<Contact>
    currentContact:Contact|undefined
    setCurrentContact:Function
    loadingContacts:boolean
    getMessages:(isRefresh?:boolean) => void,
    searchMessage:SearchMessages,
    loadingSendMessage:boolean,
    sendMessage:(message:string,isNewContact?:boolean) => void,
    updateSearchMessage: (data: Partial<SearchMessages>) => void
}


export const ChatContext = createContext({} as ChatContextProps);


export const  ChatProvider = ({ children }:  any) =>{
    const {user} = useContext(AuthContext)
    // hook para las peticiones fetch
    const {fetchApi} = useFetchApi()
    // Para la lista de contactos, con los que se ha escrito algun mensaje
    const [contacts, setContacts] = useState<Array<Contact>|[]>([])
    // Para manipular la pagina y limite de la consulta de contactos
    const [optionContact, setOptionContacts] = useState<any>({
        page:0,
        limit:10,
        isMorePage:true
    })
    // Para saber si se está haciendo petición para consultar los ocntactos
    const [loadingContacts, setLoadingContacts] = useState<boolean>(false)
    // para saber cual es el contacto seleccionado
    const [currentContact, setCurrentContact] = useState<Contact|undefined>()
    // mensajes del current contact
    const [searchMessage,setSearchMessage] = useState<SearchMessages>({
        page:0,
        limit:50,
        isLoading:false,
        isMorePage:true,
        messages:[]
    })
    // para saber cuando se este enviando un mensaje
    const [loadingSendMessage,setLoadingSendMessage] = useState(false)

    const getContacts = async (isRefresh=false)=>{
        try {
            if ((loadingContacts || !optionContact.isMorePage) && !isRefresh) {
                return
            }
            setLoadingContacts(true)
            const page = isRefresh ? 1 : optionContact.page + 1

            let resp = await fetchApi(`/user/get-reserves-mmessage/${page}/${optionContact.limit}`,{
                method:'GET',
            })
            if (resp.status) {
                let newContact = [] as Contact[]
                if (!isRefresh) {
                    // let newContact = [] as Contact[]
                    contacts.forEach(contact =>{
                        if (!resp.data.data.some((item:Contact) => contact.reserve_id == item.reserve_id)) {
                            newContact.push(contact)
                        }
                    })
                }
                setContacts([...newContact, ...resp.data.data])

                let isMorePage = optionContact.isMorePage
                if (resp.data.data.length < optionContact.limit) {
                    isMorePage = false
                }
                setOptionContacts((prevData:any) => {
                    return {...prevData,page:page,isMorePage:isMorePage}
                })
            }
        } catch (error:any) {
            console.log(error?.message);
        } finally{
            setLoadingContacts(false)
        }
    }


    const updateSearchMessage =  (data: Partial<SearchMessages>) => {
        setSearchMessage((prev) => {
          return {
            ...prev,
            ...data
          };
        });
    };

    const getMessages = async (isRefresh?:boolean) =>{
        try {
            if ((searchMessage.isLoading || !searchMessage.isMorePage || !currentContact) && !isRefresh) {
                return
            }
            updateSearchMessage({isLoading:true})
            const page = isRefresh ? 1 : searchMessage.page + 1
            let resp = await fetchApi(`/user/get-message/${currentContact?.reserve_id}/${page}/${searchMessage.limit}`,{
                method:'GET',
            })
            if (resp.status) {

                let uniqueNewData = [] as Message[]
                searchMessage.messages.forEach(message =>{
                    if (!resp.data.data.some((item:Message) => message.id == item.id)) {
                        uniqueNewData.push(message)
                    }
                })

                let isMorePage = searchMessage.isMorePage as boolean
                if (resp.data.data.length < searchMessage.limit) {
                    isMorePage = false
                }
                // console.log('getMessages',resp);
                
                updateSearchMessage({
                    page:page,
                    isMorePage:isMorePage, 
                    messages: isRefresh ? resp.data.data : [...resp.data.data,...uniqueNewData]
                })
            }

        } catch (error:any) {
            console.log(error?.message);
        }finally{
            updateSearchMessage({isLoading:false})
        }


    }

    const sendMessage = async (message:string, isNewContact?:boolean) =>{
        try {
            if (!currentContact) {
                return
            }
            setLoadingSendMessage(true)
            const params = {
                reserve_id: currentContact.reserve_id,
                message
            }
            let resp = await fetchApi(`/user/save-message`,{
                method:'POST',
                body:params
            })
    
            if (resp.status) {
                let newMessage = [...searchMessage.messages]
                if (user) {
                    let toUser = null;
                    if (user.id == currentContact.to_user_id) {
                        toUser = currentContact.from_user
                    }else {
                        toUser = currentContact.to_user
                    }
                    newMessage.push({
                        id: Math.random(),
                        message,
                        from_user_id: user.id,
                        from_user: {
                            id: user.id,
                            name: user.name,
                            image: user.image,
                            email: user.email
                        },
                        to_user_id: toUser.id,
                        to_user: toUser,
                        is_read: 1
                    })
                    updateSearchMessage({messages:newMessage})
                }
                if (isNewContact) {
                    const validateContact = contacts.some(existingItem => (existingItem.reserve_id === currentContact.reserve_id));
                    if (!validateContact) {
                        const newData = [currentContact,...contacts]
                        setContacts(newData)
                    }
                }
                
            }
        } catch (error:any) {
            console.log(error?.message);
        }finally{
            setLoadingSendMessage(false)
        }
    }

    const clearStore = () => {
        setContacts([])
        setCurrentContact(undefined)
    }
    return (
        <ChatContext.Provider value={{
            optionContact,
            getContacts,
            contacts,
            currentContact,
            setCurrentContact,
            loadingContacts,
            getMessages,
            searchMessage,
            sendMessage,
            loadingSendMessage,
            updateSearchMessage
        }}>
            { children }
        </ChatContext.Provider>
    )

}
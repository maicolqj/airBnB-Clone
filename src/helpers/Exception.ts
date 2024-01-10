export const throw_if = (condition:boolean, mesage:string)=>{
    if (condition) {
        throw new Error(mesage);
    }
}

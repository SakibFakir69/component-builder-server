import { IUser } from "./user.interface"
import { User } from "./user.model"









const createUser =async (payload:Partial<IUser>)=>{

    const result = await User.create(payload);
    return result;

}

// update user 
const updateUser = async (payload:Partial<IUser>)=>{

    const {name} = payload;
    


}




export const userServices = {
    createUser,

}
import { useAuth } from "./useAuthContext";

const addPet = () => {
    const { user, token } = useAuth();
    const newPet = { type: "placeholder" };

    const headersConfig = {
        headers: {
            authorization: `Bearer ${token}`,
        }
    }
    const addPet = async () => {
            const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/pets`, newPet, {headers: {authorization: `Bearer ${token}`}})
    }

    return 
       
    <div>add New Pet</div>
    
};

export default addPet;

import { useAuth } from "./useAuthContext";

const addPet = () => {
    const { user, token } = useAuth();
    const newPet = { type: "placeholder" };

    const headersConfig = {
        headers: {
            authorization: `Bearer ${token}`,
        }
    }
    const addPet = () => {
            const res = await axios.post("http://localhost:8080/pets", newPet, {headers: {authorization: `Bearer ${token}`}})
    }

    return 
       
    <div>add New Pet</div>
    
};

export default addPet;

import UsersList from "./UsersList";
import PetsList from "./PetsList";
import "./AdminDash.css";
import AddPet from "./AddPet";
import { useState } from "react";

const AdminDash = () => {
    const [render, setRender] = useState(false);

    return (
        <div className="admin_dash">
            <h1>Admin Dashboard</h1>
            <AddPet render={()=>setRender(!render)}/>
            <UsersList />
            <PetsList render={render} />
        </div>
    );
};

export default AdminDash;

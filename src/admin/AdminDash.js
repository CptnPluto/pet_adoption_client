import UsersList from "./UsersList";
import PetsList from "./PetsList";
import "./AdminDash.css";
import AddPet from "./AddPet";

const AdminDash = () => {
    

    return (
        <div className="admin_dash">
            <h1>Admin Dashboard</h1>
            <AddPet />
            <UsersList />
            <PetsList />
        </div>
    );
};

export default AdminDash;

import UsersList from "./UsersList";
import PetsList from "./PetsList";
import NavButton from "../components/NavButton";
import "./AdminDash.css";
import Modal from "../components/Modal";
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

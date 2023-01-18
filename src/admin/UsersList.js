import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import usePetsListContext from "../Hooks/usePetsListContext";
import NavButton from "../components/NavButton";
import "./AdminDash.css";
import useAuthContext from "../Hooks/useAuthContext";

const UsersList = () => {
    const { token } = useAuthContext();
    const [users, setUsers] = useState([]);
    const [show, setShow] = useState(false);
    const [chosenUser, setChosenUser] = useState("");
    const { myPets, savedPets, fetchMyPets, fetchSavedPets } =
        usePetsListContext();

    const fetchUsers = async () => {
        try {
            console.log("Token for fetchUsers: ", token);
            const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/all`, {
                withCredentials: true,
            });
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const showDetails = async (user) => {
        console.log(user);
        setChosenUser(user);
        await fetchMyPets(user.id);
        await fetchSavedPets(user.id);
        setShow(true);
    };

    return (
        <>
            <h3 className="title">Users List</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 &&
                        users.map((user) => {
                            return (
                                <tr
                                    className="entry"
                                    key={user.id}
                                    onClick={() => showDetails(user)}
                                >
                                    <td>{user.firstName}</td>
                                    <td>{user.email}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <>
                {show && (
                    <Modal
                        className="admin_modal"
                        show={show}
                        onClose={() => setShow(false)}
                    >
                        <h3>User Details</h3>
                        <table className="table">
                            <thead>
                                <th></th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>First Name: {chosenUser.firstName}</td>
                                </tr>
                                <tr>
                                    <td>Last Name: {chosenUser.lastName}</td>
                                </tr>
                                <tr>
                                    <td>Email: {chosenUser.email}</td>
                                </tr>
                                <tr>
                                    <td>
                                        Profile Photo: {chosenUser.photoURL}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Phone Number: {chosenUser.phoneNumber}
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Date Created: {chosenUser.dateCreated}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <h3>User's Pets</h3>
                        <table className="table">
                            <thead>
                                <th>Name</th>
                                <th>Breed</th>
                                <th>Status</th>
                                <th>Details</th>
                            </thead>
                            <tbody>
                                {myPets &&
                                    myPets.map((pet) => {
                                        return (
                                            <tr className="entry" key={pet.id}>
                                                <td>{pet.name}</td>
                                                <td>{pet.breed}</td>
                                                <td>{pet.adoptionStatus}</td>
                                                <td>
                                                    <NavButton
                                                        navLink="/pets"
                                                        params={pet.petId}
                                                    >
                                                        View Details
                                                    </NavButton>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        <h3>User's Saved Pets</h3>
                        <table className="table">
                            <thead>
                                <th>Name</th>
                                <th>Breed</th>
                                <th>Status</th>
                                <th>Details</th>
                            </thead>
                            {savedPets &&
                                savedPets.map((pet) => {
                                    return (
                                        <tr className="entry" key={pet.id}>
                                            <td>{pet.name}</td>
                                            <td>{pet.breed}</td>
                                            <td>{pet.adoptionStatus}</td>
                                            <td>
                                                <NavButton
                                                    navLink="/pets"
                                                    params={pet.petId}
                                                >
                                                    View Details
                                                </NavButton>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </table>
                    </Modal>
                )}
            </>
        </>
    );
};

export default UsersList;

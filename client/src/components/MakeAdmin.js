import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const MakeAdmin = (props) => {

    const data = props.data;

    //make a req to make the user of a given id an admin 
    const makeAdminRequest = async (user_id) => {
        console.log(user_id);

        if (user_id === null) {
            toast.error("no user available,add user first");
            return;
        }
        try {
            const response = await axios.patch("http://localhost:5000/api/admin/add-admin", {
                user_id: user_id,
            })

            // console.log(response);
            toast.success(response.data.message, { duration: 4000 });
            props.fetchUsers();
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Available Users To Make Admin
                </button>
                <ul className="dropdown-menu dropdown-menu-dark">
                    {data.map((user) => (
                        <li onClick={() => { makeAdminRequest(user._id) }} key={user._id}><a className="dropdown-item active">{user.username}</a></li>
                    ))}
                </ul>
            </div>


            <Toaster />
        </div>
    )
}

export default MakeAdmin
import { useLoaderData } from "react-router-dom";

const UserPage = () => {
    const { userName, email, profilePicture, bio} = useLoaderData();

    const editUserName = () => {

    }

    const editEmail = () => {
        
    }

    const editBio = () => {

    }

    return (
        <>
            <h1>{userName.toUpperCase()}'s PROFILE</h1>
            <img src={profilePicture} alt="Profile Picture" />
            <form onSubmit={editUserName}>

            </form>
            <form onSubmit={editEmail}>

            </form>
            <form onSubmit={editBio}></form>
        </>
    )
}

//User GET
const userLoader = async () => {
    const user = await fetch(`api/dashboard/user`);
    const userRes = await user.json();

    console.log(userRes)
    return userRes;
}

export {
    UserPage as default,
    userLoader
};
import classes from "./AppLayout.module.scss";
import Topbar from "../../components/topbar/Topbar.component";
import { Outlet } from "react-router-dom";
import {useEffect, useState} from 'react';
import { useApiData } from "../../api/api";
import useAuth from "../../hooks/useAuth";

/**
 * @component
 * @name Layout
 * @description Navigation Bar and a main content that holds the differents pages.
 * @param {*} props props.onLogin: function to change if user is logged or not for logout function.
 * @returns
 */

function AppLayout (props) {

    const {auth} = useAuth();
    const {getAllUsers} = useApiData();

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [users, setUsers] = useState();


    useEffect(() => {

      getAllUsers().then(
        (res) => {
          const usersLoaded = res.data;
          if (!usersLoaded) {console.log('not user loaded');}
          const userIndex = usersLoaded.findIndex((u)=>u.idUsers === auth.user.id);
          if (userIndex===-1) {console.log('user Not Found')}
          setUser(usersLoaded[userIndex]);
          usersLoaded.splice(userIndex, 1);
          setUsers(usersLoaded);
          setIsLoading(false);  }
      ).catch((err) => {
        console.log(err.message);
      });
    }, []);


    return( 
        
    <div className={classes.container}>
        { (isLoading) ? <div>Loading</div> : <><div className={classes.navigation}>
                <Topbar adminAccess={props.adminAccess} userImage={user.profilePicture} />
            </div><main className={classes.main}>
                    <Outlet context={{user, users}}/>
                </main></>

        }
    </div>
    )
}

export default AppLayout;

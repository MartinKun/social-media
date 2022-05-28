import classes from "./ProfileForm.module.scss";
import { NoAccounts, AutoStories, LockReset, Photo } from "@mui/icons-material";
import  api from "../../api/axios";

// recuperar el user
// dar los valores a la informacion
// cuando doy click en algo se extiende el formulario
// validar formulario
// enviar datos




export default function ProfileForm({user}) {

  const submitHandler = async ( event )=>{
    event.preventDefault();
    const fd = new FormData();
    const idUser =  user.id;
    console.log(event.target.cover.files[0]);
    console.log(event.target.avatar.files[0])
    fd.append("cover", event.target.cover.files[0]);
    fd.append("avatar", event.target.avatar.files[0]);
    fd.append("bio", event.target.bio);
    console.log(fd.cover);
    try {
      const response = await api.put("/user" + "/" + idUser);
      console.log('Login Response: ', response.data);
      if (!response) {
        console.log('No answer');
        return;
    
    }  
  } catch(err) {
    console.log(err);
  }
   console.log(fd);
  }
  return (
    <form onSubmit = {submitHandler}>
      <div className={classes.sidebarList}>
        <div className={classes.sidebarListItem}>
          <label htmlFor="bio">
          <AutoStories className={classes.sidebarIcon} />
          <span className={classes.sidebarListItemText}>
            Changer biographie
          </span>
          </label>
          <input id="bio" type="textarea"/>
        </div>
        <div className={classes.sidebarListItem}>
          <label htmlFor="avatar">
          <Photo className={classes.sidebarIcon} />
          <span className={classes.sidebarListItemText}>
            Changer photo profile
          </span>
          </label>
          <input
                accept="image/*"
                id="avatar"
                name="avatar"
                type="file"
              />
        </div>
        <div className={classes.sidebarListItem}>
          <label htmlFor="cover">
          <Photo className={classes.sidebarIcon} />
          <span className={classes.sidebarListItemText}>
            Changer photo header
          </span>
          </label>
          <input
                accept="image/*"
                id="cover"
                name="cover"
                type="file"
              />
        </div>
        <div className={classes.sidebarListItem}>
          <label htmlFor="pass">
          <LockReset className={classes.sidebarIcon} />
          <span className={classes.sidebarListItemText}>
            Changer Mot de Pas
          </span>
          </label>
          <input id="pass" type="password"/>
        </div>
        <div className={classes.sidebarListItem}>
          <div> <NoAccounts className={classes.sidebarIcon} />
          <span className={classes.sidebarListItemText}>
            Demander suppresion compte
          </span>
          </div>
        </div>
        <button type="submit">Modifier</button>
      </div>
    </form>
  );
}

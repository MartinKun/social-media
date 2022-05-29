import classes from "./ImageForm.module.scss";
import { Photo, Check, Clear } from "@mui/icons-material";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ROLES } from "../../helpers/rolesList";

export default function ImageForm({ user, imageName, className, labelDesc }) {
  const axios = useAxiosPrivate();
  const { auth } = useAuth();
  const allowEdition =
    user.id === auth.user.id || auth.user.role === ROLES.admin;

    
  // EDIT textarea
  const [onEdit, setOnEdit] = useState(false);

  // Allow Edition
  const allowEditionHandler = () => {
    if (allowEdition){
    setOnEdit(true);
    }
  };

  // Cancel Edition
  const cancelHandler = () => {
    setOnEdit(false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const idUser = user.id;
    const putRoute = "/user/" + idUser;
    const fd = new FormData();

    if (imageName === "cover" && event.target.cover?.files[0]) {
        fd.append("cover", event.target.cover.files[0]);
    } else if (imageName === "avatar" && event.target.avatar?.files[0]) {
        fd.append("avatar", event.target.avatar.files[0]);
    } else {
        console.log("Pas de d'image");
        return;
    }
    try {
      const response = await axios.put(putRoute, fd);
      if (!response) {
        console.log("No answer");
        return;
      }
      console.log("Modifié!");
    } catch (err) {
      console.log(err);
    }
  };


  return (
       <form className = {`${classes.imageForm} ${className}`}>
          <div onClick={allowEditionHandler}className={classes.sidebarListItem}>
            <label className={classes.imageForm_item}>
            <Photo className={classes.imageForm_icon} />
            <span className={classes.sidebarListItemText}>
              {labelDesc}
            </span>
            </label>
            {onEdit? 
                <input
                  accept="image/*"
                  id={imageName}
                  name={imageName}
                  type="file"
                /> : null
            }
          </div>
          {onEdit ? (
        <div className={classes.btn_section}>
          <Clear onClick={cancelHandler} className={classes.btn_cancel}/>
           <Check onClick={submitHandler} className={classes.btn_submit} />
        </div>
      ) : null}
    </form>)
}

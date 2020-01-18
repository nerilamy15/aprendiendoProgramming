import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SnackbarMessages from "./SnackbarMessages";
import { useForm } from "react-hook-form";
import { TextField, Button, Typography, IconButton } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editProfile } from "../actions/userActions/editProfileAction";
import { postImage } from "../actions/uploadImageAction";
import { clearMessages } from "../actions/messagesActions";
const EditProfile = props => {
  /////////////////////////////////////////////////////////////
  const useStyles = makeStyles(() => ({
    formContainer: {
      margin: "15vh auto",
      width: "400px",
      height: "400px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      animation: "drop 1s ease",
      boxShadow: "0 0.5px 0 0 #ffffff inset, 0 1px 2px 0 #b3b3b3",
      backgroundColor: "white"
    },
    buttons: {
      border: "solid 2px #8b70d2",
      marginRight: "5px",
      color: "#8b70d2",
      marginTop: "20px",
      "&:hover": {
        backgroundColor: "#8b70d2 !important",
        border: "solid 2px white",
        color: "white"
      }
    },
    textArea: {
      backgroundColor: "white"
    }
  }));
  const classes = useStyles();
  const { formContainer, buttons, textArea } = classes;
  //////////////////////////////////////////////////////////////////////////////
  const formDefaultValues = {
    editedUserName: "",
    editedEmail: ""
  };
  const [formValues, setFormValues] = useState(formDefaultValues);
  const { editedUserName, editedEmail } = formValues;
  //////////////////////////////////////////////////////////////////////////////////
  const history = useHistory();
  ////////////////////////////////////////////////////////////////////////////////////////
  const handleChange = e => {
    const target = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    setFormValues({ editedUserName: userNameOrName, editedEmail: email });
  }, []);
  ////////////////////////////////////////////////////////////////////
  const authReducer = useSelector(state => state.authReducer);
  const messagesReducer = useSelector(state => state.messagesReducer);
  const { token, name, email, id, userName, avatar } = authReducer;

  const userNameOrName = userName ? userName : name;

  const { messageCode } = messagesReducer;
  const dispatch = useDispatch();
  const editProfileDispatch = () => {
    dispatch(editProfile({ token, editedUserName, editedEmail, id }));
    setFormValues({ editedUserName: "", editedEmail: "" });
    setTimeout(() => {
      history.push("/");
    }, 1500);
  };

  //////////////////////////////////////////////////////////////////////
  const clearMessagesDispatch = () => dispatch(clearMessages());
  /////////////////////////////////////////////////////////////////////////////////////////
  const { register, handleSubmit, errors } = useForm();
  /*const changeAvatar = e => {
    const image = e.target.files[0];
    const avatar = new FormData();
    avatar.append("avatar", image);
    dispatch(postImage({ id, avatar }));
  };*/
  /* const handleAvatarChange = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };*/
  ///////////////////////////////////////////////////////////////////////////////////
  return !token ? (
    <Redirect to="/" />
  ) : (
    <>
      <div className={formContainer}>
        <form
          enctype="multipart/form-data"
          onSubmit={handleSubmit(editProfileDispatch)}
        >
          <Typography>Edit your profile </Typography>
          <div>
            <div>
              <img src={avatar} width={100} height={100}></img>
            </div>
            <TextField
              inputRef={register({})}
              label="UserName"
              onChange={handleChange}
              onFocus={clearMessagesDispatch}
              type="text"
              name="editedUserName"
              value={editedUserName}
              margin="normal"
              error={errors.result}
              helperText={errors?.userDefault?.message}
            ></TextField>
          </div>
          <div>
            <TextField
              label="Email"
              onChange={handleChange}
              onFocus={clearMessagesDispatch}
              type="text"
              name="editedEmail"
              value={editedEmail}
              margin="normal"
              error={errors.result}
              helperText={errors?.emailDefault?.message}
            ></TextField>
          </div>
          <div>
            {/*<input
              name="avatar"
              type="file"
              id="imageInput"
              hidden="hidden"
              onChange={e => changeAvatar(e)}
            ></input>
            {
              <IconButton onClick={handleAvatarChange}>
                <EditOutlinedIcon />
              </IconButton>
            }*/}
          </div>
          <div className="form-group">
            <Button className={buttons} type="submit">
              Edit
            </Button>
            <Button className={buttons} onClick={() => history.push("/")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
      <div>{<SnackbarMessages />}</div>
      {/* <div>{messageCode === 270 && <SuccessMessage />}</div>*/}
      {messageCode === 500 && history.push("/error")}
    </>
  );
};

export default EditProfile;

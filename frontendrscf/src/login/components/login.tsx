import React, {useState } from "react"
import {useAuth} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {ROLES} from '../../util/constant';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  TextField,
  Divider,
  Snackbar,
  Container,
  InputLabel, 
  Select, 
  MenuItem
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { UserType } from "../../util/variableTypes";

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const validationSchema = yup.object({
    userName: yup
      .string()
      .required('Enter a valid user name'),
    userPassword: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length').required('Enter a password'),
    role: yup
      .string()
      .required('Select a role'),
  });

  const useStyle = makeStyles((theme)=>({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          borderColor: "#5cdb95 !important",
          Color: "#EDF5E1 !important"
      }},
      input:{
          color:"#EDF5E1 !important"
      },
      label:{
        color: "#EDF5E1 !important",
        fontSize:"17px"
      },
      notchedOutline:{
        borderWidth: "2px",
        borderColor: "#5cdb95 !important",
        color:"#EDF5E1 !important"
      },
      button: {
        backgroundColor: "#5cdb95",
        color: "#05386B",
        justifySelf:"center",
        marginTop: "20px",
        marginleft: "100px",
        "&:hover" :{
            backgroundColor:"#EDF5E1"
        }
    },
    divide:{
        background:"#EDF5E1 !important",
    }
  }))
  
function LoginView() {

    const {login} = useAuth()
    const [err,setErr] = useState(0)
    const [open ,setOpen] = useState(false)
    const [openErr,setOpenErr] = useState(false)
    const [isRole,setIsRole] = useState(true)
    const [Crole,setCrole] = useState("Loading...")
    const style = useStyle()

    const navigate = useNavigate();

    const formik = useFormik({
      initialValues: {
        userName:"",
        userPassword:"",
        role:"",
        userEmail:"",
        userID:"",
        waddress:""
      },
      validationSchema: validationSchema,
      onSubmit: handleLogin
    })

    async function handleLogin(values: UserType) {
      Alert("login");
      navigate("/trackProduct")
      // navigate("/ProductView")

        // try{
        // await login( values.userName,values.userPassword, values.role )
        //     setErr(0) 
        //     useNavigate.call("./home/trackproduct")
        //     setOpen(true)
        // }
        // catch(e){
        //     setErr(1)
        //     setOpenErr(true)
        //   }
      
      }
        // This is OK!
        //  function handleClose (reason:string)  {
        //     if (reason === 'clickaway') {
        //       return;
        //     }
        //     setOpen(false)
        //     setOpenErr(false)
        // }

      const handleClose = (event:React.ChangeEvent, reason:string) => {
          if (reason === 'clickaway') {
            return;
          }
          setOpen(false);
          setOpenErr(false);
      };

      return (<div style = {{
          position:"absolute",
          top:"0",
          left:"0",
          bottom:"0",
          right:"0",
          height:"100%",
          width:"100%",
          backgroundColor:"#5cdb95"
        }}><Container maxWidth = "xs" style = {{ marginTop: "100px"}}>
        {open &&<Snackbar open={open} autoHideDuration={6000} onClose={()=>handleClose}>
                <Alert onClose={handleClose} severity="success">
                  Login Successfully!!
                </Alert>
                </Snackbar>}
                {<Snackbar open={openErr} autoHideDuration={6000} onClose={()=>handleClose}>
                <Alert onClose={handleClose} severity="error">
                   {err}
                </Alert>
                </Snackbar>}
       <Paper
        style = {{
          padding:"20px",
          justifyContent:'center',
          alignItems:'center',
          background:"#05386B",
          color:"#EDF5E1",
          height: "540px"
        }}>

        <form onSubmit = {formik.handleSubmit}>
          <Grid container spacing = {2} style = {{
              marginTop: "100px"
          }}>
               
            <Grid container>
                  <Typography variant = "h2" style = {{
                      fontSize: "20px"
                  }}>Login</Typography>
            </Grid>

                <Grid item xs = {12} >
                  <Divider className = {style.divide} />
                </Grid>

                <Grid item xs = {12} style = {{
                    fontSize: "70px",
                }}>
                <i className="fas fa-sign-in-alt" ></i>
                </Grid>

               <Grid item xs = {12}>
               <TextField
                id = "userName"
                name = "userName"
                label = "User Name"
                type = "text"
                variant="outlined"
                InputLabelProps = {{
                    className : style.label,                    
                 }}
                InputProps={{
                  classes: {
                    notchedOutline: style.notchedOutline,
                    input : style.input
                  }
                }}
                value={formik.values.userName}
                onChange = {formik.handleChange}
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}
                />
               </Grid>

               <Grid item xs = {12}>
               <TextField
                   id = "userPassword"
                   name = "userPassword"
                   label = "Password"
                   variant = "outlined"
                   type = "password"
                   value={formik.values.userPassword}
                   onChange={formik.handleChange}
                   InputProps = {{
                       classes:{
                          notchedOutline: style.notchedOutline,
                          input:style.input
                       }
                   }}
                   InputLabelProps = {{
                       className: style.label
                   }}
                   error = {formik.touched.userPassword && Boolean(formik.errors.userPassword)}
                   helperText = {formik.touched.userPassword && formik.errors.userPassword}/>
               </Grid>

              <Grid item xs={8}>
              {isRole?<TextField
                    id = "role"
                    name = "role"
                    fullWidth
                    select
                    variant = "outlined"
                    label="Select Role:"
                    className = {style.notchedOutline}
                    InputLabelProps = {{
                        className : style.label,
                        
                     }}
                     InputProps={{
                         classes: {
                           notchedOutline: style.notchedOutline,
                           input : style.input
                         }
                        }}
                        value={formik.values.role}
                        onChange={formik.handleChange}
                  >
                    {ROLES.map( (role , index)=>(
                      <MenuItem value={role} key = {index}>{role}</MenuItem>
                    ))}
               </TextField>:<Typography variant = "h4">{Crole}</Typography>}
              </Grid>

              {/* <Grid item xs = {12}>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.role}
                  label="Age"
                  onChange={formik.handleChange}
                  error = {formik.touched.role && Boolean(formik.errors.role)}
                >
                  <MenuItem value={1}>Administrator</MenuItem>
                  <MenuItem value={2}>Supplier</MenuItem>
                  <MenuItem value={3}>Manufacturer</MenuItem>
                  <MenuItem value={4}>Distributer</MenuItem>
                  <MenuItem value={5}>Retailer</MenuItem>
                  <MenuItem value={6}>Customer</MenuItem>
                </Select>
               </Grid> */}

               <Grid container justifyContent = "center" alignItems = "center">
                   <Button type = "submit" className = {style.button} size = "large" >Login</Button>
                   </Grid>

                   <Grid container justifyContent = "center" alignItems = "center">
                   <Link href="./#/signup" variant="body2" style = {{
                       paddingTop: "20px",
                       color:"#EDF5E1",
                       fontSize:"16px"
                   }} underline = "hover">
                      Don't have an account? Sign Up
                    </Link>
                  </Grid>
           </Grid>
           </form>
       </Paper>
       </Container>
       </div>)
}

export default LoginView;
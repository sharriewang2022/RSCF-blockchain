import React, {useState } from "react"
import {useAuth} from "../../contexts/authContext";
import {useNavigate} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {useFormik} from 'formik';
import * as yup from 'yup';
import {
  Typography,
  Paper,
  Link,
  Grid,
  Button,
  TextField,
  Divider,
  Snackbar,
  Container
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { UserType } from "../../util/variableTypes";

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const validationSchema = yup.object({

    email: yup
      .string()
      .email('Enter a valid email'),
    password: yup
      .string()
      .min(8, 'Password should be of minimum 8 characters length').required(),
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
    const style = useStyle()

    const formik = useFormik({
        initialValues: {
          userName:"",
          userPassword:"",
          role:"",
          userEmail:"",
          uid:"",
          waddress:""
        },
        validationSchema: validationSchema,
        onSubmit: handleLogin
        })

    async function handleLogin(values: UserType) {

        try{
        await login( values.userEmail,values.userPassword )
            setErr(0) 
            useNavigate.call("./home/trackproduct")
            setOpen(true)
        }
        catch(e){
            setErr(1)
            setOpenErr(true)
          }
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
                    fontSize: "50px"
                }}>Login</Typography>
          </Grid>

                <Grid item xs = {12} justifyContent = "center" alignItems = "center" >
                <Divider className = {style.divide} />
                </Grid>

                <Grid item xs = {12}  justifyContent = "center" alignItems = "center" style = {{
                    fontSize: "70px",
                }}>
                <i className="fas fa-sign-in-alt" ></i>
                </Grid>

               <Grid item xs = {12} justifyContent = "center" alignItems = "center" >
               <TextField
                id = "email"
                name = "email"
                label = "Email"
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
                value={formik.values.userEmail}
                onChange = {formik.handleChange}
                error={formik.touched.userEmail && Boolean(formik.errors.userEmail)}
                helperText={formik.touched.userEmail && formik.errors.userEmail}
                />
               </Grid>

               <Grid item xs = {12} justifyContent = "center" alignItems = "center">
               <TextField
                   id = "password"
                   name = "password"
                   label = "password"
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


               <Grid container xs = {12} justifyContent = "center" alignItems = "center">
                   <Button type = "submit" className = {style.button} size = "large" >Login</Button>
                   </Grid>

                   <Grid container xs = {12} justifyContent = "center" alignItems = "center">
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
/*colors scheme #05386B #379683 #5cdb95 #8ee4af #EDF5E1 */

import React, {useState} from 'react';
import {useAuth} from '../../contexts/authContext';
import UpdateProfile from "../../login/components/updateProfile";
import {useNavigate, Route} from "react-router-dom"; 
import {TrackProduct} from "../../trace/components/trackProduct";
import {Product} from "../../product/components/product" ;
import "./navbar.scss";
import {About} from "./about";
import {Nav ,Navbar , NavDropdown,Container} from "react-bootstrap";


export function Manufacturer(props:any){

    const [icon, setIcon] = useState(true);
    const [open,setOpen] = useState(false);
    const {logout} = useAuth();

    const handlelogout = async (e : React.MouseEvent<HTMLElement>) => {
      await logout();
      useNavigate.call('./login')
    }
      
    function handleOpen(){
      setOpen(true)
    }

    return(<div style = {{
      height:"100vh",
        backgroundColor:"#5cdb95"
      }}>
       {/* //navbar-expand-lg |xl|lg|md|sm screen stype*/}
      <Navbar expand ="lg" style = {{
              background: "#8ee4af",
              overflow:"visible",
              borderBottom:"4px solid #05386B",
      }} sticky="top" collapseOnSelect>
              <Navbar.Brand style = {{
                marginLeft: "50px",
                color:"#05386B",
                fontWeight: "500",
                fontSize:"22px",
                flexGrow: "10"
              }}>
                Supply Chain
              </Navbar.Brand>
              <Navbar.Toggle style = {{
                border:"none",
                color: "#05386B",
                fontSize:"25px"
              }}  onClick = {() => {setIcon(prev => !prev)}}>
                <i className = {icon? "fa fa-bars":"fa fa-times"} ></i>
              </Navbar.Toggle>
              <Navbar.Collapse>
          <Nav onSelect={() => setIcon(prev => !prev)}>
              <Nav.Link href="./#/home/addproduct" >Add Product</Nav.Link>
              <Nav.Link href="./#/home/trackproduct" >Track Product</Nav.Link>
              <Nav.Link onClick = {handleOpen} >About</Nav.Link>
              {/* drop menu */}
              < NavDropdown title = "Profile">
                <NavDropdown.Item href="./#/home/updateProfile">Update Profile</NavDropdown.Item>
                <NavDropdown.Item onClick = {handlelogout} >Logout</NavDropdown.Item>
            </NavDropdown>
              </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Container>
                <Route path = "/home/profile" Component = {UpdateProfile}></Route>
                <Route path = "/home/trackproduct" Component = {TrackProduct}></Route>
                <Route path = "/home/addproduct" Component = {Product}></Route>
                <About open = {open} setOpen = {setOpen}/>
            </Container>
            </div>
          )
}
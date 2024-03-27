import React,{useEffect ,useState} from "react";
import supplyChainjson from '../../abis/SupplyChainRSCF.json';
import {ethers} from "ethers";
import {makeStyles} from "@material-ui/core/styles";
import {useAuth} from "../../contexts/authContext";
import {useBlock} from "../../contexts/blockContext";
import { SMART_CONTRACT_ADDRESS } from '../../config/sysConfig';
// import QrReader from 'react-qr-reader';
import { TransitionProps } from '@material-ui/core/transitions';
import {
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  Snackbar,
  Box,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Hidden,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props:any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    input: {
        color:" #05386B !important",
        FontWeight:"400",
        fontSize: "20px",
        marginTop:"0px",
        marginBottom:"0px"
    },

    notchedOutline:{
        borderWidth: "2px",
        borderColor: "#C0D9D9 !important",
        color:"#87CEFA !important"
    },

    button: {
        marginLeft: "10px",
        backgroundColor: "#C0D9D9",
        color: "#05386B",
        textTransform: "none",  //not change to capital
        "&:hover" :{
            backgroundColor:"#87CEFA",
        }
    },

    divide: {
        background: "#EDF5E1 !important",
        height:"70px",
    }        
}))

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children?: React.ReactElement;
    },
    ref: React.Ref<unknown>
    ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function FetchLocation(props: any){
    const style = useStyles()      

    const handleClose = () => {
       props.setOpen(false);
   };

    function LocDisp(props:any){
        return(
            <Grid item xs = {12}>
                <Grid container justifyContent = "center">
                    {props.index !== 1 ?<Divider orientation ="vertical" className = {style.divide}/>:null}
                </Grid>
                <Grid container justifyContent = "center">
                <Typography variant = "h6" style = {{
                    color:"#EDF5E1",
                    fontSize:"18px",
                    fontWeight:"350"
                }}>{props.location}</Typography>
                </Grid>
            </Grid>
        )
    }
    return(
    <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
            style: {
                backgroundColor: '#05386B',
            }
        }}
    >
    <DialogTitle id="alert-dialog-slide-title" style = {{
         color: '#EDF5E1',
       }}
    >{"Every Location of this Product:"}</DialogTitle>
    <DialogContent>
       <Grid container>
       {props.locations.map((value: string, index: any) => {
           if(value === '' ){
               return
           }else{
             return <LocDisp location ={value} key = {index} index = {index}/>
        }
        })}
       </Grid>
    </DialogContent>
    <DialogActions >
      <Button onClick={handleClose} size = "small" style = {{
         backgroundColor: "#5cdb95",
         color: "#05386B",         
     }}>
       Close
     </Button>
   </DialogActions>
 </Dialog>)
}

function TrackProductView(){
    const [id,setId] = useState("");
    const {trackProduct, fetchOwner, fetchLocations} = useBlock();
    const {addressToName} = useAuth();
    const [name,setName] = useState("");
    const [date,setDate] = useState("");
    const [cLoc,setCLoc] = useState("");
    const [owner,setOwner] = useState("");
    const [err,setErr] = useState("");
    const [openErr,setOpenErr] = useState(false);
    const [locations,setLocations] = useState(["Enter Product ID first"]);
    const [contract, setContract] = useState<ethers.Contract>();
    const [provider, setProvider] = useState<ethers.providers.JsonRpcProvider>();

    useEffect(() => {
        const loadProvider = async () => {
        let contractAddress = SMART_CONTRACT_ADDRESS;
        // let contractAddress = "0x6517C303e314842baE7e6A345e2A855Ef352d0F1";
        const url = "http://localhost:7545";
        const provider = new ethers.providers.JsonRpcProvider(url);
        const contract = new ethers.Contract(
            contractAddress,
            supplyChainjson.abi,
            provider
        );
        setContract(contract);
        setProvider(provider);
        // console.log(contract);
        };
        loadProvider();
    }, []);

    const trackProductInfo = async (productID:string) => {
        try {
            if(!id || id ==="Search Product ID"){
                window.alert("Need Product ID")
                throw("Need Product ID")
            }
            var dataResult
            if(contract && provider){
                const signer = contract.connect(provider.getSigner());
                dataResult = signer.fetchProductInfo(productID);                
                console.log("Track Product Info:" + dataResult); 
                // const output = await contract.proOutput();
                const productInfo = await contract.ProductMap();
                // fetchProductInfo(productID);
                console.log("Track Product Info:" + productInfo); 
                console.log("Track Product Info:" );
                // dataResult = await contract.fetchProductInfo(productID).call();
                // console.log("Track data Info:" + dataResult);                 
            }            
            if(dataResult){
                const data = dataResult.split(",")
                if(data[0]){ 
                    setOwner("")
                    setName(data[0])
                    setCLoc(data[1])
                    const temp = new Date(data[2]*1000)
                    const dat = temp.getDate();
                    var month = temp.getMonth();
                    var year = temp.getFullYear();
                    var fullDate = dat + "/" +(month + 1) + "/" + year;
                    setDate(fullDate)
                } else {
                    throw("There is no such product ID.")
                }
            }
        }
        catch(error){
            console.log(error);
            setOpenErr(true)
        }
        
    };
    
    async function handleFetchInfo(id: string){
        try {
            if(!id || id ==="Search Product ID"){
                window.alert("Need Product ID")
                throw("Need Product ID")
            }
            const dataRaw = await trackProduct(id)
            const Address = await fetchOwner(id)
            const Locations = await fetchLocations(id)
            const data = dataRaw.split(",")
            setLocations(Locations)
            if(data[0]){
                const ownerRaw = await addressToName(Address)
                // setOwner(ownerRaw)
                setOwner("")
                setName(data[0])
                setCLoc(data[1])
                const temp = new Date(data[2]*1000)
                const dat = temp.getDate();
                var month = temp.getMonth();
                var year = temp.getFullYear();
                var fullDate = dat + "/" +(month + 1) + "/" + year;
                setDate(fullDate)
            }
            else {
                throw("There is no such product ID.")
            }
        }
        catch(error){
            console.log(error);
            setOpenErr(true)
        }
    }

    const handleClose = (event: React.MouseEvent, reason:string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenErr(false)
    };

    async function chatbotStart(id: string){
        window.open("./#/chatbotAppView", "_blank")  
    }

    const style = useStyles();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    return(
        <div style = {{
            position:"absolute",
            top:"10",
            left:"0",
            bottom:"0",
            right:"0",
            height:"100%",
            width:"100%",
          }}>
        {openErr &&<Snackbar open={openErr} autoHideDuration={6000} onClose={()=>handleClose}>
        <Alert onClose={handleClose} severity="error">
            {err}
        </Alert>
        </Snackbar>}

        <Container style = {{ marginTop: "50px",  marginLeft: "100px"}}>
        <div>
        <TextField
            id = "productID"
            name = "productID"
            type = "text"
            placeholder="Searched Product ID"
            variant= "outlined"
            size = "small"
            
            style = {{
                width:"600px",                
                border: "0px solid #05386B",
                color:"#EDF5E1"
            }}

            InputProps={{
                classes : {
                    notchedOutline:style.notchedOutline,
                    input:style.input
                },
                inputProps: { min: 0}
            }} 
            
            onChange = {(e) => setId(e.target.value)}
        />

        <Button className = {style.button} style = {{
            fontSize:"15px",
            color: "#05386B",
            transform:"translateY(30%)",
            cursor: "pointer"
            }} onClick = {() => {handleFetchInfo(id)}}>Search
        </Button>

        <Button className = {style.button} style = {{
            fontSize:"15px",
            color: "#05386B",
            transform:"translateY(30%)",
            cursor: "pointer"
            }} onClick = {() => {chatbotStart(id)}}>Chatbot
        </Button>
    </div>

    <Grid item xs = {12}>
        <Grid container justifyContent = "center" alignItems = "center">
        <Box style = {{
            background:"#05386B",
            marginTop:"50px",
            justifySelf:"center",
            width: "500px",
            padding:"30px",
            color:"#EDF5E1",
            borderRadius: "4px",
            boxShadow: "0px 0px 12px 2px rgba(15, 15, 15, 0.2)"        
        }}>
        <Grid container spacing = {8}>
            <Grid item xs = {12}>
                <Grid container spacing  = {3}  justifyContent = "center" >
                    <Grid item xs = {6}><h5  style = {{fontWeight:"350"}}className = "labelText">Product Name:</h5></Grid>
                    <Grid item xs = {6}><h6 style = {{
                        fontSize:"20px",
                        fontWeight:"350"
                    }}>{name}</h6></Grid>
                </Grid>
            </Grid>

            <Grid item xs = {12}>
                <Grid container spacing  = {3}  justifyContent = "center" >
                    <Grid item xs = {6}><h5  style = {{fontWeight:"350"}}className = "labelText">Current Owner:</h5></Grid>
                    <Grid item xs = {6}><h6 style = {{
                        fontSize:"20px",
                        fontWeight:"350"
                    }}>{owner}</h6></Grid>
                </Grid>
            </Grid>

            <Grid item xs = {12}>
                <Grid container spacing  = {1}>
                    <Grid item xs = {6}><h5 style = {{fontWeight:"350"}}  className = "labelText">Registered on:</h5></Grid>
                    <Grid item xs = {6}><h6 style = {{
                        fontSize:"20px",
                        fontWeight:"350"
                    }}>{date}</h6></Grid>
                </Grid>
            </Grid>

            <Grid item xs = {12}>
                <Grid container spacing  = {1}>
                    <Grid item xs = {6}><h5 style = {{ fontWeight:"350"}}  className = "labelText">Current Location:</h5></Grid>
                    <Grid item xs = {6}><h6 style = {{
                        fontSize:"20px",
                        fontWeight:"350"
                    }}>{cLoc}</h6></Grid>
                </Grid>
            </Grid>

            <Grid item xs = {12}>
            <Grid container justifyContent = "center">
            <h6 style = {{
        cursor: "pointer",

    }} onClick ={handleClickOpen}>Search more locations</h6>
            </Grid>
            </Grid>
        </Grid>
        <FetchLocation  open = {open} setOpen = {setOpen} locations = {locations}/>
    </Box>
    </Grid>
    </Grid>
    
    </Container>

    </div>
    
    )
}

export default TrackProductView;
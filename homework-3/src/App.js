import './App.css';

import {useEffect,useState} from 'react'
import axios from 'axios'

import {AppBar,Box,Toolbar,Typography,Button,IconButton,Paper,TextField,ListItem,List,ListItemButton,ListItemIcon,ListItemText} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import GroupIcon from '@mui/icons-material/Group';

function App() {
const d = new Date() 
const defaultName = `Unknown:${d.getMilliseconds()}` 
const [messageData, setMessageData] = useState([])
const [aftertime, setAfterTime] = useState(0)
const [contants, setContants] = useState(['Anton'])
const [get,setGet] = useState(0)
const [username,setUser] = useState(defaultName)
const [message,setMessage] = useState("")
const [isLogedIn,setIsLogedIn] = useState(false)
const [searchTerm,setSearchTerm] = useState("")
const [numberOfMessages,setNumberOfMessages] = useState(0)
const [open,setOpen] = useState(true)
const [openModal, setOpenModal] = useState(false)
const [help,setHelp] =useState("")
const [helpMessage,setHelpMessage] = useState("")
const [numberOfUsers,setNumberOfUsers] = useState(0)


useEffect(()=>{
  const fetchData = async ()=>{
    await axios.get(`https://tganyani.pythonanywhere.com/?after=${aftertime}&username=${username}`)
          .then((response)=>{
            setMessageData(response.data.msg)
            setContants(response.data.contants)
            setNumberOfMessages(messageData.length)
            setAfterTime(messageData?.slice(-1)[0].time)
            setNumberOfUsers(contants.length)

          })
  }
  fetchData()

}, [get])

useEffect(()=>{
  const fetchHelp = async()=>{
    await axios.get(`https://tganyani.pythonanywhere.com/help?chat=${help}`)
    .then(res=>setHelpMessage(res.data))
    .catch(error=>console.log(error))
  }
  fetchHelp()
}
,[help])

const handleSubmit = (e)=>{
  e.preventDefault()
  axios.post('https://tganyani.pythonanywhere.com/send',{"name":username,"text":message})
  .then(res=>{
    console.log(res.data)
    setMessage("")
  })
  .catch(err=>console.log(err))

}

const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <div className="App" style={{width:'98%'}}>
      <nav >
          <Box sx={{ flexGrow: 1 ,backgroundColor:"#0066FF", width:"100%"}}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon onClick={()=>setOpen(!open)}/>
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                НПМ-chatapp
              </Typography>
              <div sx={{ flexGrow: 1 }}>
                <ChatIcon/>
                <span style={{color:'red'}}>{numberOfMessages}</span>
              </div>
              <div sx={{ flexGrow: 1 ,marginLeft:"5%"}}>
                <GroupIcon/>
                <span style={{color:'red'}}>{numberOfUsers}</span>
              </div>
              <Button color="inherit" onClick={()=>setIsLogedIn(false)} sx={{ flexGrow: 1 }}>Log out</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </nav>
   {!isLogedIn? ( <Box
          sx={{
            width: '100%',
            height: '90vh',
            backgroundColor: 'white',
            display:"flex",
            flexDirection: 'column',
            alignItems: 'center',
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
             <div style={{marginTop:'30px'}}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Ask for help
      </Button>
      <Dialog
        open={openModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use НПМ-chatapp service?"}
        </DialogTitle>
        <DialogContent>
          <input type="text" value={help} onChange={e=>setHelp(e.target.value)}/>
          <DialogContentText id="alert-dialog-description">
            you:{help} <br/>
            chatbot:{helpMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose} autoFocus>
            yes it helped
          </Button>
        </DialogActions>
      </Dialog>
    </div>
           <Paper elevation={3} className="paper" >
            <TextField id="outlined-basic" label="username" variant="outlined" value={username} onChange={e=>setUser(e.target.value)}/>
            <Button variant="contained" onClick={()=>setIsLogedIn(true)}>Login</Button> 
           </Paper>
        </Box>) : (<div className="main">
             <Box
          sx={{
            width: '30%',
            height: '85vh',
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          className={open?"contants":"open"}
        >
          <div id="search">
            <input type="text" defaultValue="Search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
            <SearchIcon/>
          </div>
        <List >
          {
            contants.filter(C=>C.toLowerCase().includes(searchTerm)).map((c,i)=>(
            <ListItem disablePadding key={i} id="contactList">
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={c} />
              </ListItemButton>
            </ListItem>
            ))
          }
          </List>
        </Box>
        <div className="col2" onClick={()=>setGet(get+1)} onMouseEnter={()=>setGet(get-1)}>
          <Box
          sx={{
            width: '99%',
            height: '70vh',
            backgroundColor: 'white',
            overflowY:'scroll',
            padding:"15px",
            '&:hover': {
              opacity: [0.9, 0.8, 0.7],
            },
          }}
          className="chatArea"
        >
        {
        messageData.map(msg=>(
        <div className={username===msg.name?"mychat":"chat"} key={msg.time}>
            <Typography variant="body1">@{msg.name}</Typography>
            <Typography variant="body2" >{msg.text}</Typography>
            <Typography variant="subtitle2">{msg.time}</Typography>
        </div>))
      }
        </Box>
        <div className="footer">
        <EmojiEmotionsIcon/>
        <UploadFileIcon/>
        <input id="msgInput" type="text" placeholder="Type Messenger" value={message} onChange={e=>setMessage(e.target.value)}/>
        <SendIcon onClick={e=>handleSubmit(e)}/>
        <MicIcon/>
        </div>
        </div>
      </div>)}
    </div>
  );
}

export default App;

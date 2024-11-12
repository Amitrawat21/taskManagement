import React from 'react'
import HelpIcon from '@mui/icons-material/Help';
import "./DeleteCard.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { removetask } from '../../Redux/taskSlice';

const DeleteCard = ({setShowDeleteCard ,  setActiveCardId , id}) => {
const dispatch = useDispatch()


    const closeDeleteCard = ()=>{
        setShowDeleteCard(false)
        setActiveCardId(null)
       
            
    }

   
    const deleteTask = () => {
     
      toast.success("delete task  successfully!", {
        autoClose: 1000,
        onClose: () => {
          
          dispatch(removetask(id))
         
        },
      });
 
     
       
    };
    
  return (
    <div className='DeleteCardContainer'>

    <div className='DEleteCardWrapper'>
        <HelpIcon style={{width : "90px" , height : "100px" , backgroundColor : "red" , color : "pink"}}/>
        <p>are u sure to want to delete the selected task</p>
        <div className='DeleteCardButtom'>
            <button className='DeleteCardButtomCancel' onClick={closeDeleteCard}>cancel</button>
            <button className='DeleteCardButtomDelete' onClick={deleteTask} >Delete</button>
        </div>

    </div>
    <ToastContainer autoClose={2000} />
      
    </div>
  )
}

export default DeleteCard

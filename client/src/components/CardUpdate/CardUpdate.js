import React, { useState } from 'react'
import "./CardUpdate.css"
import axios from 'axios'
import { useSelector  , useDispatch} from 'react-redux'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMyTasks } from '../../Redux/taskSlice'
const CardUpdate = ({setShowEditCard , item  , setActiveCardId}) => {
  const dispatch = useDispatch()
  const [updateData , setUpdateData] = useState({
    title : item.title,
    description : item.description,
    status : item.status,
    priority : item.priority,
    createdAt : item.createdAt,
    submitDate  : item.submitDate

  })
  const { user } = useSelector((state) => state.auth);

  const handleChange = (e)=>{
    const{name , value} = e.target
    setUpdateData({
      ...updateData ,
      [name] : value
    })
  }

    const closeCard = ()=>{
        setShowEditCard(false)
        setActiveCardId(null)
      
    }
const handleEditSubmit =  async (e)=>{
  e.preventDefault()

  const response = await axios.put(`http://localhost:8000/task/update/${item._id}`, {
    ...updateData,
    submitDateByUser: {
      date: new Date(),
      status: updateData.status,
    },
  });
  if(response.data.success){
    console.log(response.data.task)
     toast.success("update successfully")
   
     setTimeout(()=>{
      dispatch(getMyTasks(user._id));
      setActiveCardId(null)

     } , 2500)
  


  }

}


    return (
        <div className="CreateTaskCard_container">
          <div className="CreateTaskCard_wrapper">
            <h4>EDIT TASK</h4>
            <form className="createTaskCard-form" onSubmit={handleEditSubmit}>
              <div className="input">
                <h5>Task Title</h5>
                <input type="text" value={updateData.title}  name = "title" onChange={handleChange} />
              </div>
              <div className="input">
                <h5>Task Description</h5>
                <input type="text" value={updateData.description} name='description' onChange={handleChange} />
              </div>
              <div className="taskDate">
                <div className="input">
                  <h5>start Date</h5>
                  <input type="date" value={updateData.createdAt} name = "createdAt" onChange={handleChange} />
                </div>
    
                <div className="input">
                  <h5>submit Date</h5>
                  <input type="date" value={updateData.submitDate}  name  = 'submitDate' onChange={handleChange} />
                </div>
              </div>
              <div className="taskStage">
                <div className="input">
                  <h5>task stage</h5>
                  <select className="select-dropdown" value={updateData.status} name = 'status' onChange={handleChange}>
                    <option value="progress">Progress</option>
                    <option value="incomplete">InComplete</option>
                    <option value="completed">Completed</option>
                    <option value="todo">Todo</option>
                  </select>
                </div>
                <div className="input">
                  <h5>priority level</h5>
                  <select className="select-dropdown" value={updateData.priority} name = "priority" onChange={handleChange}>
                  <option value="normal">Normal</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                  </select>
                </div>
              </div>
    
              <div className="submitTask">
               
                <button type="submit" className="sumitTask-Button" >Submit</button>
                <button  className="cancel-Button" onClick={closeCard}>cancel</button>
              </div>
            </form>
          </div>
          <ToastContainer autoClose={2000} />
        </div>
      );
}

export default CardUpdate

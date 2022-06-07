import {Button, TextField } from '@material-ui/core';
import Navbar from './components/Navbar';
import './style.css';
import { useEffect, useState } from 'react';

const App = () =>{
  const [task, setTask] = useState([])
  const [addUpdate, setaddUpdate] = useState('Add')
  const [editedTask, seteditedTask] = useState(false)
  const [value, setValue] = useState('')
  const [indexVal, setindexVal] = useState()

  useEffect(() => {
    // localStorage.setItem('todolist',JSON.stringify(task))

    let savedlist = JSON.parse(localStorage.getItem('todolist'))
    if (savedlist !== null){
    setTask(savedlist)}
    
  }, [task])
  
      
  const AddTask = ()=>{
    let newValue = document.getElementById('newtask')
    newValue.focus()
    let newValuetoadd= newValue.value
    setaddUpdate('Add')
    if (newValuetoadd !== null && newValuetoadd !== ""){
      setTask( oldarray => [...oldarray, newValuetoadd]   )
    }
    
    if(editedTask === true && newValuetoadd !== null && newValuetoadd !== "" ){
      const updateTask= [...task];
      updateTask.splice(indexVal,1,newValuetoadd)
      setTask(updateTask)  
    }
    seteditedTask(false)
    setValue("")
    // localStorage.setItem('todolist',JSON.stringify(task))
    }

  const Delete = (index)=>{
    const newTask = [...task];
    newTask.splice(index,1);
    setTask(newTask)  
  }

  const Edit= (item,i)=>{
    seteditedTask(true)
    setindexVal(i)
    setValue(item)
    setaddUpdate('Update')
  }
 
  const onChange = (e) =>{
    setValue(e.target.value)
  }
  console.log(task)

  return (
    <>
      <div className="App">
        <TextField id='newtask' value={value} onChange={onChange} autoFocus ></TextField>
        <Button onClick={AddTask} >{addUpdate}</Button>      
      </div>

      {/* Added Task showed */}

      <div className="App">
          { task.map((x,i)=> 
          (<div key={i.toString()} > <span className='task'>{x}</span> 
          <span><Button onClick={() => Delete(i)}>Delete</Button></span> 
          <span><Button onClick={() => Edit(x,i)}>edit</Button></span> 
          </div>
          )
          ) 
        }
      </div>
    </>
  );
}

export default App;

{/* 1. Edit option input-field pop-up
          2. Using ternary operator */}

      {/* { showEditMenu ? 
      <div className="App">
        <TextField id='edittask'></TextField>
        <Button onClick={Update} >Update</Button>  
        </div> : null} */}


  // const Update =(editIndex  ) =>{
  //   const updateTask= [...task];
  //   const updateValue= document.getElementById('edittask').value
  //   updateTask.splice(editIndex,1,updateValue)
  //   setTask(updateTask)
  //   setshowEditMenu(!showEditMenu)    
  // }

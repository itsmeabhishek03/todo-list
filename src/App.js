import './App.css';
import { useCallback, useEffect, useState } from 'react';

const getLocalData = () =>{
  const list = localStorage.getItem('todolist')

  if(list){
    return JSON.parse(list);
  }else {
    return [];
  }
}

const App = () => {
  const [initialdata , setinitialdata]=useState("")
  //console.log(initialdata)
  const [items , setitems] = useState(getLocalData());
  
  // useEffect(() =>{
  //   document.addEventListener("keydown", handle);
  //   return() =>{
  //     document.removeEventListener("keydown", handle);
  //   } 
  //  }, ["keydown"])

  const additem = () => {
    if(!initialdata){
      alert("please fill something")
    }
    else{
      const newData = {
        id: new Date().getTime().toString(),
        name : initialdata
      }
      setitems([...items, newData])
      setinitialdata('')
    }
  }
  // const handle = useCallback((event) =>{
  //   if(event.key === "Enter"){
      
  //     additem();
  //     console.log("handle");
  //   }
  //   }, [items])
  //console.log(items)

  const deleted = (index) => {
    const updateItem = items.filter((currElem) =>{
      return currElem.id !== index ;
    })
    setitems(updateItem)
  };
  const eraseall = () =>{
    setitems([ ])
  }
  localStorage.setItem('todolist',JSON.stringify(items));
  //useEffect(() => {
    //localStorage.setItem('todolist',JSON.stringify(items));
  //} , [items])
  return ( 
    <>
    <h1>MY TODO LIST </h1>
    <div className='todo'>
      <div className='todo__box'>
        <input type="text" placeholder='write here' value={initialdata} onChange  = {(event) => setinitialdata(event.target.value)} />
        <button className='btn' onClick={additem}>DONE</button>
      </div>
      {items.map((currElem, key) => {
        return(
          <div key = {key} className='element'>{currElem.name}
             <button className='del' onClick={() => deleted(currElem.id)}>DELETE</button>
          </div>
        )
      })}
      <button className="btn2" onClick={eraseall}>ERASE ALL</button>
    
    </div>
    </>
  );
};

export default App;

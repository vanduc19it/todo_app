import TodoList from './components/TodoList'
import Textfield from '@atlaskit/textfield'
import Button from '@atlaskit/button'
import {useState, useCallback, useEffect} from 'react'
import { v4 } from 'uuid'

const STORAGE_KEY = 'TODO_APP';

function App() {

  const [todoList, setTodoList] = useState([])
  const [textInput, setTextInput] = useState("")

  

  useEffect(() => {
    const storagedTodoList = localStorage.getItem(STORAGE_KEY);
    if(storagedTodoList){
      setTodoList(JSON.parse(storagedTodoList));
    }
  },[]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todoList))
  },[todoList])

  const onTextInputChange = useCallback((e) => {
    setTextInput(e.target.value)
  },[])


  const onAddBtnClick = useCallback((e) => {
    setTodoList([{id: v4(), name: textInput, isCompleted: false},...todoList])

    setTextInput("")

  },[textInput, todoList])


  const onCheckBtnClick = useCallback((id) => {
    setTodoList((prevState) => prevState.map((todo) => todo.id === id ? {...todo, isCompleted: true} : todo))
  },[])

  return (
    <>
      <h3>Danh Sách Cần Làm</h3>
      <Textfield name ="add-todo" placeholder ="Thêm việc cần làm..." elemAfterInput=
        {<Button isDisabled={!textInput} appearance='primary' onClick={onAddBtnClick}>Thêm</Button>
        }
        css ={{padding: '2px 4px 2px'} }
        value = {textInput}
        onChange={onTextInputChange}
        >
      </Textfield>
     
      <TodoList todoList= {todoList} onCheckBtnClick= {onCheckBtnClick} />
    </>
    
  );
}

export default App;

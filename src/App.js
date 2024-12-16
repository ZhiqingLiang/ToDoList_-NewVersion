import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/header.js';  // 导入自定义的导航栏组件
import TableList from './components/TableList.js';  // 导入表格任务管理器页面组件
import MoveableList from './components/MoveableList.js';  // 导入可拖拽任务管理器页面组件
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//<<<<<<< HEAD
function App() {
    return (
        <Router> {/* 使用 BrowserRouter 来包裹应用，提供路由功能 */}
            <div>
                <CustomNavbar /> {/* 导航栏 */}
                <Routes>  {/* 路由配置 */}
                    <Route path="/tableList" element={<TableList />} /> {/* 表格任务管理器页面 */}
                    <Route path="/moveableList" element={<MoveableList />} /> {/* 可拖拽任务管理器页面 */}
                </Routes>
            </div>
        </Router>
    );
}
//=======

// const App =()=>{
//   //const [todos,setTodos] = useState([]) //拿数组去存储待办事项
//   const [todos,setTodos] = useState(()=>{
//     //从localstorage 读取初始值
//     const saved = localStorage.getItem('todos')
//     return saved ? JSON.parse(saved) : [] // 如果saved存在且不是空值就执行 Json.parse();如果不存在就返回[]
//   });

//   const [inputValue,setInputValue] = useState('') //inputvalue为空字符  
//   const [dueTime,setTime] = useState('')

// useEffect(()=>{
//   //如果变化，就保存到localstorage中
//   localStorage.setItem('todos',JSON.stringify(todos))
// },[todos])

// // 添加新的事项
// const addTodo=()=>{
//   if(inputValue.trim()&&dueTime.trim()){
//     // 创建新的新代办对象，包含内容喝截止时间
//     const newTodos = {text:inputValue,dueTime:dueTime,completed: false}
//     // 更新todos数组，将新的待办事项加入
//     const updateToDo = [...todos, newTodos]
//     setTodos(sort(updateToDo))
//     setInputValue('')
//     setTime ('')
//   }else{
//     alert('请输入内容')
//   }
// }
// const deleteTodo=(index)=>{
//   const newTodos = todos.filter((_,i)=>i !==index)
//   setTodos(sort(newTodos))
// }

// const complete = (index)=>{ //点击复选框时触发的函数
//   const newTodos = [...todos]
//   newTodos[index].completed = !newTodos[index].completed
//   setTodos(sort(newTodos))
// }

// const sort = (todosList)=>{
//   //true 转换为 1，false 转换为 0。所以 a.completed 和 b.completed 实际上被解释为数字 1 或 0
//   return todosList.sort((a,b) => (a.completed - b.completed)) // 未完成的在前，已完成的在后
// }

//   return(
//     <div className='list'>
//       <h2>To-Do-List</h2>
//       <input
//         type='text'
//         value={inputValue}
//         onChange ={(e) =>setInputValue(e.target.value)}
//         placeholder='添加代办事项'
//       />
//       <input
//         type='date'
//         value={dueTime}
//         onChange ={(e) =>setTime(e.target.value)}
//         placeholder='截止时间'
//       />
//       <button onClick ={addTodo}>添加</button>
//       {/* 表格头 */}
//         <table className='table'>
//           <thead>
//             <tr>
//               <th>完成情况</th>
//               <th>待办事项</th>
//               <th>截止时间</th>
//               <th>操作</th>
//             </tr>
//           </thead>
//           <tbody className='tbody'>
//           {/* 遍历todo数组，生成每一行 */}
//           {todos.map((toDo,index)=>(
//             <tr key={index}>
//               <td>
//                 <input 
//                   type='checkbox'
//                   checked={todos[index].completed}
//                   onChange={()=>complete(index)}
//                 />
//               </td>
//               <td>{toDo.text}</td>
//               <td>{toDo.dueTime}</td>
//               <td>
//                 <button onClick={()=> deleteTodo(index)}>删除</button>
//               </td>
//             </tr>
//           ))}
//           </tbody>
//         </table>
//     </div>
//   )

// }

//>>>>>>> 2fe20403e3138ceafddd8fcd214e7845cccb944c

export default App;

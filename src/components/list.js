import React, { useState,useEffect } from "react";
import '../style/list.css'



function List(props){
    const addEvent =()=>{
        if(text.trim() && dueTime.trim()){
            const newTodos = { 
                text: text, 
                priority:priority,
                tag:tag,
                dueTime: dueTime, 
                completed: false, 
                index: todos.length, // 使用当前 todos 的长度作为索引
                
            };
            const updateTodo = [...todos,newTodos]
            setTodos(updateTodo)
            setTime('')
            setText('')
            setPriority("Low")
            setTag("personal")
        }
        else{
            alert('请输入内容')
        }
    }
    const deleteEvent =(index)=>{
        const newTodos = todos.filter(todo=>todo.index!==index)
        setTodos(newTodos)
        console.log(index)
    }
    const complete = (index)=>{ //点击复选框时触发的函数
        const newTodos = [...todos]
        newTodos[index].completed = !newTodos[index].completed
        setTodos(newTodos)
        console.log(`Checkbox at index ${index} is now: ${newTodos[index].completed ? 'Checked' : 'Unchecked'}`)
        }

    const handleEditClick = (index)=>{}
    const [text,setText] = useState('')
    const [dueTime, setTime] = useState('')
    const [priority,setPriority] = useState("Low")
    const [tag,setTag] = useState("personal")
    const [todos,setTodos] = useState (()=>{
    const saved = localStorage.getItem('todos')
        return saved ?JSON.parse(saved): []
    })
    const [time, setClock] = useState(new Date())

    useEffect(()=>{
        //如果变化，就保存到localstorage中
        localStorage.setItem('todos',JSON.stringify(todos))
        },[todos])
    useEffect(()=>{
        const timer = setInterval(()=>setClock(new Date(),1000))
        return ()=> clearInterval(timer)
        },[])

    const formatTime = (date) =>{
        return date.toLocaleTimeString()
    }

    return(
        <div className="list">
            <div className="info">
                <p>欢迎回来，亲爱的用户
                记得完成设置的事项噢</p>                  
            </div>
            <div className="clock">
                <p>现在时间是：{formatTime(time)}</p>
            </div>
                <div className="input">
                    
                    <input 
                        className="inputText"
                        type="text"
                        placeholder="请输入要添加的事情"
                        onChange={(e)=>setText(e.target.value)}
                        value={text}
                    />
                    <input 
                        className="inputName"
                        type="date"
                        placeholder="请输入日期"
                        onChange={(e)=>setTime(e.target.value)}
                        value={dueTime}
                    /> 
                    <select
                        className="inputPriority"
                        onChange={(e)=>setPriority(e.target.value)}
                        value={priority} //表单输入框的值与 priority 状态变量绑定在一起
                    >
                        <option value="Low">低</option>
                        <option value="Medium">中</option>
                        <option value="High">高</option>
                    </select>
                    <select
                        className="inputTag"
                        onChange={(e)=> setTag(e.target.value)}
                        value = {tag}
                    >
                        <option value="work">工作</option>
                        <option value="family">家庭</option>
                        <option value="personal">个人</option>
                    </select>
                    <br />
                    <button className="btn" onClick={addEvent}>提交</button>
                </div>
            <table className="table" >
                <thead>
                    <tr className="tr" >
                    <th >序号</th>
                    <th >完成情况</th>
                    <th >待办事件</th>
                    <th >截止时间</th>
                    <th >优先级</th>
                    <th >标签</th>
                    <th >操作</th>
                    </tr>
                </thead>
                <tbody className="tbody" >
                    {todos.map((todo,index)=>(
                        <tr key={index} >
                            <td>{todo.index+1}</td>
                            <td>
                                <input className="check" 
                                    type="checkbox" 
                                    checked={todos[index].completed}
                                    onChange={()=>complete(index)}
                                   />
                            </td>
                            <td style={{color:todo.completed ? 'lightgrey' : 'black'}} >{todo.text}</td>
                            <td style={{color:todo.completed ? 'lightgrey' : 'black'}}>{todo.dueTime}</td>
                            <td style={{color:todo.completed ? 'lightgrey' : 'black'}}>{todo.priority}</td>
                            <td style={{color:todo.completed ? 'lightgrey' : 'black'}}>{todo.tag}</td>
                            
                            <td>
                                <button className="deleteBtn" onClick={() => deleteEvent(todo.index)}><i className="bi bi-trash"></i></button>
                                <button onClick={() => handleEditClick(todo)}>编辑</button>    
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
        </div>
    )
   
    
}

export default List;
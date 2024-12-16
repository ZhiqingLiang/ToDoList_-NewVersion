import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'react-bootstrap';

import '../style/MoveableList.css';

// function MoveableList(){
//   // 定义生成的 `textarea` 数量
//   const numTextareas = 5;  // 你可以根据需要设置这个值
//   // 使用一个数组来存储多个 `textarea` 的内容，初始化为空字符串
//   const [texts, setTexts] = useState(new Array(numTextareas).fill(''));
//   const [draggedIndex, setDraggedIndex] = useState(null)

//   // 使用一个数组来存储多个 ref
//   const textareaRefs = useRef([]);

//   const handleChange = (index, e) => {
//     const newTexts = [...texts];
//     newTexts[index] = e.target.value;
//     setTexts(newTexts);
//   };

//   useEffect(() => {
//     textareaRefs.current = new Array(numTextareas).fill(null);
//     // 动态调整每个 textarea 的高度
//     textareaRefs.current.forEach((textarea, index) => {
//       if (textarea) {
//         textarea.style.height = 'auto';
//         textarea.style.height = `${textarea.scrollHeight}px`;
//       }
//     });
//   }, [texts]); // 当任意一个文本框的内容改变时，更新高度

//   const time = new Date().toLocaleString()
//   // 存储正在拖动开始事件
//   const sourceNode = useRef(null)

//   // 处理开始拖动事件
//   const handleDragStart = (e,index)=>{
//     setDraggedIndex(index)
//   }

//   const handleDragEnter = (e, index)=>{
//     if(index !== draggedIndex){
//       //更新textarea 的顺序
//       const updatedTexts = [...texts]
//       const [draggedItem]  = updatedTexts.splice(draggedIndex,1) // 删除拖动项
//       updatedTexts.splice(index,0,draggedItem)//在胥本为u照顾插入拖动项
//       setTexts(updatedTexts)
//       setDraggedIndex(index)
//     }
//   };

//   // 处理拖动结束事件的函数
//   const handleDragEnd = () => {
//     setDraggedIndex(null)
//   };

//   return (
//     <div className='List' >
//       <div className='Top'>
//         <input
//           placeholder='请输入标题'
//           >
//         </input>
//         <p style={{fontSize:'22px',marginTop:'0.5rem'}}>修改时间:{time}</p>
//         <div className='tag'  style={{fontSize:'22px',marginTop:'0.25rem'}}>
//          标签:
//           <select style={{fontSize:'22px',marginTop:'0.5rem',backgroundColor:'transparent',border:'none',width:'6rem',textAlign:'center'}}>
//             <option>个人</option>
//             <option>家庭</option>
//             <option>工作</option>
//           </select>
//         </div>
//       </div>
//       <p style={{textAlign:'center'}}>----- 点击下方的空白处，可记录自己的事件 ----</p>
//       <div className='addEvent' >
//         {texts.map((text, index) => ( 
//           <div key={index} 
//             draggable="true" 
//             onDragStart={() => handleDragStart(index)} 
//             onDragEnter={() => handleDragEnter(index)} 
//             onDragEnd={handleDragEnd} 
//             className="draggableItem"
//           >
//             <textarea 
//               className='inputEvents' 
//               ref={(el) => (textareaRefs.current[index] = el)} // 动态存储 ref
//               value={text}
//               onChange={(e) => handleChange(index, e)}
//             >
//             </textarea>
//         </div>
//         ))}
     
//       </div>
      
//     </div>
//   );

// }
function MoveableList(){
  // 初始化列表项
  const [items, setItems] = useState(() => Array(6).fill(""));
  const [draggedIndex, setDraggedIndex] = useState(null); // 当前拖动的元素索引
  const textareaRefs = useRef([]) // 用于存储textarea的引用
  const [lastModified, setLastModified] = useState(""); // 用于存储修改时间

  //自动调整高度函数
  const adjustHeight = (textarea) =>{
    if(textarea){
      textarea.style.height ="auto"// 先重置高度
      textarea.style.height = `${textarea.scrollHeight}px`// 根据内容调整高度
    }
  }
  //在首次渲染和每次items更新后调整高度
  useEffect(()=>{
    textareaRefs.current.forEach((textarea)=>adjustHeight(textarea))
  },[items])

  // 拖拽开始事件
  const handleDragStart = (index) => {
    setDraggedIndex(index); // 保存当前拖动元素的索引
  };

  // 拖拽进入事件
  const handleDragEnter = (index) => {
    if (index !== draggedIndex) { //判断当前拖拽元素所处位置是否与原来一致
      const updatedItems = [...items];
      const [draggedItem] = updatedItems.splice(draggedIndex, 1); // 删除拖动项
      updatedItems.splice(index, 0, draggedItem); // 插入到目标位置
      setItems(updatedItems); // 更新列表
      setDraggedIndex(index); // 更新拖动的索引
    }
  };

  // 拖拽结束事件
  const handleDragEnd = () => {
    setDraggedIndex(null); // 清除拖动状态
  };

  // 更新 textarea 内容
  const handleChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index] = e.target.value; // 更新对应的内容
    setItems(updatedItems); // 更新状态
  };
  // 控制时间
  useEffect(()=>{
    //初次加载时更新修改时间
    const currentTime = new Date().toLocaleString()
    setLastModified(currentTime)
  },[])

  //每次items更新世更新修改时间
  useEffect(()=>{
    if(items){
      const currentTime = new Date().toLocaleString()
      setLastModified(currentTime)
    }
  },[items])


  return (
    <div className='List'>
      <div className='Top'>
         <input
            className='title'
           placeholder='请输入标题'
           >
         </input>
         <p style={{fontSize:'22px',marginTop:'0.5rem'}}>修改时间:{lastModified}</p>
         <div className='tag'  style={{fontSize:'22px',marginTop:'0.25rem'}}>
          标签:
           <select style={{fontSize:'22px',marginTop:'0.5rem',backgroundColor:'transparent',border:'none',width:'6rem',textAlign:'center'}}>
             <option>个人</option>
             <option>家庭</option>
             <option>工作</option>
           </select>
         </div>
       </div>
       <p style={{textAlign:'center'}}>----- 点击下方的空白处，可记录自己的事件 ----</p>
      <div className="mainBox">
        {items.map((item, index) => (
          <textarea
            key={index}
            className={`movingBox ${draggedIndex === index ? "moving" : ""}`}
            ref={(el) => (textareaRefs.current[index] = el)} // 存储当前 textarea 的引用
            draggable="true"
            value={item}
            onDragStart={() => handleDragStart(index)}
            onDragEnter={() => handleDragEnter(index)}
            onDragEnd={handleDragEnd}
            onChange={(e) => handleChange(index, e)}
          >
          </textarea>
        ))}
    </div>

    </div>
    
  );
}
export default MoveableList;
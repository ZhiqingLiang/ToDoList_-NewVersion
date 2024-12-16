// Modal.js
import React from 'react';


const Modal = ({ isOpen, onClose, currentTodo, onSave }) => {
  if (!isOpen) return null; // 如果没有打开 Modal，则返回 null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>X</button>
        <h3>编辑任务</h3>
        <label>
          名称:
          <input
            type="text"
            value={currentTodo.text}
            onChange={(e) => onSave({ ...currentTodo, text: e.target.value })}
          />
        </label>
        <label>
          截止日期:
          <input
            type="date"
            value={currentTodo.dueTime}
            onChange={(e) => onSave({ ...currentTodo, dueTime: e.target.value })}
          />
        </label>
        <label>
          优先级:
          <select
            value={currentTodo.priority}
            onChange={(e) => onSave({ ...currentTodo, priority: e.target.value })}
          >
            <option value="Low">低</option>
            <option value="Medium">中</option>
            <option value="High">高</option>
          </select>
        </label>
        <label>
          标签:
          <select
            value={currentTodo.tag}
            onChange={(e) => onSave({ ...currentTodo, tag: e.target.value })}
          >
            <option value="work">工作</option>
            <option value="family">家庭</option>
            <option value="personal">个人</option>
          </select>
        </label>
        <button onClick={() => onSave(currentTodo)}>保存</button>
        <button onClick={onClose}>取消</button>
      </div>
    </div>
  );
};

export default Modal;

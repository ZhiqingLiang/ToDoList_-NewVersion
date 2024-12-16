import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Table, Container, Row, Col,InputGroup } from 'react-bootstrap';
import { FaSearch,FaSortUp, FaSortDown } from 'react-icons/fa'; // 引入搜索图标

function TaskManager() {
  const [tasks, setTasks] = useState([]); // 当前显示的任务
  const [allTasks, setAllTasks] = useState([]); // 存储所有任务（包括未过滤的）
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ id: '', name: '', description: '', dueDate: '', priority: 'Low' });
  const [editingTask, setEditingTask] = useState(null); // 记录正在编辑的任务
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchQuery, setSearchQuery] = useState(''); // 存储搜索框的输入
  
  // 从 localStorage 获取数据并初始化状态,
  
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
    setAllTasks(savedTasks); // 初始化 allTasks
  }, []);

  // 更新任务状态到 localStorage
  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setAllTasks(updatedTasks); // 同步 allTasks
    setTasks(updatedTasks); // 同步显示任务
  };

  // 显示任务添加/编辑的 Modal
  const handleShowModal = (task = null) => {
    if (task) {
      setEditingTask(task); // 设置编辑任务
      setNewTask(task); // 填充表单数据
    } else {
      setEditingTask(null); // 清空编辑任务，准备添加新任务
      setNewTask({ id: '', name: '', description: '', dueDate: '', priority: 'Low' }); // 重置表单
    }
    setShowModal(true); // 显示 Modal
  };

  // 关闭 Modal
  const handleCloseModal = () => setShowModal(false);

  // 保存任务（添加或编辑）
  const handleSaveTask = () => {
    let updatedTasks;
    if (editingTask) {
      // 编辑模式：更新任务
      updatedTasks = tasks.map(task =>
        task.id === editingTask.id ? { ...task, ...newTask } : task
      );
    } else {
      // 添加模式：新增任务
      const newTaskWithId = { ...newTask, id: Date.now().toString() }; // 使用当前时间戳作为唯一ID
      updatedTasks = [...tasks, newTaskWithId];
    }
    updateLocalStorage(updatedTasks); // 同步更新 localStorage
    setShowModal(false); // 关闭 Modal
  };

  // 处理输入框的更改
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // 删除任务
  const deleteEvent = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    updateLocalStorage(updatedTasks); // 同步到 localStorage
  };

  // 完成状态切换
  const handleCheckboxChange = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    updateLocalStorage(updatedTasks); // 同步到 localStorage
  };

  // 排序任务列表（按截止日期）
  const handleSortByDate = () => {
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setTasks(sortedTasks);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // 切换排序顺序
  };

  // 搜索功能：监听搜索框输入
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // 过滤任务列表
  const filterTasks = () => {
    if (searchQuery === '') {
      setTasks(allTasks); // 如果搜索框为空，恢复显示所有任务
    } else {
      const filteredTasks = allTasks.filter(task =>
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTasks(filteredTasks); // 更新显示任务
    }
  };

  // 监听回车键触发搜索
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      filterTasks();
    }
  };

  return (
    <Container className='container'>
      <Row className="my-3">
        <Col>
          <Button variant="primary" onClick={() => handleShowModal()}>添加任务</Button>
        </Col>
        <Col xs={5}>
        <InputGroup>
            <Form.Control
              type="text"
              placeholder="搜索任务名称"
              value={searchQuery}
              onChange={handleSearchChange} // 更新搜索框的值
              onKeyDown={handleKeyDown} // 按下回车时触发搜索
            />
            <Button 
              variant="outline-secondary" 
              onClick={filterTasks} 
              style={{border:'none', backgroundColor:'white'}}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'black'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {/* 任务列表 */}
      <Row>
        <Col>
          <Table striped bordered hover responsive style={{ opacity: 0.9 }}>
            <thead>
              <tr className='tr'>
                <th style={{ width: '6rem' }}>完成情况</th>
                <th>任务名称</th>
                <th>描述</th>
                <th style={{ width: '7rem', cursor: 'pointer' }} onClick={handleSortByDate}>
                  截止日期
                  {sortOrder === 'asc' ? <FaSortUp /> : <FaSortDown />}
                </th>
                <th style={{ width: '6rem' }}>优先级</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody className='tbody'>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleCheckboxChange(task.id)} // 当点击复选框时改变任务的完成状态
                      label=""
                      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    />
                  </td>
                  <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }} required>{task.name}</td>
                  <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.description}</td>
                  <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.dueDate}</td>
                  <td>{task.priority}</td>
                  <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleShowModal(task)}>编辑</Button>
                    <Button variant="danger" size="sm" onClick={() => deleteEvent(task.id)}>删除</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Modal 用于创建/编辑任务 */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTask ? '编辑任务' : '添加任务'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskName">
              <Form.Label>任务名称</Form.Label>
              <Form.Control
                type="text"
                placeholder="输入任务名称"
                name="name"
                value={newTask.name || ''}
                onChange={handleChange}
                required
                isInvalid={newTask.name === ''}
              />
              <Form.Control.Feedback type="invalid">
                任务名称是必填的
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="taskDescription">
              <Form.Label>任务描述</Form.Label>
              <Form.Control
                type="text"
                placeholder="输入任务描述"
                name="description"
                value={newTask.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="taskDueDate">
              <Form.Label>截止日期</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleChange}
                required
                isInvalid={newTask.dueDate === ''}
              />
              <Form.Control.Feedback type="invalid">
                截止日期是必填的
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="taskPriority">
              <Form.Label>优先级</Form.Label>
              <Form.Control
                as="select"
                name="priority"
                value={newTask.priority}
                onChange={handleChange}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>取消</Button>
          <Button variant="primary" onClick={handleSaveTask}>
            {editingTask ? '保存修改' : '保存任务'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TaskManager;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/header.js';  // 导入自定义的导航栏组件
import TableList from './components/TableList.js';  // 导入表格任务管理器页面组件
import MoveableList from './components/MoveableList.js';  // 导入可拖拽任务管理器页面组件
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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

export default App;

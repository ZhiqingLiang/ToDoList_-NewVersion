import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import '../style/header.css';  // 用于引入自定义样式
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand href="#home" className="brand-logo">自定义任务管理器</Navbar.Brand>
        {/* // 在默认情况下 expand = 'lg',小于992px触发汉堡菜单 */}
        <Navbar.Toggle aria-controls="navbar-nav" /> 
        <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
            <Nav.Link  as={Link} to="/TableList">表格任务管理器</Nav.Link>
            <Nav.Link as={Link} to="/moveableList" >可移动任务管理器</Nav.Link>
            <NavDropdown title="更多" id="navbar-dropdown">
              <NavDropdown.Item href="#action/3.1">关于公司</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">招聘人才</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">联系我们</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

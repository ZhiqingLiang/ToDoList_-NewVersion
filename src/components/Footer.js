import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../style/Footer.css';

const CustomFooter = () => {
  return (
    <footer className="footer-custom">
      <Container>
        <Row className="text-center">
          <Col>
            <p>© 2024 炫酷任务管理器. 保留所有权利。</p>
          </Col>
        </Row>
        <Row className="text-center">
          <Col>
            <a href="#terms" className="footer-link">服务条款</a> | 
            <a href="#privacy" className="footer-link">隐私政策</a> |
            <a href="#contact" className="footer-link">联系我们</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default CustomFooter;

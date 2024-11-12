import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // 引入 Bootstrap CSS
import 'bootstrap'; // 引入 Bootstrap JavaScript
import '../style/header.css'


function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg"> 
            <ul className="navbar-nav">
                <li className="nav-item">
                    <p className="nav-link" >公司主页</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link" >关于本产品</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link">退出</p>
                </li>
            </ul>
        </nav>
    );
}

export default Header;
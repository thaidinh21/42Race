import React from 'react';
import './toast.css';
const Toast = (props) => {
    const { content, isOpen, status } = props;
    let className = `toast ${isOpen ? 'show' : ''} ${status}`
    return (<div className={className}>{content}</div>);
}

export default Toast;
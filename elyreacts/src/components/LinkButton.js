import React from 'react';

// @ts-ignore
import cn from './styles/LinkButton.module.scss';
import { Link } from 'react-router-dom';

export default ({
    to = null,
    href = null,
    className = '',
    classNames = '',
    primary = false,
    onClick = null,
    children
}) => {
    href = href || to;

    if (href.charAt(0) === "/") {
        return (
            <Link to={to || href} className={`${className} ${classNames} ${cn.linkButton} ${primary ? cn.primary : ''}`} onClick={onClick}>
                {children}
            </Link>
        );
    } else {
        return (
            <a href={to || href} className={`${className} ${classNames} ${cn.linkButton} ${primary ? cn.primary : ''}`} onClick={onClick}>
                {children}
            </a>
        );
    }
};
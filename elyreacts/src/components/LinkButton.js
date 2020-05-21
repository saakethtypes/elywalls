import React from 'react';

// @ts-ignore
import cn from './styles/LinkButton.module.scss';

export default ({ href, classNames, children }) => {
    return (
        <a href={href} className={`${classNames || ''} ${cn.linkButton}`}>
            {children}
        </a>
    );
};
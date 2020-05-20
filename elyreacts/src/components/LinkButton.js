import cn from './LinkButton.module.scss';

import React from 'react';

export default ({ href, classNames, children }) => {
    return (
        <a href={href} className={`${classNames || ''} ${cn.linkButton}`}>
            {children}
        </a>
    );
};
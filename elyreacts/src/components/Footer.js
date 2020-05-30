import React from 'react';

// @ts-ignore
import cn from './styles/Footer.module.scss';

export default () => {
    return (
        <footer className={cn.container}>
            <div className={cn.content}>
                <span>Elywalls</span>
            </div>
        </footer>
    );
};

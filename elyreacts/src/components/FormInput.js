import React, { useEffect } from 'react';
import PT from 'prop-types';

// @ts-ignore \n /*eslint-disable*/
 /*eslint-disable*/

import cn from './styles/FormInput.module.scss';


const getLabel = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};

const FormInput = ({
    type,
    name,
    displayName,
    value,
    autoComplete,
    onChange,
    inputProps,
    className
}) => {
    return (
        <div className={`${cn.container} ${className}`}>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                autoComplete={autoComplete}
                onChange={onChange}
                {...inputProps} />
            <label htmlFor={name}>
                {getLabel(displayName || name)}
            </label>
        </div>
    );
};

FormInput.propTypes = {
    type: PT.string.isRequired,
    name: PT.string.isRequired,
    displayName: PT.string,
    value: PT.any,
    autoComplete: PT.string,
    onChange: PT.func,
    inputProps: PT.object,
    className: PT.string
};

const FormRadioInput = ({
    name,
    displayName,
    options,
    onChange,
    inputProps,
    className
}) => {
    return (
        <div
            onChange={onChange}
            className={`${cn.radioContainer} ${className}`}>
            <label>{getLabel(displayName || name)}</label>
            <div className={cn.radioOptionsContainer}>
                {options.map((option) =>
                    <div key={option.value} className={cn.radioOption}>
                        <input
                            type="radio"
                            name={name}
                            id={option.value}
                            value={option.value}
                            defaultChecked={option.isDefault}
                            {...inputProps} />
                        <label
                            htmlFor={option.value}>
                            {getLabel(option.value)}
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
};

FormRadioInput.propTypes = {
    name: PT.string.isRequired,
    displayName: PT.string,
    options: PT.arrayOf(PT.exact({
        value: PT.string.isRequired,
        isDefault: PT.bool
    })).isRequired,
    onChange: PT.func,
    inputProps: PT.object,
    className: PT.string
};

const FormCheckboxInput = ({
    name,
    displayName,
    checked,
    onChange,
    inputProps,
    className
}) => {
    useEffect(() => console.log(), [checked]);
    return (
        <div className={`${cn.checkboxContainer} ${className}`}>
            <input
                type="checkbox"
                name={name}
                id={name}
                defaultChecked={checked}
                onChange={onChange}
                {...inputProps} />
            <label htmlFor={name}>
                {getLabel(displayName || name)}
            </label>
        </div>
    );
};

FormCheckboxInput.propTypes = {
    name: PT.string.isRequired,
    displayName: PT.string,
    checked: PT.bool,
    onChange: PT.func,
    inputProps: PT.object,
    className: PT.string
};

const FormDropdownInput = ({
    name,
    displayName,
    value,
    options,
    onChange,
    className
}) => {
    return (
        <div className={`${cn.dropdownContainer} ${className}`}>
            <select id={name} value={value} onChange={onChange}>
                {options.map((option) =>
                    <option key={option} value={option}>{option}</option>
                )}
            </select>

            <label htmlFor={name}>
                {getLabel(displayName || name)}
            </label>
        </div>
    );
};

FormDropdownInput.propTypes = {
    name: PT.string.isRequired,
    displayName: PT.string,
    value: PT.string,
    options: PT.arrayOf(PT.string).isRequired,
    onChange: PT.func,
    inputProps: PT.object,
    className: PT.string
};

export {
    FormInput,
    FormRadioInput,
    FormCheckboxInput,
    FormDropdownInput
};
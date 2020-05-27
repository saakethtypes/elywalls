import React from 'react';
import PT from 'prop-types';

// @ts-ignore
import cn from './styles/FormInput.module.scss';

const FormInput = ({
    type,
    name,
    displayName,
    value,
    autoComplete,
    inputProps,
    className
}) => {
    const getInputLabel = () => {
        if (displayName)
            return displayName.charAt(0).toUpperCase() + displayName.slice(1);
        else
            return name.charAt(0).toUpperCase() + name.slice(1);
    };

    return (
        <div className={`${type === "checkbox" ? cn.checkboxContainer : cn.container} ${className}`}>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                autoComplete={autoComplete}
                {...inputProps} />
            <label htmlFor={name}>
                {getInputLabel()}
            </label>
        </div>
    );
};

FormInput.propTypes = {
    type: PT.string.isRequired,
    name: PT.string.isRequired,
    displayName: PT.string,
    value: PT.string,
    autoComplete: PT.string,
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
    const getInputLabel = () => {
        if (displayName)
            return displayName.charAt(0).toUpperCase() + displayName.slice(1);
        else
            return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const getLabel = (optionValue) => {
        return optionValue.charAt(0).toUpperCase() + optionValue.slice(1);
    };

    return (
        <div
            onChange={onChange}
            className={`${cn.radioContainer} ${className}`}>
            <label>{getInputLabel()}</label>
            <div className={cn.radioOptionsContainer}>
                {options.map((option) =>
                    <div key={option.value} className={cn.radioOption}>
                        <input
                            type="radio"
                            name={name}
                            id={option.value}
                            value={option.value}
                            defaultChecked={option.isDefault} />
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

export {
    FormInput,
    FormRadioInput
};

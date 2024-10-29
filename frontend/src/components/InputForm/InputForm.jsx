import React from 'react';
import { WrapperInputStyle } from './style';

const InputForm = (props) => {
    const { placeholder = 'Nhập text', value, onChange, ...rests } = props;

    const handleOnchangeInput = (e) => {
        // Call the onChange prop passed from the parent (if it exists)
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <div>
            <WrapperInputStyle
                placeholder={placeholder}
                value={value}
                onChange={handleOnchangeInput}
                {...rests}
            />
        </div>
    );
};

export default InputForm;

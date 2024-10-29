import React from 'react';
import { WrapperLableText, WrapperTextValue, WrapperContent, WrapperTextPrice } from './style';
import { Checkbox, Rate } from 'antd';

const NavBarComponent = () => {
    const onChange = () => {};
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    
                        return (
                            <WrapperTextValue>{option}</WrapperTextValue>
                        )
                    })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox value = {option.value}>{option.label}</Checkbox>
                            )
                        })}
                        <Checkbox value="A">A</Checkbox>
                        <Checkbox value="B">B</Checkbox>
                    </Checkbox.Group>      
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style = {{display: 'flex', gap: '4px'}}>
                            <Rate style = {{fontSize: '12px', }} disabled defaultValue={option} />
                            <span>{`Từ ${option} sao`}</span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )
                })        
            default:
                return {}
        }
    }
    return (
        <div>
            <WrapperLableText>Lable</WrapperLableText>
            <WrapperContent>
                {renderContent('text', ['Ti vi', 'Điện thoại', 'Đồng hồ'])}
            </WrapperContent>
        </div>
    )
}

export default NavBarComponent
import React from 'react'
import { Input } from 'antd';
import { WrrapperHeader, WrrapperTextHeader, WrrapperTextContent } from './style';

// import { Props } from 'antd/es/transfer/ListBody';
  

const IntroduceComponent = () => {
    return (
        <WrrapperHeader>
            <div>
                <WrrapperTextHeader> Nhạc cụ truyền thống Việt Nam</WrrapperTextHeader>
            </div>
            <div style={{ padding:'45px'}}>
                <WrrapperTextContent>Nhạc cụ là một phần không thể thiếu của văn hóa và âm nhạc của mỗi quốc gia. Với hơn 54 dân tộc, Việt Nam có một lịch sử âm nhạc đa dạng và phong phú với các loại nhạc cụ truyền thống đặc trưng. Trong bài viết này, chúng ta sẽ khám phá các loại nhạc cụ truyền thống của Việt Nam, tìm hiểu về cách chúng được chơi và vai trò của chúng trong văn hóa âm nhạc Việt Nam.</WrrapperTextContent>
            </div>
        </WrrapperHeader>
    )
    
}
export default IntroduceComponent
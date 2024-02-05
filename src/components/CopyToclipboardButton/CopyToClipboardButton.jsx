import { useState } from 'react'
import copy from 'clipboard-copy'
import { message } from 'antd'

const CopyToClipboardButton = ({text}) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopyClick = async () => {
        try {
            await copy(text);
            setIsCopied(true);
            message.success('复制成功');
        } catch (e) {
            message.error('复制失败');
        }
    }

    return (
        <div>
            <button onClick={handleCopyClick}>{isCopied ? 'Copied!' : 'Copy to Clipboard'}</button>
        </div>
    )
};

export default CopyToClipboardButton;

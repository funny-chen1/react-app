import { useState } from 'react'
import CopyToClipboardButton from '../components/CopyToclipboardButton/CopyToClipboardButton'

function About() {
    const [state, setState] = useState({data: ''});
    const handleDataChange = (e) => {
        setState({...state, data: e.target.value});
    }

    return (
        <div>
            <input type="text" value={state.data} onChange={handleDataChange} />
            <CopyToClipboardButton text={state.data} />
        </div>
    )
}

export default About;

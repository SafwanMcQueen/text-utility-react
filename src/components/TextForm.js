import React, { useState } from 'react'


export default function TextForm(props) {
    const [text, setText] = useState('');

    //app logic starts here

    //Upper Case
    const handleUpCase = () => {
        // let newText = text.toUpperCase();
        // setText(newText)
        setText(text.toUpperCase());
        props.showAlert('converted to Upper Case!', 'success')
    }

    //Lower Case
    const handleLowCase = () => {
        // let newText = text.toLowerCase();
        // setText(newText)
        setText(text.toLowerCase());
        props.showAlert('converted to Lower Case!', 'success')

    }

    //copy text
    const handleCopy = () => {
        let text = document.getElementById('myBox')
        text.select()
        text.setSelectionRange(0, 9999)
        navigator.clipboard.writeText(text.value)
        props.showAlert('Text copied to clipboard!', 'success')

    }

    //extra space
    const handleExtraSpace = () => {
        let newText = text.split(/[ ]+/)
        setText(newText.join(' '))
        props.showAlert('Extra spaces removed!', 'success')

    }

    //capitalize
    const handleCapitalize = () => {
        let lower = text.toLowerCase()
        setText(lower.charAt(0).toUpperCase() + lower.slice(1))
        props.showAlert('First letter of the word is Capitalized!', 'success')
    }

    const handleDownload = () => {
        // file object
        const file = new Blob([text], { type: "text/plain" });

        // anchor link
        const element = document.createElement("a");
        element.href = URL.createObjectURL(file);
        element.download = "100ideas-" + Date.now() + ".txt";

        // simulate link click
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    //On change
    const handleOnChange = (event) => {
        setText(event.target.value)
    }

    const resetText = () => {
        if (window.confirm('Do you really wish to clear the text?')) {
            setText('')
            props.showAlert('text was cleared!', 'danger')

        }
    }
    //app logic ends here
    return (
        <>
            <div className="container">
                <h1 className='mb-4'>{props.heading}</h1>
                <div className="mb-3">
                    <textarea className="form-control" value={text} placeholder='Enter text here...' onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? 'black' : 'white', color: props.mode === 'dark' ? 'white' : 'black' }} id="myBox" rows="8"></textarea>
                </div>
                <div className='d-wrap'>
                    <button disabled={text.length === 0} className="btn btn-success mx-1 mb-2" onClick={handleUpCase}>Upper Case</button>
                    <button disabled={text.length === 0} className="btn btn-primary mx-1 mb-2" onClick={handleLowCase}>Lower Case</button>
                    <button disabled={text.length === 0} className="btn btn-warning mx-1 mb-2" onClick={handleCopy}>Copy Text</button>
                    <button disabled={text.length === 0} className="btn btn-info mx-1 mb-2" onClick={handleExtraSpace}>Remove extra space</button>
                    <button disabled={text.length === 0} className="btn btn-secondary mx-1 mb-2" onClick={handleDownload}>Download Text</button>
                    <button disabled={text.length === 0} className="btn btn-danger mx-1 mb-2" onClick={handleCapitalize}>capitalize</button>
                    <button disabled={text.length === 0} className="btn btn-outline-danger  mx-1 mb-2" onClick={resetText}>Reset</button>
                </div>
            </div>
            <div className="container my-3">
                <h2>Text Summary</h2>
                <p><strong>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length}</strong> words and <strong>{text.length}</strong> characters</p>
                <p>This will take <strong>{0.008 * text.split(/\s+/).filter((element) => { return element.length !== 0 }).length}</strong> minutes to read </p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Nothing to preview!"}</p>
            </div>
        </>
    )
}

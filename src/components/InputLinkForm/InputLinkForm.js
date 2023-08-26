import React from "react";
import './InputLinkForm.css'

const InputLinkForm = ({ onInputChange, onDetectClick }) => {
    return (
        <div className="pa4-l">
            <p className="white f3">Hello! Try out the detection tool</p>
            <div className="mw7 center pa3 br2 shadow-white pattern">
                <div className="cf">
                    <input
                        className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
                        placeholder="Link to detect"
                        type="text"
                        name="input-link"
                        id="input-link"
                        onChange={onInputChange}
                    />
                    <input className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
                        type="submit"
                        value="Detect"
                        onClick={onDetectClick}
                    />
                </div>
            </div>
        </div>
    );
}

export default InputLinkForm;
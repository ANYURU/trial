import { useState } from "react";
import './OTP.css'

const OTPBox = ({ otp, setOtp}) => {

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        //Focus next input
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };


    return (
            <div className="text-center">
                    <div className="row">
                        {otp.map((data, index) => {
                            return (
                                <input
                                    className="otp-field ring-2 ring-black focus:outline-none focus:ring-2 focus:ring-primary focus:shadow"
                                    type="text"
                                    name="otp"
                                    maxLength="1"
                                    key={index}
                                    value={data}
                                    onChange={e => handleChange(e.target, index)}
                                    onFocus={e => e.target.select()}
                                />
                            );
                        })}
                    </div>
                        <button
                            className=""
                            onClick={e => setOtp([...otp.map(v => "")])}
                        >
                            Clear
                        </button>
            </div>
    );
};

export default OTPBox;
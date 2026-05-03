import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { LeftOutlined } from '@ant-design/icons'
import { Navigate } from 'react-router';

const Scanner = () => {
    const localStaff = localStorage.getItem("staffLogin")
    if (!localStaff) {
        return <Navigate to={"/staff"} />;
    }
    const [scanResult, setScanResult] = useState(null);

    useEffect(() => {
        const html5qrCodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 200, height: 200 } },
            false
        );
        const onScanSuccess = (decodedText, decodedResult) => {
            setScanResult(decodedText);
            html5qrCodeScanner.clear();
        };
        const onScanError = (errorMessage) => {
            // console.warn(`QR Code Scan Error: ${errorMessage}`);
        };
        html5qrCodeScanner.render(onScanSuccess, onScanError);

        return () => {
            html5qrCodeScanner.clear();
        };
    }, []);
    const onClickReturn = () => {
        history.back()
    }

    return (
        <div className='w-screen h-screen pt-15'>
            <div className='w-full py-4 px-5 text-lg font-bold text-center fixed top-0'>
                <p onClick={onClickReturn} className='absolute left-3 top-2 border-b-2 border-r-2 border-gray-200 bg-gray-400/50 rounded-full px-3 py-2'><LeftOutlined /></p>
                <p>Scanner</p>
            </div>
            <div id="reader" className='h-full'></div>
            {(scanResult) ? <Navigate to={`/staff/ticket/${scanResult}`} /> : null}
        </div>
    );
}


export default Scanner
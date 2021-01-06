import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ImageInfo from './components/ImageInfo';

export default function App() {
    const [imageName] = useState('');

        return (
            <>
                <ImageInfo imageName={imageName} />
                <ToastContainer autoClose={2000} />
            </>
        );
}
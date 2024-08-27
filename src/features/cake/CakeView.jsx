import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ordered, restocked } from './cakeSlice';

const CakeView = () => {
    const [value, setValue] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const numOfCakes = useSelector((state) => state.cake.numOfCakes);
    const dispatch = useDispatch();

    const handleRestocked = (e) => {
        e.preventDefault();
        dispatch(restocked(value));
        setValue(1);
        setErrorMessage(''); // Clear error message on restock
    };

    const handleOrdered = (e) => {
        e.preventDefault();
        if (value > numOfCakes) {
            setErrorMessage(`Only ${numOfCakes} cakes are available.`);
        } else {
            dispatch(ordered(value));
            setValue(1);
            setErrorMessage(''); // Clear error message on successful order
        }
    };

    return (
        <div className='cake'>
            {numOfCakes < 1 ? (
                <p style={{ textAlign: 'center', color: 'red', fontSize: '1.2rem' }}>
                    No cakes available. Please restock.
                </p>
            ) : (
                <h2 style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                    Number of Cakes - {numOfCakes}
                </h2>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem', gap: '5px' }}>
                <label htmlFor="restock-input" style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'orange' }}>
                    Enter the number of cakes to order or restock:
                </label>
                <input
                    type="number"
                    id="restock-input"
                    value={value}
                    onChange={(e) => setValue(parseInt(e.target.value))}
                    style={{
                        width: '100px',
                        padding: '0.5rem',
                        fontSize: '1rem',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        textAlign: 'center'
                    }}
                />
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                    className='button-ordered'
                    onClick={handleOrdered}
                    disabled={numOfCakes < 1} // Disable if no cakes are available
                    style={{
                        backgroundColor: numOfCakes < 1 ? '#ddd' : '#4CAF50', // Gray background if disabled
                        color: numOfCakes < 1 ? '#888' : '#fff', // Gray text if disabled
                        cursor: numOfCakes < 1 ? 'not-allowed' : 'pointer' // Change cursor if disabled
                    }}
                >
                    Order Cake
                </button>
                <button 
                    className='button-restocked'
                    onClick={handleRestocked}
                >
                    Restock Cakes
                </button>
            </div>
            {errorMessage && (
                <p style={{ textAlign: 'center', color: 'red', fontSize: '1rem', marginTop: '1rem' }}>
                    {errorMessage}
                </p>
            )}
        </div>
    );
};

export default CakeView;

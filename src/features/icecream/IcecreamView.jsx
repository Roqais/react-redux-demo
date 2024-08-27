import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ordered, restocked } from './icecreamSlice';

const IcecreamView = () => {
    const [value, setValue] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');
    const numOfIcecreams = useSelector((state) => state.icecream.numOfIcecreams);
    const dispatch = useDispatch();

    const handleRestocked = (e) => {
        e.preventDefault();
        dispatch(restocked(value));
        setValue(1);
        setErrorMessage(''); // Clear error message on restock
    };

    const handleOrdered = (e) => {
        e.preventDefault();
        if (value > numOfIcecreams) {
            setErrorMessage(`Only ${numOfIcecreams} ice creams are available.`);
        } else {
            dispatch(ordered(value));
            setValue(1);
            setErrorMessage(''); // Clear error message on successful order
        }
    };

    return (
        <div className='icecream'>
            {numOfIcecreams < 1 ? (
                <p style={{ textAlign: 'center', color: 'red', fontSize: '1.2rem' }}>
                    No ice creams available. Please restock.
                </p>
            ) : (
                <h2 style={{ fontSize: '1.7rem', textAlign: 'center' }}>
                    Number of Ice cream - {numOfIcecreams}
                </h2>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem', gap: '5px' }}>
                <label htmlFor="restock-input" style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'orange' }}>
                    Enter the number of ice creams to restock:
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
                    disabled={numOfIcecreams < 1} // Disable if no ice creams are available
                    style={{
                        backgroundColor: numOfIcecreams < 1 ? '#ddd' : '#4CAF50', // Gray background if disabled
                        color: numOfIcecreams < 1 ? '#888' : '#fff', // Gray text if disabled
                        cursor: numOfIcecreams < 1 ? 'not-allowed' : 'pointer' // Change cursor if disabled
                    }}
                >
                    Order Ice cream
                </button>
                <button
                    className='button-restocked'
                    onClick={handleRestocked}
                >
                    Restock Ice creams
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

export default IcecreamView;

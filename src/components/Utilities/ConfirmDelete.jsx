import { useState } from "react";
import Modal from "../StyledComponents/Modal";

const ConfirmDelete = ({isOpen, onClose, onConfirm, itemName}) =>{

    const [input, setInput] = useState('');

    const isMatch = input === itemName;

    const handleConfirm = () => {
        if (isMatch){
            onConfirm();
            setInput('');
        }
    }

    return(
        <Modal 
            isOpen={isOpen} 
            onClose={() => { 
                setInput(''); 
                onClose(); 
            }} 
            title={`Confirm Delete "${itemName}"`}
            >
            <p>Please type <strong>{itemName}</strong> to confirm.</p>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border rounded p-2 w-full mt-2"
                placeholder={itemName}
            />
            <div className="mt-4 flex justify-end gap-2">
                <button
                    onClick={() => {
                        setInput(''); 
                        onClose(); 
                    }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                Cancel
                </button>
                <button
                onClick={handleConfirm}
                disabled={!isMatch}
                className={`px-4 py-2 bg-red-600 text-white rounded transition ${!isMatch ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                >
                Delete
                </button>
            </div>
        </Modal>
    );
}

export default ConfirmDelete;
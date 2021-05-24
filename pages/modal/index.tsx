import React, {useState} from 'react';
import Modal from '../../components/Modal'
export default function() {

    const [openModal, setOpenModal] = useState(false)

    return (
        <div className="container">
            <h1>Hello</h1>
            <Modal 
                isVisible={openModal}
                // renderFooter={ () => {
                //     return <p>Custom footer</p>
                // }}
                onCancel={ () => {
                    setOpenModal(false)
                }}
                onOk={ () => {
                    console.log('submitted')
                }}
                >
                <h1>Test</h1>
            </Modal>
            <button onClick={()=> {
                setOpenModal(true)
            }}>
                Open Modal
            </button>
        </div>
    )
}
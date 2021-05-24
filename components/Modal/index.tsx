import React, {useEffect, useRef, useState} from 'react';
// import "./modal.scss";

type ModalProps = {
    isVisible: boolean;
    renderFooter?: () => JSX.Element;
    onOk?: () => void;
    onCancel?: () => void;
}

const CLASS_DEFAULT = "tcl-modal__wrapper";

const Modal: React.FC<ModalProps> = ( { 
    children, 
    isVisible,
    renderFooter,
    onCancel,
    onOk,
} ) => {
    const [className, setClassName] = useState(CLASS_DEFAULT)

    useEffect(() => {
        if ( isVisible ) {
            setClassName((oldClass) => oldClass +" show")
            document.querySelector("body").classList.add("tcl-modal__open")
        } else {
            setClassName(CLASS_DEFAULT)
            document.querySelector("body").classList.remove("tcl-modal__open")
        }
    }, [isVisible])

    const _renderFooter = (): JSX.Element => {
        if(renderFooter) return renderFooter();
        return(
            <>
                <button className="tcl-modal__cancel" onClick={onCancel}>Cancel</button>
                <button className="tcl-modal__ok" onClick={onOk}>OK</button>
            </>
        )
    }
    

    return (
        <div className={className}>
            <div className="tcl-mask"></div>
            <div className="tcl-dialog">
                <div className="tcl-modal__content">
                    <div className="tcl-modal__header">
                        Header
                        <button className="tcl-modal__close">X</button>
                    </div>
                    <div className="tcl-modal__body">
                        {children}
                    </div>
                    <div className="tcl-modal__footer">
                        {_renderFooter()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;
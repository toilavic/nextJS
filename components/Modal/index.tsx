import React, {useEffect, useState} from 'react';
// import "./modal.scss";

type ModalProps = {
    isVisible: boolean;
    isRenderHeader?: boolean;
    isRenderCloseIcon?: boolean;
    buttonOkText?: string;
    buttonCancelText?: string;
    renderFooter?: () => JSX.Element;
    onOk?: () => void;
    onCancel?: () => void;
}

const CLASS_DEFAULT = "tcl-modal__wrapper";

const Modal: React.FC<ModalProps> = ( { 
    children, 
    isVisible : isVisibleOutside,
    isRenderHeader,
    isRenderCloseIcon,
    buttonOkText,
    buttonCancelText,
    renderFooter,
    onCancel,
    onOk,
} ) => {
    const [className, setClassName] = useState(CLASS_DEFAULT);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        function handler(event) {
            // escape ESC button
            if(event.which === 27) onCancel();
        }
        document.addEventListener("keyup", handler)
        return () => {
            // remove listener for clean up
            document.removeEventListener("keyup", handler)
        }
    })

    useEffect(() => {
        setIsVisible(isVisibleOutside)
    }, [isVisibleOutside])

    useEffect(() => {
        if ( isVisible ) {
            setClassName((oldClass) => oldClass +" show")
            document.querySelector("body").classList.add("tcl-modal__open")
        } else {
            setClassName(CLASS_DEFAULT)
            document.querySelector("body").classList.remove("tcl-modal__open")
        }
    }, [isVisible])

    const _onCancel = (): void => {
        if(onCancel) onCancel();
        setIsVisible(false);
    }

    const _renderFooter = (): JSX.Element => {
        if(renderFooter) return renderFooter();
        return(
            <>
                <button className="tcl-modal__cancel" onClick={_onCancel}> {buttonCancelText} </button>
                <button className="tcl-modal__ok" onClick={onOk}> {buttonOkText} </button>
            </>
        )
    }
    
    if ( isVisible === false ) return null;
    return (
        <div className={className}>
            <div className="tcl-mask" onClick={_onCancel}></div>
            <div className="tcl-dialog">
                <div className="tcl-modal__content">
                    { isRenderHeader && 
                        <div className="tcl-modal__header">
                        Header
                        { isRenderCloseIcon && <button className="tcl-modal__close" onClick={_onCancel}>X</button> }
                        </div>
                    }
                    
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

Modal.defaultProps = {
    isVisible: false,
    isRenderHeader: true,
    isRenderCloseIcon: true,
    buttonOkText: 'Ok',
    buttonCancelText: 'Cancel'
}

export default Modal;
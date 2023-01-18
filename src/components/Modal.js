import React, { useCallback } from "react";
import { useEffect, useRef } from "react";

const Modal = ({ onClose, title, children, show }) => {
    // Close modal on escape key press
    const modalRef = useRef();

    const closeOnEscapeKeyDown = useCallback(
        (e) => {
            if ((e.charCode || e.keyCode) === 27) {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        setTimeout(() => {
            modalRef.current.classList.add("active");
        }, 10);
        document.addEventListener("keydown", closeOnEscapeKeyDown);
        return () => {
            document.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, [closeOnEscapeKeyDown]);

    return (
        <div ref={modalRef} className="modal fade-in" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
};

export default Modal;

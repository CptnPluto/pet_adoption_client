import React, { useCallback } from "react";
import { useEffect } from "react";

const Modal = ({ onClose, title, children }) => {
    // Close modal on escape key press
    // Use useCallback to prevent useEffect warning: missing dependency.
    const closeOnEscapeKeyDown = useCallback(
        (e) => {
            if ((e.charCode || e.keyCode) === 27) {
                onClose();
            }
        },
        [onClose]
    );

    useEffect(() => {
        // document.body.style.overflow = 'hidden';
        document.addEventListener("keydown", closeOnEscapeKeyDown);
        return () => {
            // document.body.style.overflow = 'unset';
            document.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, [closeOnEscapeKeyDown]);

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                </div>
                <div className="modal-body">{children}</div>
                <div className="modal-footer">
                    <h3>Footer</h3>
                    <button className="button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;

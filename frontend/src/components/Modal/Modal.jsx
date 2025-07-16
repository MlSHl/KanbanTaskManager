import { useEffect, useRef } from "react";
import "./Modal.css"

function Modal({onClose, children}){
    const modalRef = useRef();

    useEffect(() =>{
        function mouseOnClickOutside(event){
            if(modalRef.current && !modalRef.current.contains(event.target)){
                onClose();
            }
        }

        document.addEventListener("mousedown", mouseOnClickOutside);
        return () => {
            document.removeEventListener("mousedown", mouseOnClickOutside)
        }
    }, [onClose])



    return (
        <div className="modal-backdrop">
            <div className="modal-content" ref={modalRef}> 
                <button className="close-button" onClick={onClose}>x</button>
                {children}
            </div>
        </div>
    )
}

export default Modal;
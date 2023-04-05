'use client'
import {useState, useEffect} from 'react'
interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disbaled?: boolean;
    secondaryAction?: () => void;
    secondaryLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,onClose,onSubmit,title,body,
    footer, actionLabel, disbaled, secondaryAction,
    secondaryLabel

}) => {
    const [showModal, setShowModal] = useState(isOpen)
    useEffect(() => {
        setShowModal(isOpen)
    }, [isOpen])
    return (
        <div>

        </div>
    )
}

export default Modal; 
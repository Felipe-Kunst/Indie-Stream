import React from 'react';
import styles from './AvisoDeletar.module.css';

const AvisoDeletar = ({ onConfirm, onCancel }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={onCancel}>✕</button>
                <h2 className={styles.title}>Tem certeza que deseja excluir sua conta?</h2>
                <div className={styles.actions}>
                    <button className={styles.confirmButton} onClick={onConfirm}>Excluir</button>
                    <button className={styles.cancelButton} onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default AvisoDeletar;

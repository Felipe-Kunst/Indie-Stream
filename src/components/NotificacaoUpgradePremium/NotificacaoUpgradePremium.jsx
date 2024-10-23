import React from 'react';
import styles from './NotificacaoUpgradePremium.module.css';

const NotificacaoUpgradePremium = ({ onClose }) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.title}>Limite de Projetos criados atingido!</span>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
            </div>
            <div className={styles.body}>
                <p>Torne um usuário <span className={styles.premium}>Premium</span> e desfrute de todas as funcionalidades do Site sem barreiras!</p>
            </div>
            <div className={styles.footer}>
                <button className={styles.button}>Ver Planos</button>
            </div>
        </div>
    );
}

export default NotificacaoUpgradePremium;

import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Delete JWT Token
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <>
            <header className={`${styles.headerContainer} ${isModalOpen ? styles.modalOpen : ''}`}>
                <nav>
                    <ul className={styles.navList}>
                        <div className={styles.navGroup}>
                        </div>
                        <div className={styles.navGroup}>
                            <>
                                <li>
                                    <NavLink to="#">My Account</NavLink>
                                </li>
                                <li>
                                    <NavLink as="button" to="#" onClick={handleLogout}>Logout</NavLink>
                                </li>
                            </>
                        </div>
                    </ul>
                </nav>
            </header>
            <button className={styles.navButton} onClick={toggleModal}>+</button>
            {isModalOpen && (
                <div className={styles.modalOverlay} onClick={toggleModal}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={toggleModal}>×</button>
                        <nav>
                            <ul className={styles.navList}>
                                <div className={styles.navGroup}>
                                </div>
                                <div className={styles.navGroup}>
                                    <>
                                        <li>
                                            <NavLink to="#" onClick={toggleModal}>My Account</NavLink>
                                        </li>
                                        <li>
                                            <NavLink as="button" to="#" onClick={() => { handleLogout(); toggleModal(); }}>Logout</NavLink>
                                        </li>
                                    </>
                                </div>
                            </ul>
                        </nav>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;

import styles from "./Navbar.module.css";
import {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';



function Navbar() {
    //adding the states 
    const [isActive, setIsActive ] = useState(false);
    //Get the current location 
    const location = useLocation();

    useEffect(() =>{
        // close the navbar if the location changes 
        if(isActive){
            setIsActive(false);
        }
    }, [location]);

    const toggleActiveClass = () =>{
        setIsActive(!isActive);
    };
    
    return(
        <div className="App">
            <header className="App-header">
                <nav className={`${styles.navbar}`}>
                    <h1 className={`${styles.logo}`}>Perch</h1>
                    <ul className={`${styles.navMenu} ${isActive ? styles.active : ''}`}>
                       
                        <li onClick={toggleActiveClass}>
                            <Link to='/registration' className={`${styles.navLink}`}>Register</Link>
                        </li>
                        <li onClick={toggleActiveClass}>
                            <Link to='/signIn' className={`${styles.navLink}`}>Sign In</Link>
                        </li>
                    </ul>
                    <div className={`${styles.hamburger} ${isActive ? styles.active : ''}`} onClick={toggleActiveClass}>
                        <span className={`${styles.bar}`}></span>
                        <span className={`${styles.bar}`}></span>
                        <span className={`${styles.bar}`}></span>
                    </div>

                </nav >
            </header>
        </div> 
    );
};
export default Navbar;

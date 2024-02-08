import React, {useState, useEffect} from 'react';
import './App.css';
import { ReactComponent as Arrow } from "./union.svg";

const App: React.FC = () => {

    if (localStorage.getItem("bannerClosed") === null) {
        localStorage.setItem("bannerClosed", "false")
    }
    const initialBannerState = localStorage.getItem('bannerClosed') !== 'true';
    const [showBottomBanner, setShowBottomBanner] = useState(initialBannerState);
    const [isVisible, setIsVisible] = useState(false);
    const [shopText, setShopText] = useState("Shop now through Monday")


    const checkVisibility = () => {
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight;

        if (scrollY - 100 >= (documentHeight / 2) - windowHeight) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkVisibility);
        const updateText = () => {
            const containerWidth = document.documentElement.clientWidth;
            if (containerWidth <= 400) {
                setShopText('Shop now!');
            } else {
                setShopText('Shop now through Monday');
            }
        };
        updateText();

        window.addEventListener('resize', updateText);

        return () => {
            window.removeEventListener('resize', updateText)
            window.removeEventListener('scroll', checkVisibility);
        };
    }, []);

    const closeBottomBanner = () => {
        setShowBottomBanner(false);
        localStorage.setItem('bannerClosed', 'true');
    };

    return (
        <div className="card-container">
            <div className="top-banner">
                <div className="top-banner-content">
                    <span className="gap">
                        <strong>Black Friday</strong>
                        <span className="mobile-mode-comma">,</span>
                        <span className="tablet-mode">, 24-27 Nov</span>
                    </span>
                    <span className="discount gap">10% OFF</span>
                    <span className="top-banner-code gap">
                        Use code <strong className="discount">10FRIDAY</strong>
                        <span className="tablet-mode"> at checkout</span>
                    </span>
                </div>
                <button className="top-banner-shop-btn" onClick={() => alert("You can shop now!")}>Shop now</button>
                <button className="top-banner-close tablet-mode" onClick={closeBottomBanner}>×</button>
                <Arrow className="top-banner-arrow" onClick={() => alert("You can shop now!")}/>
            </div>
            {isVisible && showBottomBanner && (
                <div className="banner" style={{bottom: isVisible ? '20px' : '-100%'}}>
                    <div className="container">
                        <button className="bottom-banner-close-btn" onClick={closeBottomBanner}>×</button>
                        <div className="bottom-banner-content">
                            <p className="bottom-banner-title">Black Friday</p>
                            <p className="bottom-banner-discount">10% OFF</p>
                            <p>Use code <strong className="discount">10FRIDAY</strong> at checkout</p>
                            <button className="bottom-banner-shop-btn" onClick={() => alert("You can shop now!")}>{shopText}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default App;
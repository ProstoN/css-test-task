import React, {useState, useEffect} from 'react';
import './App.css';

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

        // Активировать, когда пользователь прокрутил до середины страницы
        if (scrollY > (documentHeight / 2) - windowHeight) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', checkVisibility);
        const updateText = () => {
            const containerWidth = document.documentElement.clientWidth;
            if (containerWidth < 400) {
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
            <div id="top-banner"></div>
                <div className="banner"
                     style={{
                         bottom: isVisible ? '20px' : '-100%',
                     }}
                >
                    {isVisible && (
                        <div className="container">
                            <button className="close-btn" onClick={closeBottomBanner}>×</button>
                            <div className="content">
                                <p className="title">Black Friday</p>
                                <p className="discount">10% OFF</p>
                                <p className="code">Use code 10FRIDAY at checkout</p>
                                <button className="shop-btn">{shopText}</button>
                            </div>
                        </div>
                    )}
                </div>
        </div>

    );
};

export default App;
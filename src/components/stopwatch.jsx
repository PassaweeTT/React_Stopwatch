import React, { useState, useEffect } from "react";

function Stopwatch() {
    const [milsec, setmilsec] = useState(0);
    const [backgroundColor, setBackgroundColor] = useState("#374151");
    const [running, setRunning] = useState(false);
    const [buttonText, setButtonText] = useState("Run");
    const [textColor, setTextColor] = useState("#000");

    useEffect(() => {
        let intervalId = null;

        if (running) {
            intervalId = setInterval(() => {
                setmilsec((prevmilsec) => prevmilsec + 10);
            }, 10);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [running]);

    useEffect(() => {
        let colorIntervalId = null;

        if (running) {
            colorIntervalId = setInterval(() => {
                if (milsec % 1000 === 0) {
                    setBackgroundColor(generateRandomColor());
                }
            }, 1000); // Change the interval duration here (e.g., 700 for 0.7 seconds)
        }

        return () => {
            clearInterval(colorIntervalId);
        };
    }, [running]);

    useEffect(() => {
        const brightness = calculateBrightness(backgroundColor);
        setTextColor(brightness > 127 ? "#000" : "#fff");
    }, [backgroundColor]);

    const generateRandomColor = () => {
        const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
        return randomColor;
    };

    const calculateBrightness = (color) => {
        const hex = color.replace("#", "");
        const red = parseInt(hex.substr(0, 2), 16);
        const green = parseInt(hex.substr(2, 2), 16);
        const blue = parseInt(hex.substr(4, 2), 16);
        return red * 0.299 + green * 0.587 + blue * 0.114;
    };

    const handleStartStop = () => {
        if (running) {
            setRunning(false);
            setButtonText("Run");
        } else {
            setRunning(true);
            setButtonText("Stop");
        }
    };

    const handleReset = () => {
        setmilsec(0);
        setBackgroundColor("#374151");
        setRunning(false);
        setButtonText("Run");
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const milsec = time % 1000;

        return `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${milsec
                .toString()
                .padStart(3, "0")}`;
    };

    const onGetDataLayer = () => {
        console.log(window.dataLayer.find((x) => x.event === "cnxEvents").data);
    }

    const onCartUpdate = () => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'eventName': 'cart_update',
            'eventData': {
                'action': 'Add to cart',
                'item_id': 'nike-shoes-123',
                'product_id': '123',
                'title': 'Nike Shoes',
                'brand': 'Nike',
                'price': 10.99,
                'discount_percent': 0,
                'discount_value': 0,
                'total_quantity': 2,
                'total_price': 21.98
            }
        });
    }

    const onPageVisit = () => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'eventName': 'page_visit',
            'eventData': {
                'referrer': 'Lazada.com',
            }
        });
    }

    const onIdentify = () => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'eventName': 'identify',
            'hardId': "tsunakung@vongole.net",
            'customerData': {
                'first_name': 'Sawada',
                'last_name': 'Tsunayoshi',
                'gender': 'Male',
                'score': '99',
                'country': 'Japan',
                'city': 'Tokyo',
                'age': '15'
            }
        });
    }

    const onAnonymous = () => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'eventName': 'anonymous',
        });
    }

    return (
        <div
            className="row"
            style={{
                backgroundColor,
                color: textColor,
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                // justifyContent: "center",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <div className="row">
                <h1 style={{ fontSize: "2rem" }}>TT-Stopwatch</h1>
            </div>
            <div className="w-40 row">
                <img src="./nino.png" />
            </div>

            <div className="row">
                <p style={{ fontSize: "2rem", marginBottom: "2rem" }}>
                    Time: {formatTime(milsec)}
                </p>
            </div>
            <div className="row">
                <button
                    style={{
                        fontSize: "1.5rem",
                        padding: "1rem",
                        marginRight: "1rem",
                        background: running ? "#ff5555" : "#55ff55",
                        color: running ? "#fff" : "#374151",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={handleStartStop}
                >
                    {buttonText}
                </button>
                <button
                    style={{
                        fontSize: "1.5rem",
                        padding: "1rem",
                        background: "#5555ff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>

            <div className="row" >
                <button className="btn-primary" id="btn-getTIme"
                    style={{
                        fontSize: "1.5rem",
                        padding: "1rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Get System Time
                </button>
            </div>
            <div className="row" >
                <button className="btn-primary" id="btn-addToCart"
                    style={{
                        fontSize: "1.5rem",
                        padding: "1rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={onCartUpdate}
                >
                    Add to Cart
                </button>
                <button className="btn-primary" id="btn-pageVisit"
                    style={{
                        fontSize: "1.5rem",
                        padding: "1rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={onPageVisit}
                >
                    Page Visit
                </button>
            </div>
            <div className="row" >
                <button className="btn-primary" id="btn-identify"
                    style={{
                        fontSize: "1.5rem",
                        padding: "1rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={onIdentify}
                >
                    Identify
                </button>
                <button className="btn-primary" id="btn-anonymous"
                    style={{
                        fontSize: "1.5rem",
                        padding: "1rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={onAnonymous}
                >
                    Anonymous
                </button>
            </div>
            <div className="row">
                <button className="btn-primary" id="btn-getDataLayer"
                    style={{
                        fontSize: "1.5rem",
                        padding: "1rem",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={onGetDataLayer}
                >
                    Get DataLayer
                </button>
            </div>
        </div >
    );
}

export default Stopwatch;

'use client';

import { useState } from 'react';

const tabs = ['hat', 'eyewear', 'shirt', 'shoes'];

// Tabs Component
const PopupTabs = ({ activeTab, onTabClick }) => {
    return (
        <div className="popup_tabs">
            {tabs.map((tab) => (
                <div
                    key={tab}
                    className={`tab_ ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => onTabClick(tab)}
                    style={{ cursor: 'pointer' }}
                >
                    <img
                        src={`/assets/${tab.charAt(0).toUpperCase() + tab.slice(1)} Icon.png`}
                        className="icon_img_"
                        alt={`${tab} button`}
                    />
                </div>
            ))}
        </div>
    );
};

// Tab Panels
const HatPanel = () => (
    <div className="right_box_inner active_inventory">
        <div className="grid_box_main">
            <div className="grid-container">
                {Array(12).fill(null).map((_, i) => (
                    <div key={i} className="grid-item">
                        <img src="/assets/Rectangular Button.png" className="icon-img" alt="btn" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const EyewearPanel = () => (
    <div className="right_box_inner active_inventory">
        <div className="grid_box_main">
            <div className="grid-container">
                {Array(6).fill(null).map((_, i) => (
                    <div key={i} className="grid-item">
                        <img src="/assets/Rectangular Button.png" className="icon-img" alt="btn" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ShirtPanel = () => (
    <div className="right_box_inner active_inventory">
        <div className="grid_box_main">
            <div className="grid-container">
                {Array(4).fill(null).map((_, i) => (
                    <div key={i} className="grid-item">
                        <img src="/assets/Rectangular Button.png" className="icon-img" alt="btn" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const ShoesPanel = () => (
    <div className="right_box_inner active_inventory">
        <div className="grid_box_main">
            <div className="grid-container">
                {Array(2).fill(null).map((_, i) => (
                    <div key={i} className="grid-item">
                        <img src="/assets/Rectangular Button.png" className="icon-img" alt="btn" />
                    </div>
                ))}
            </div>
        </div>
    </div>
);

// Main Popup Box Component
const PopupBox = () => {
    const [activeTab, setActiveTab] = useState('hat');

    return (
        <div id="popupBox" className="popup-container">
            <div className="flex_box">
                <div className="left_box">
                    <img src="/assets/Gundy.png" className="icon-img" alt="Friends" />
                </div>
                <div className="right_box">
                    <PopupTabs activeTab={activeTab} onTabClick={setActiveTab} />
                    
                    {/* Render Tab Content Conditionally */}
                    {activeTab === 'hat' && <HatPanel />}
                    {activeTab === 'eyewear' && <EyewearPanel />}
                    {activeTab === 'shirt' && <ShirtPanel />}
                    {activeTab === 'shoes' && <ShoesPanel />}
                </div>
            </div>
        </div>
    );
};

export default PopupBox;

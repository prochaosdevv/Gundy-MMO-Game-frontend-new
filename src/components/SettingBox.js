'use client';

const SettingBox = () => {

 
    const closeBox = () => {
        document.getElementById("setting_box").style.display = "none";
    }
    return (
        <>
         <div id="setting_box" className="setting-container" style={{"display": "none"}}>
   <div className="cross_box" onClick={() => closeBox()}>
    <div className="cross_bg">
        <img src="/assets/cross.png" className="cross_btn" alt="Close" id="close_btn" />
        
    </div>
</div>

   <div className="setting_inner">
    <p className="volume">Volume</p>
    <div className="progess">
        <img src="/assets/Volume_selector.png" className="selector" alt="selector" id="selector" />
    </div>
    <div className="setting_btns">
        <div className="setting_inner_btn">
            <p>Keybinds</p>
        </div>
        <div className="setting_inner_btn btn_logout">
            <p>Logout</p>
        </div>
    </div>
    <p className="setting_text">Currently logged in with:
        <br/>
        gundy@gundy.com
    </p>
   </div>

  
 
  </div>
        </>
    )
}

export default SettingBox;

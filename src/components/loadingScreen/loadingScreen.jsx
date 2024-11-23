import React from "react";

export default function LoadingScreen() {
    const styles = {
        spinnerContainer: {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "915px",
          backgroundColor: "#BCF4F5", // Subtle background for loader
        },
        spinner: {
          width: "50px",
          height: "50px",
          border: "5px solid #D9F2B4", // Lighter color for background
          borderTop: "5px solid #B4EBCA", // Highlighted color for spinning
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        },
      };
      
      // Add keyframes globally in your app
      const styleSheet = document.styleSheets[0];
      const keyframes =
        `@keyframes spin {
           0% { transform: rotate(0deg); }
           100% { transform: rotate(360deg); }
         }`;
      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    
    
    return (
        <div style={styles.spinnerContainer}>
          <div style={styles.spinner}></div>
        </div>
    );

    
      
}
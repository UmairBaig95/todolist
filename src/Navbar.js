import React from "react";
export default function Navbar() {
  const styles = {
    navBar: {
        height: "6rem",
        backgroundColor: "#64B5F6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "3rem",
        color: "white",
        fontFamily: "initial",
        fontWeight: "600"
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={styles.navBar}>
        TODO LIST
      </nav>
    </>
  );
}

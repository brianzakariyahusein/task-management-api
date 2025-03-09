import React from "react";

function Header() {
  return (
    <header style={StyleSheet.header}>
      <h1>Task Managment APP</h1>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "#333",
    color: "#fff",
    padding: "15px",
    textAlign: "center",
  },
};

export default Header;

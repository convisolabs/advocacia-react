function PageContainer({ children }) {
  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      background: "#faf6ef",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      padding: 16
    }}>
      {children}
    </div>
  );
}

export default PageContainer; 
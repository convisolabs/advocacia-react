function FloatingBox({ children, style = {} }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 18,
        boxShadow:
          "0 8px 32px 0 rgba(34, 34, 34, 0.18), 0 1.5px 8px 0 rgba(139, 111, 61, 0.10)",
        padding: 40,
        width: "100%",
        maxWidth: 410,
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        transition: "box-shadow 0.3s cubic-bezier(.4,2,.6,1)",
        position: "relative",
        zIndex: 2,
        ...style
      }}
    >
      {children}
    </div>
  );
}

export default FloatingBox; 
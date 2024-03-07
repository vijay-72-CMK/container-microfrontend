import React from "react";

const NotFoundPage = () => (
  <div style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
    <iframe
      src="/404.html"
      title="404 Error Page"
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  </div>
);

export default NotFoundPage;

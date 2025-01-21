// src/components/MainContent.jsx
// eslint-disable-next-line react/prop-types
const MainContent = ({ children }) => {
    return (
      <main
        id="main-content"
        className="flex-1 relative p-6 bg-gray-50 dark:bg-gray-800"
      >
        {children}
      </main>
    );
  };
  
  export default MainContent;
  
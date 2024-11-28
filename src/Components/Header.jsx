/*This is my header functional component*/
/*created a hamburger sign.
 *A todo logo image.
 *Displaying Todo in the middle of the header
 */
function Header() {
  return (
    <header>
      <div className="logo">
        <img src="/todoLogo.jpg" alt="Logo" />
      </div>
      <div className="app-name">Todo App</div>
      <div className="hamburger">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </header>
  );
}
export default Header;

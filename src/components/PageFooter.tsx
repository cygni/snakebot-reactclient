import cygnilogo from "../assets/logos/cygni-logo-black.svg";
import instagramCygni from "../assets/images/cygni-instagram.png";
import { useLocation } from "react-router-dom";

function PageFooter() {
  const { pathname } = useLocation();

  return (
    <>
      <footer>
        <a href='https://www.cygni.se'>
          <img src={cygnilogo} alt='Cygni-logo' />
        </a>

        <div className={pathname === "/" ? "hidden-wrapper" : "hide"}>
          <img className='phone-cygni' src={instagramCygni} alt='Cygni-instagram' />
        </div>
      </footer>
    </>
  );
}

export default PageFooter;

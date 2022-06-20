import cygnilogo from '../assets/logos/cygni-logo.svg';

function PageFooter() {
  return (
    <footer className="clear-fix">
      <a href="https://www.cygni.se">
        <img src={cygnilogo} alt="Cygni-logo" />
      </a>
      <p>Insert adress?</p>
    </footer>
  );
}

export default PageFooter;
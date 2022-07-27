import cygnilogo from '../assets/logos/cygni-logo-black.svg';

function PageFooter() {
  return (
    <>
      <footer>
        <a href='https://www.cygni.se'>
          <img src={cygnilogo} alt='Cygni-logo' />
        </a>
      </footer>
    </>
  );
}

export default PageFooter;

import styled from 'styled-components';
import { ImGithub, ImTwitter } from 'react-icons/im';

const Footer = () => {
  return (
    <StyledFooter>
      <div className="links">
        <a
          href="https://github.com/Andantez"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImGithub className="github" />
        </a>
        <a
          href="https://twitter.com/KaloyanAtanasov"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImTwitter className="twitter" />
        </a>
      </div>
      <div className="copyright">© 2021 Meow Portal</div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  display: grid;
  margin: 1em auto;
  gap: 0.25em;
  place-items: center;
  font-family: var(--ff-paragraph);
  font-weight: var(--fw-bold);
  color: var(--clr-primary-500);

  .links {
    font-size: 1.5em;
    display: flex;
    gap: 0.5em;

    .github,
    .twitter {
      transition: transform 250ms ease, color 250ms ease;
    }
    .github:hover {
      color: #333;
    }
    .twitter:hover {
      color: #1da1f2;
    }
    .github:hover,
    .twitter:hover {
      transform: scale(1.1);
    }
  }

  .copyright {
    font-size: 0.8125em;
    /* margin-bottom: 1em; */
  }
`;
export default Footer;

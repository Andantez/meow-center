import styled from 'styled-components';

const Footer = () => {
  return (
    <StyledFooter>
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

  .copyright {
    font-size: 0.8125em;
  }
`;
export default Footer;

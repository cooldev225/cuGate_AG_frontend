import "../../assets/scss/footer.scss";

export const Footer: React.FC = () => {
  return (
    <footer className="uk-section uk-section-small uk-section-secondary">
      <div className="uk-container uk-container-large">
        <div className="uk-grid uk-child-width-1-4@m" uk-grid="">
          <div className="uk-first-column">
            © 2010 - 2022 Cugate Ltd.
          </div>
          <div className="">
            <ul className="uk-list">
              <li><a href="#service-digital-distribution" uk-scroll="offset: 107">DIGITAL DISTRIBUTION</a></li>
              <li><a href="#service-radio-monitoring" uk-scroll="offset: 107">RADIO MONITORING</a></li>
              <li><a href="#service-sync-licensing" uk-scroll="offset: 107">SYNC LICENSING</a></li>
              <li><a href="#service-cuspace" uk-scroll="offset: 107">CUSPACE</a></li>
              <li><a href="#service-blockchain" uk-scroll="offset: 107">BLOCKCHAIN / NFT</a></li>
            </ul>
          </div>
          <div className="">
            <ul className="uk-list">
              <li>
                <a href="our-team.php">
                  Our Team
                </a>
              </li>
              <li>
                <a href="impressum.php">
                  Impressum
                </a>
              </li>
              <li>
                <a href="privacy-policy.php">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="">
            Social Links
          </div>
        </div>
      </div>
    </footer>
  );
};

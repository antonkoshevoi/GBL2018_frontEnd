import React from 'react';
import {translate} from 'react-i18next';

import SplashHeader from './sections/SplashHeader'
import SplashNavigation from './sections/SplashNavigation'
import SplashFooter from './sections/SplashFooter'

import './splash.css';
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';

const minHeight = window.document.documentElement.clientHeight - 225;

const Disclaimer = (props) => {
  return (<div className="splash">
    <StickyHeader
      // This is the sticky part of the header.
      header={
        <section>
          <SplashHeader {...props} />
          <SplashNavigation {...props} />
        </section>
      }
    >
      <section className="splash-container" >
        <div className="container" style={{minHeight: minHeight}}>
          <h2 className="c8" id="h.pzd6mn33o1cl">
            <span className="c7">Disclaimer</span>
          </h2>
          <p className="c0">
        <span className="c1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;To the maximum extent permitted by applicable law, we exclude all
            representations, warranties and conditions relating to our website and the use of this website (including, without
            limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose and/or the
            use of reasonable care and skill). Nothing in this disclaimer will:</span>
          </p>
          <ul className="c11 lst-kix_ctw05tiadty-0 start">
            <li className="c0 c15">
              <span className="c1">limit or exclude our or your liability for death or personal injury resulting from negligence;</span>
            </li>
            <li className="c0 c15">
              <span className="c1">limit or exclude our or your liability for fraud or fraudulent misrepresentation;</span>
            </li>
            <li className="c0 c15">
              <span className="c1">limit any of our or your liabilities in any way that is not permitted under applicable law; or</span>
            </li>
            <li className="c0 c15">
              <span className="c1">exclude any of our or your liabilities that may not be excluded under applicable law.</span>
            </li>
          </ul>
          <p className="c0">
        <span className="c1">The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer: (a) are subject
            to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer or in relation to the
            subject matter of this disclaimer, including liabilities arising in contract, in tort(including negligence) and
            for breach of statutory duty.</span>
          </p>
          <p className="c0">
        <span className="c1">To the extent that the website and the information and services on the website are provided free of charge, we will
            not be liable for any loss or damage of any nature.</span>
          </p>
          <p className="c0 c10">
            <span className="c1"></span>
          </p>
          <p className="c18">
            <span className="c1">_____________________________________</span>
          </p>

        </div>
        <SplashFooter {...props} />
      </section>
    </StickyHeader>
  </div>)
};

export default translate('splashScreen')(Disclaimer);
import React, {Component} from 'react';
import flipperMap from  './platformContentMap.json'

const spacerUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/bl-spacer.70e5290c.svg';
const circleBookUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/circle-books.a4c524f8.svg';
const circleParentChildUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/circle-parent-child.ab68fd20.svg';
const circleSchoolUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/circle-school.1359579c.svg';

const style = {
  flipper: {
    backgroundSize: '90%',
    minHeight:300,
    position:'relative',
    marginTop: 15,
  }
}
const flippers = [
  {icon: circleParentChildUrl },
  {icon: circleSchoolUrl },
  {icon: circleBookUrl },
];


class FlipperCards extends Component {

  constructor(props) {
    super(props);

    this.handleTouchOnFlip = this.handleTouchOnFlip.bind(this);

    this.state = { flipped : false };
  }

  handleTouchOnFlip() {
    this.setState({ flipped : !this.state.flipped })
  }

  render() {
    const {t} = this.props;
    return (
      <div className="col-md-4 text-center" key={this.props.index} style={style.flipper}>
        <div className={`flip-container ${this.state.flipped ? 'hover' : ''}`} onTouchStart={this.handleTouchOnFlip}>
          <div className="flipper">
            <div className="front">
              <div class="info-box">
                <span class="circle-icon icon-gurantee icon-align">
                  <img src={flippers[this.props.index].icon} alt="" className="flipperIcon"/>
                </span>
                <div class="info-line"></div>
                <h3 class="heading-content">{t(`${this.props.title}.title`)}</h3>
                <p class="content-about">{t(`${this.props.title}.title`)}</p>
                <div class="info-line"></div>
              </div>
            </div>

            <div className="back">
              <div class="info-box info-content">
                <div class="info-line"></div>
                <p class="content-about">
                  {this.props.content.map((items, index) =>
                    <div>
                      <h5>{t(`${this.props.title}.${items.title}`)}</h5>
                      <ul>
                        {items.contents.map( cItems =>
                          <li>{t(`${this.props.title}.${cItems}`)}</li>
                        )}
                      </ul>
                    </div>

                  )}
                </p>
                <div class="info-line"></div>
              </div>

            {
              // <div className="flipper-cards">
              //   <hr />
              //   {this.props.content.map((items, index) =>
              //     <div>
              //       <h5>{t(`${this.props.title}.${items.title}`)}</h5>
              //       <ul>
              //         {items.contents.map( cItems =>
              //           <li>{t(`${this.props.title}.${cItems}`)}</li>
              //         )}
              //       </ul>
              //     </div>

              //   )}
              //   <hr />
              // </div>
            }
            </div>
          </div>
        </div>
      </div>
    )
  }
}


class SplashPlatform extends Component {
  render() {
    const {t} = this.props;
    console.debug(t('studentsAndParents'))


    return (
      <div className="splash-platform">
        <header className="header-break container text-center">
          <h2>{t('learningPlatform')}</h2>
          <img src={spacerUrl} alt="---=== ===---" width="200"/>
        </header>
        <div className="container">
          <div className="row  about-info">
            {flipperMap.map((item, index)=>
              <FlipperCards
                t={t}
                key={index}
                index={index}
                title={item.title}
                content={item.content}
              />
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default SplashPlatform
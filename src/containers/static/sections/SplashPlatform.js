import React, {PureComponent} from 'react';
const spacerUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/bl-spacer.70e5290c.svg';
const circleBookUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/circle-books.a4c524f8.svg';
const circleParentChildUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/circle-parent-child.ab68fd20.svg';
const circleSchoolUrl = '//d2cnhr6egzpvdl.cloudfront.net/image/circle-school.1359579c.svg';

const flippers = [
  {icon: circleParentChildUrl },
  {icon: circleSchoolUrl },
  {icon: circleBookUrl },
];

const style = {
  flipper: {
    backgroundSize: '90%',
    minHeight:335,
    position:'relative',
    marginTop: 41,
  }
};

const flipperMap = [
    {
        "title": "studentAndParents",
        "content": [
            {
                "title": "kids",
                "contents": [
                    "kidsOpt1",
                    "kidsOpt2",
                    "kidsOpt3"
                ]
            },
            {
                "title": "parent",
                "contents": [
                    "parentOpt1",
                    "parentOpt2"
                ]
            }
        ]
    },
    {
        "title": "schoolAndTeacher",
        "content": [
            {
                "title": "principals",
                "contents": [
                    "principalsOpt1",
                    "principalsOpt2",
                    "principalsOpt3"
                ]
            },
            {
                "title": "teacher",
                "contents": [
                    "teacherOpt1",
                    "teacherOpt2"
                ]
            }
        ]
    },
    {
        "title": "publishers",
        "content": [
            {
                "title": "publishers",
                "contents": [
                    "publishersOpt1",
                    "publishersOpt2",
                    "publishersOpt3"
                ]
            },
            {
                "title": "authors",
                "contents": [
                    "authorsOpt1",
                    "authorsOpt2"
                ]
            }
        ]
    }
];

class FlipperCards extends PureComponent {

  constructor(props) {
    super(props);

    this.handleTouchOnFlip = this.handleTouchOnFlip.bind(this);

    this.state = { flipped : false };
  }

  handleTouchOnFlip(e) {
    e.preventDefault();

    this.setState({ flipped : !this.state.flipped })
  }

  render() {
    const {t} = this.props;
    return (
      <div className="col-md-4 text-center" key={this.props.index} style={style.flipper}>
        <div className={`flip-container ${this.state.flipped ? 'hover' : ''}`} onTouchStart={this.handleTouchOnFlip}>
          <div className="flipper">
            <div className="front">
              <div className="info-box">
                <span className="circle-icon icon-gurantee icon-align">
                  <img src={flippers[this.props.index].icon} alt="" className="flipperIcon"/>
                </span>
                <div className="info-line"></div>
                <h3 className="heading-content">{t(`${this.props.title}.title`)}</h3>
                <p className="content-about">{t(`${this.props.title}.title`)}</p>
                <div className="info-line"></div>
              </div>
            </div>

            <div className="back">
              <div className="info-box info-content">
                <div className="info-line"></div>
                <div className="content-about">
                  {this.props.content.map((items, index) =>
                    <div key={index}>
                      <h5>{t(`${this.props.title}.${items.title}`)}</h5>
                      <ul>
                        {items.contents.map((cItems, cIndex)  =>
                          <li key={cIndex}>{t(`${this.props.title}.${cItems}`)}</li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="info-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class SplashPlatform extends PureComponent {
  render() {
    const {t} = this.props;
    
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
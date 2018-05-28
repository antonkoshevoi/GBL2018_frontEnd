import React, {Component} from 'react';
import spacer from '../../../media/images/svg/bl-spacer.svg';
import squareFlipper from '../../../media/images/svg/square-flipper.svg';
import books from '../../../media/images/svg/circle-books.svg';
import shcool from '../../../media/images/svg/circle-school.svg';
import parentChild from '../../../media/images/svg/circle-parent-child.svg';
import flipperMap from  './platformContentMap.json'
const style = {
  flipper: {
    background: `url(${squareFlipper}) center 40px no-repeat`,
    backgroundSize: '90%',
    minHeight:300,
    position:'relative',
    marginTop: 15,
  }
}
const flippers = [
  {icon: parentChild },
  {icon: shcool },
  {icon: books },
];

const FlipperCards = props => {
  const {t} = props;
  return (
    <div className="col-md-4 text-center" key={props.index} style={style.flipper}>
      <img src={flippers[props.index].icon} alt="" className="flipperIcon"/>
      <div className="flipper-title">
        <span>{t(`${props.title}.title`)}</span>
      </div>
      <div className="flipper-cards">
        <hr />
        {props.content.map((items, index) =>
          <div>
            <h5>{t(`${props.title}.${items.title}`)}</h5>
            <ul>
              {items.contents.map( cItems =>
                <li>{t(`${props.title}.${cItems}`)}</li>
              )}
            </ul>
          </div>

        )}
        <hr />
      </div>

    </div>
  )
}


class SplashPlatform extends Component {
  render() {
    const {t} = this.props;
    console.debug(t('studentsAndParents'))


    return (
      <div className="splash-platform">
        <header className="header-break container text-center">
          <h2>{t('learningPlatform')}</h2>
          <img src={spacer} alt="---=== ===---" width="200"/>
        </header>
        <div className="container">
          <div className="row">
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
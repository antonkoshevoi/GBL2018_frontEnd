import React, {Component} from 'react';
import Card from "../../../components/ui/Card";
import {GridList, GridListTile, GridListTileBar, Icon, IconButton} from '@material-ui/core';
import {translate} from 'react-i18next';

class HowToMovies extends Component {

    _renderVideos(videos) {
        return videos.map(function (item,i) {
            return (
                <GridListTile key={i} className="grid-tile">
                    <img alt="How To" src="https://i.vimeocdn.com/blog/1527_1200.jpeg"/>

                    <GridListTileBar
                        className="myGridTileBar"
                        title={`My Video ${i}`}
                        subtitle=""
                        actionIcon={
                            <IconButton>
                                <Icon>video</Icon>
                            </IconButton>
                        }
                    />

                </GridListTile>
            )
        })
    }

    render() {
        const { t } = this.props;
        return (
            <Card title={t('howToMovies')} icon="fa fa-film">
                <GridList cellHeight={250} cols={3}>
                    {this._renderVideos([1,2])}
                </GridList>
            </Card>
        );
    }
}

HowToMovies.propTypes = {};

export default translate('translations')(HowToMovies);

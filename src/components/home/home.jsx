import React           from 'react';
import { CategoryBox } from '../common';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let ms = 24 * 3600 * 1000;
    let { trending } = this.props;
    if(Date.now() - trending.date > ms || !trending.videos) {
      this.props.fetchTrending();
    }

    let channelIds = [
      'UC-9-kyTW8ZkZNDHQJ6FgpwQ',
      'UCEgdi0XIXXZ-qJOFPf4JSKw',
      'UCOpNcN46UbXVtpKMrmU4Abg',
      'UClgRkhTL3_hImCAmdLfDE4g',
      'UCYfdidRxbB8Qhf0Nx7ioOYw',
      'UCBR8-60-B28hp2BmDPdntcQ',
    ];

    for(let i = 0; i < channelIds.length; i++) {
      const id = channelIds[i];
      this.props.fetchChannelVideos(id);
    }
  }

  renderChannels() {
    let channels = this.props.channels;

    let ids = Object.keys(channels);
    if(ids[0]) {
      return ids.map( id => {
        let channel = channels[id];
        let title = channel.videos[0].snippet.channelTitle;
        return (
          <CategoryBox
            key={id}
            title={title}
            vids={channel.videos} />
        );
      });
    }
  }

  render() {
    const { videos } = this.props.trending;

    if(videos) {
       return (
         <div className='home-page'>
           <CategoryBox title='Trending' vids={videos}/>
           {this.renderChannels()}
         </div>
       );
    } else {
      return (
        <div className='home-page'></div>
      );
    }

  }
}

export default Home;

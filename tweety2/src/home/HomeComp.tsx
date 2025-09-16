import AddTweet from '@/tweets/addTweet/AddTweet'
import TweetList from '@/tweets/tweetList/TweetList'

const HomeComp = () => {
  return (
    <div className='home-container'>
      <AddTweet />
      <TweetList />
    </div>
  )
}

export default HomeComp

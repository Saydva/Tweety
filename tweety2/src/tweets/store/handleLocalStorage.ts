export const handleLocalStorage = () => {
  const loadTweetsFromLS = () => {
    const storedTweets = localStorage.getItem('tweets')
    if (storedTweets) {
    }
    return storedTweets ? JSON.parse(storedTweets) : []
  }

  const saveTweetsToLS = (tweets: string[]) => {
    localStorage.setItem('tweets', JSON.stringify(tweets))
  }

  const deleteTweetsFromLS = () => {
    localStorage.removeItem('tweets')
  }

  return { loadTweetsFromLS, saveTweetsToLS, deleteTweetsFromLS }
}

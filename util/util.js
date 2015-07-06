'use strict';

module.exports = {
  pushTweet: function(data, tweets, maxTweetsPerPerson){
    if (typeof tweets[data.user.id] !== 'undefined'){
      tweets[data.user.id].texts.push(data.text);
      if (tweets[data.user.id].texts.length > maxTweetsPerPerson){
        tweets[data.user.id].texts.shift();
      }
    }
    return tweets;
  }
};

'use strict';

module.exports = {
  pushTweet: function(data, tweets, maxTweetsPerPerson){
    if (typeof data.user === 'undefined'){ //初回接続時
      tweets = {};
      var userId;
      for (userId in data){
        tweets[userId] = {name:                    data[userId].name,
                          screen_name:             data[userId].screen_name,
                          profile_image_url_https: data[userId].profile_image_url_https,
                          texts:                   [data[userId].text]
                         };
      }
    }else if (typeof tweets[data.user.id] !== 'undefined'){
      tweets[data.user.id].texts.push(data.text);
      if (tweets[data.user.id].texts.length > maxTweetsPerPerson){
        tweets[data.user.id].texts.shift();
      }
    }
    return tweets;
  }
};

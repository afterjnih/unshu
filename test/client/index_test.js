'use strict';
var assert = require('power-assert');
var util = require('../../util/util');

describe('test for pushTweet(userId, text, data)', function(){
  it('test01', function(){
    // var data = testCase.tweetsData01;
    var tweets = {
      '783214': {name: "Twitter",
                 screen_name: "twitter",
                 profile_image_url_https: "https://pbs.twimg.com/profile_images/615680132565504000/EIpgSD2K.png",
                 texts: ["this is a sample text by usre01"]},
      '862314223': {name: "Twitter Music Japan",
                    screen_name: 'TwitterMusicJP',
                    profile_image_url_https: 'https://pbs.twimg.com/profile_images/426015746896842752/z0jg8lUb_normal.png',
                    texts: ["this is a sample text by usre02"]}
    };
    var data = {
                created_at: 'Sun Jul 05 11:33:20 +0000 2015',
                id: 999999999999999999,
                id_str: '999999999999999999',
                text: 'this is a second text by usre02',
                user:
                { id: 862314223,
                 id_str: '862314223',
                 name: 'Twitter Music Japan',
                 screen_name: 'TwitterMusicJP',
                 profile_image_url_https: 'https://pbs.twimg.com/profile_images/426015746896842752/z0jg8lUb_normal.png' }
    };
    var maxTweetsPerPerson = 10;
    assert.deepEqual(util.pushTweet(data, tweets, maxTweetsPerPerson), {
                                      '783214': {name: "Twitter",
                                                 screen_name: "twitter",
                                                 profile_image_url_https: "https://pbs.twimg.com/profile_images/615680132565504000/EIpgSD2K.png",
                                                 texts: ["this is a sample text by usre01"]},
                                      '862314223': {name: "Twitter Music Japan",
                                                    screen_name: "TwitterMusicJP",
                                                    profile_image_url_https: "https://pbs.twimg.com/profile_images/426015746896842752/z0jg8lUb_normal.png",
                                                    texts: ["this is a sample text by usre02", "this is a second text by usre03"]}
                                      }
                                    );
  });
});

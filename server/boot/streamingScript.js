const app = require('../server');
const Twitter = require('twit');
const bayes = require('bayes');
const classifier = bayes();
const fs = require('fs');
const readline = require('readline-sync');

const dataSource = app.dataSources.smhelper;

const TWITTER_CONSUMER_KEY = "7chwysuOP1LXKP9wnVffAPtSc";
const TWITTER_CONSUMER_SECRET = "slKWjVN64tYLJN4UZNd9rEhO6oEpXOvdQ7rigJckifsndLafUt";
const ACCESS_TOKEN = "168594561-H0LqefPjYGResfo6pfFU5SkMUcUE85mmGqPDUgqH";
const ACCESS_TOKEN_SECRET = "giEFOSvq18aEFZ7AaOFoAzQ8aeJICLrp3mb1u7HJnt1cN";

class TwitterStream {
  createTwitterClient() {
    return new Twitter({
      consumer_key: TWITTER_CONSUMER_KEY,
      consumer_secret: TWITTER_CONSUMER_SECRET,
      access_token: ACCESS_TOKEN,
      access_token_secret: ACCESS_TOKEN_SECRET,
    });
  }
  createTwitterStream(client) {
    return client.stream('statuses/filter', {
      track: 'akbank, ak bank, halkbank, alternatifbank, anadoulubank, anadoulu bank, denizbank, deniz bank, finansbank, finans bank, ziraat, garanti bank, halk bank, iş bank, vakıf bank',
      language: 'tr'
    });
  }
  startStreaming() {
    const client = this.createTwitterClient();
    const stream = this.createTwitterStream(client);
    stream.on("tweet", this.onStream);
  }

  onStream(tweet) {
    const a = tweet.text;
    const temp = a.substr(0, 2);
    const removeNormal = tweet.user.profile_image_url;
    const myNewString = removeNormal.replace("_normal", "");

    if (temp !== 'RT') {
      console.log(tweet.text);
      dataSource.autoupdate('tweetStorage', function (err) {
        app.models.tweetStorage.create({
          tweettext: tweet.text,
          createdAt: tweet.created_at,
          username: tweet.user.screen_name,
          screenname: tweet.user.name,
          profilePic: myNewString,
          userDescr: tweet.user.description,
        });
      });


    }
  }
  //classsify with naive bayes
  classifyTweet(tweet){

    const result = classifier.categorize(tweet.text);
    console.log('\n' + result + '\n');

    const userInput = readline.question("Olumlu: 1 \nOlumsuz: 2 \nGec: Enter\n");
    if(userInput === '1'){
        console.log('-------------------------------');
        classifier.learn(tweet.text, 'positive')
    }
    else if(userInput === '2'){
      console.log('-------------------------------');
      classifier.learn(tweet.text, 'negative')
    }
  }

}

const twitterStream = new TwitterStream();

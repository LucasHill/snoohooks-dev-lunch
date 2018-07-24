
import { SnooHook } from 'snoohooks';
import { Comment, Submission } from 'snoowrap';
import * as dotenv from 'dotenv';

dotenv.config();

const exampleHook: SnooHook = {
  redditClientConfig() {
    return {
      userAgent: 'hook-bot',
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    }
  },

  directives() {
    return [{
      subreddits: ['corgi'],
      interval: '*/5 * * * *',
      commentMatcher: [/corgo/i, /sploot/i],
      submissionMatcher: [/corgo/i, /sploot/i]
    }];
  },

  processComment(comment, matchers, client) {
    processReply(comment);
    console.log(`Processed comment ${comment.id} with body: ${comment.body}`);
  },

  processSubmission(submission, matchers, client) {    
    processReply(submission);
    console.log(`Processed submission ${submission.id} with title: ${submission.title}`); 
  },
};

export default exampleHook;

function processReply(redditObj: Comment | Submission) {
  redditObj.reply('http://i.imgur.com/V43tnAC.png');
};
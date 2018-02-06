module.exports = function(controller) {
  var choiceCount = 0;
  var stealCount = 0;
  var blockCount = 0;
  var shareCount = 0;
  var successCount = 0;
  
  controller.on('interactive_message_callback', function(bot, message) {
      if(message.actions[0].value.match("share")){
        bot.startConversation(message, function(err, convo) {
          choiceCount++;
          shareCount++;
          convo.say("YOU SHARE! " + choiceCount);
          convo.next();
        });
      }
      else if(message.actions[0].value.match("steal")){
        bot.startConversation(message, function(err, convo) {
          choiceCount++;
          stealCount++;
          convo.say("YOU STOLE! " + choiceCount);
          convo.next();
        });
        
      }
      else if(message.actions[0].value.match("block")){
        bot.startConversation(message, function(err, convo) {
          choiceCount++;
          blockCount++;
          convo.say("YOU BLOCK! " + choiceCount);
          convo.next();
        });
        
      }
    
    if(choiceCount >= 4) {
      if(blockCount > 0 && stealCount > 0) {
        bot.startConversation(message, function(err, convo) {
          convo.say("All Stealing Players are banned.");
          successCount = 0;
        });
      }
      if(blockCount > 0 && stealCount <= 0) {
        bot.startConversation(message, function(err, convo) {
          convo.say("All Blocking Players are banned.");
          successCount = 0;
        });
      }
      if(stealCount == 4) {
        bot.startConversation(message, function(err, convo) {
          convo.say("All Stealing Players are banned.");
          successCount = 0;
          convo.next();
          convo.say({
        ephemeral: true,
        channel: 'C7V493SA3',
        icon_url: "http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/taurus.png",
				attachments:[
					{
						title: 'You win!',
            text: "You will now have the change to play another round of this challenge. You can choose the same option as before, or a different option. Here are your options:\n\n" +
                "Share. If all players share, each player who has not been eliminated can receive an equal share of the prize.\n" +
                "Steal. If you steal and at least one team member votes to share, all players who chose to steal split the prize. If only you steal, you get to keep all $100. However if everyone steals, all players are eliminated and no prize is awarded.\n" +
                "Block. Choose this option to defend against stealing. If you choose Block, all players who steal will be booted from this channel and receive no prize. Then all players will get to select another option. However, if no players steal, you will be eliminated.\n" +
                "You will repeat this until either all players select share three times in a row, any player steals without being blocked, or all players are eliminated.\n\n" +
                "Choose within the next hour",
						callback_id: 'pd',
						attachment_type: 'default',
						actions: [
							{
								"name":"share",
								"text": "Share",
								"value": "share",
								"type": "button",
							},
							{
								"name":"steal",
								"text": "Steal",
								"value": "steal",
								"type": "button",
							},
							{
								"name":"block",
								"text": "Block",
								"value": "block",
								"type": "button",
							}
						]
					}
				]
			},
        [
				{
					pattern: "steal",
					callback: function(reply, convo) {
						convo.say('YOU STOLE!');
						convo.next();
						// do something awesome here.
					}
				},
				{
					pattern: "share",
					callback: function(reply, convo) {
						convo.say('YOU SHARE!');
						convo.next();
					}
				},
        {
					pattern: "block",
					callback: function(reply, convo) {
						convo.say('YOU BLOCK!');
						convo.next();
					}
				},
				{
					default: true,
					callback: function(reply, convo) {
						// do nothing
					}
				}
			]);
          /*setTimeout(function () {
            bot.say({
              username: "Daedalus",
              channel: "C7V493SA3",
              text: "Sorry, but you were eliminated from the game. You won't get any prize money."
            });
          }, choiceTimer);*/
        });
      }
      if(stealCount < 4 && stealCount > 0 && shareCount > 0 && blockCount == 0) {
        bot.startConversation(message, function(err, convo) {
          convo.say("All Sharing Players are banned.");
          successCount = 0;
        });
      }
      if(shareCount == 4) {
        if(successCount == 0) {
          bot.startConversation(message, function(err, convo) {
            convo.say("Group Shares: 1/3\n\nYou all agreed to share the prize. To confirm, select “Share” again. You must all share three times in a row to split the prize evenly. You may also change your selection now.");
            successCount++;          
          });
        }
        else if(successCount == 1) {
          bot.startConversation(message, function(err, convo) {
            convo.say("Group Shares: 2/3\n\nYou all agreed to share the prize. To confirm, select “Share” again. You must all share three times in a row to split the prize evenly. You may also change your selection now.");
            successCount++;  
          });
        }
        else if(successCount == 2) {
          bot.startConversation(message, function(err, convo) {
            convo.say("Group Shares: 3/3\n\nYou all agreed to share the prize. Congratulations! You've will all receive an equal share of the cash prize!");
            successCount = 0;
          });
        }
      }
      choiceCount = 0;
      stealCount = 0;
      shareCount = 0;
      blockCount = 0;
    }
  });

}

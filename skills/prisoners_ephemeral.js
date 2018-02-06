var choiceTimer = 10000;
module.exports = function(controller) {
  
  
  controller.hears(['test'], ["direct_message","direct_mention","mention","ambient"], function (bot, message){
        bot.startConversation(message, function(err, convo) {
            convo.say({
        ephemeral: true,
        channel: 'C7V493SA3',
        icon_url: "http://d2trtkcohkrm90.cloudfront.net/images/emoji/apple/ios-10/256/taurus.png",
				attachments:[
					{
						title: 'You win!',
            text: "You have won, but before your team receives the $100 you have one final choice to make. You can either choose to split the $100 amongst your team or you can keep the $100 yourself and not share it with your teammates. You must make your choice within the next hour, or else you will be removed from this channel and receive no money.\n\n" + 
                "Each member of your team is getting this message and you all will be faced with the same choice. Here are your options:\n\n" +
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
			},[
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
          });
        setTimeout(function () {
          bot.startConversation(message, function(err, convo){
            convo.say({
              username: "Daedalus",
              channel: "C7V493SA3",
              ephemeral: true,
              text: "Sorry, but you were eliminated from the game. You won't get any prize money."
            });
        }, choiceTimer);});
    });
}
/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	DISCORD_STREAM_KEY
	DISCORD_STREAM_SECRET

	TXTEND_STREAM_KEY
	TXTEND_STREAM_SECRET
Amplify Params - DO NOT EDIT */

const StreamChat = require("stream-chat").StreamChat;

const { DISCORD_STREAM_KEY, DISCORD_STREAM_SECRET } = process.env;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  if (!event?.identity?.sub) {
    return "";
  }

  const client = StreamChat.getInstance(DISCORD_STREAM_KEY,  DISCORD_STREAM_SECRET);

  const token = client.createToken(event.identity.sub);

  return token;
};
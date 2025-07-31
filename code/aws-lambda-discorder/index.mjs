export const handler = async (event, context) => {
	try {
		const body = JSON.parse(event.body);  // Required because coming from API Gateway

		// Get information
		const username = body.sender.login;
		const avatarUrl = body.sender.avatar_url;
		const repoName = body.repository.name;
		const action = body.action;  // 'created' or 'deleted'

		// Create response
		const content =
			action === "created"
				? `:taco: :taco: :taco: ${username} just starred ${repoName}! :star: :rocket: :muscle: :person: :tada: :taco:`
				: `:wave: ${username} unstarred ${repoName} :broken_heart:`;

		const res = await fetch(process.env.DISCORD_WEBHOOK_URL, {  // Get DISCORD_WEBHOOK_URL from AWS Lambda configuration's environment variables
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				content: content,
				embeds: [
					{
						image: {
							url: avatarUrl,
						},
					},
				],
			}),
		});
		console.log("Submitted!");
		return {
			statusCode: 204,
		};
	} catch (err) {
		console.error("Error:", err);
		return {
			statusCode: 500,
			body: JSON.stringify({
				error: err.message || err.toString(),
				event: event,
			}),
		};
	}
};

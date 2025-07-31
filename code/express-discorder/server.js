require("dotenv").config();
const express = require("express");
const axios = require("axios").default;

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) =>
	res.send(`
  <html>
    <head><title>Success!</title></head>
    <body>
      <h1>You did it!</h1>
      <img src="https://media.giphy.com/media/XreQmk7ETCak0/giphy.gif" alt="Cool kid doing thumbs up" />
    </body>
  </html>
`)
);

app.post("/github", (req, res) => {
    // TODO: Chang ethe content variable to contain the repository name and
    // the github user name...and emoji stuff.
	let content = ":wave: Hi mom!";  // Text of the response

	const avatarUrl = req.body.sender.avatar_url;
    const userName = req.body.sender.login;
    const repoName = req.body.repository.full_name;
    const starred = req.body.action === "created"
    const numRepoStars = req.body.repository.stargazers_count;

    content += "\n" + `:person: ${userName} ${starred ? "starred" : "unstarred"} my repo ${repoName}.`
    content += "\n" + `${repoName} now has ${numRepoStars} stars :star:!`

	axios
		.post(process.env.DISCORD_WEBHOOK_URL, {
			content: content,
			embeds: [
				{
					image: {
						url: avatarUrl,
					},
				},
			],
		})
		.then((discordResponse) => {
			console.log("Success!");
			res.status(204).send();
		})
		.catch((err) => console.error(`Error sending to Discord: ${err}`));
});

app.use((error, req, res, next) => {
	res.status(500);
	res.send({ error: error });
	console.error(error.stack);
	next(error);
});

app.listen(port, () =>
	console.log(`Example app listening at http://localhost:${port}`)
);

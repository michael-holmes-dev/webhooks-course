[Tutorial](https://www.youtube.com/watch?v=41NOoEz3Tzc)
## v1: No code - Integration between [Github](https://github.com/michael-holmes-dev/webhooks-course) and [Discord](https://discord.gg/7rkFv8x4)
- Simple
- No customisation, can only do predefined calls based on the platform

## v2: Minimal Code: Self-hosted server
- More 
- More customisation
Steps:
- Navigate to express-discorder directory
```bash
cd webhooks-course/code/express-discorder/
```
- Start the server
```bash
npm start
```
- Forward port 3000 and set the Visibility to Public (in the Ports tab of the terminal)
- Copy the Forwarded Address and copy into correct webhook [here](https://github.com/michael-holmes-dev/webhooks-course/settings/hooks), and add "/github" at the end
- Toggle the star in the repo, should get a notification with Space Guy (Neil DeGrasse Tyson) in Discord



## v3: Serverless
<img src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Lambda_architecture_logo.svg" alt="Alt text" width="100" height="100">

- Basically the same thing as v2, but we're using serverless tools instead of running it locally. Should be free for around 1,000,000 requests per month, so basically always free. 
- Tooling: AWS Lambda
- How it works: We essentially upload a function, it gives us a URL to call that function, put that URL into our webhook caller on [github](https://github.com/michael-holmes-dev/webhooks-course/settings/hooks), then let it do its thing
- Why it's better than v2: It's free, we don't have to host it from our computer (more secure and free), and the URL doesn't change and there's no downtime. It can also scale automatically


- WHAT I DID: Updated netlify-discorder/discorder.js to work for AWS Lambda instead of Netlify
    - [AWS Lambda function](https://us-east-2.console.aws.amazon.com/lambda/home?region=us-east-2#/functions/lambda-discorder?subtab=envVars&tab=code)
    - Changes:
        - Environment variable: Set in the 'Configuration' tab for the AWS Lambda function
        - JSON parsed the event (required when using API Gateway with Lambda, which I used API Gateway to set an endpoint for the Lambda function)



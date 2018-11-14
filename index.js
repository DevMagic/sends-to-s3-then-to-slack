#!/usr/bin/env node

const S3 = require('aws-sdk/clients/s3'),
	{ WebClient } = require('@slack/client'),
	fs = require('fs');

async function start() {
	
	try{
		let fileName = await uploadFileToS3();	
		await sendMessageToSlack(`https://s3.amazonaws.com/${process.env.BUCKET_NAME}/${fileName}`);	
		console.log("file uploaded and link sent to slack");
	}
	catch(e){
		console.log(e);
	}
	
}

async function uploadFileToS3() {

	let fileName = `${process.env.BITBUCKET_REPO_SLUG}-${process.env.BITBUCKET_BRANCH}-${process.env.BITBUCKET_BUILD_NUMBER}.apk`;
		s3 = new S3({
			accessKeyId : process.env.AWS_ACCESS_KEY,
			secretAccessKey : process.env.AWS_SECRET_KEY
		});

	await s3.putObject({
		ACL : 'public-read',
		Body : fs.createReadStream(process.env.FILE_PATH),
		Bucket : process.env.BUCKET_NAME,
		Key : fileName
	}).promise();
	return fileName;
}

async function sendMessageToSlack(fileUrl) {
	const web = new WebClient(process.env.SLACK_TOKEN);
	process.env.SLACK_CHANNEL && Promise.all(process.env.SLACK_CHANNEL.split(',').map(async (channel) => {
		await web.chat.postMessage({ channel: channel.trim(), text: `
			:iphone: ${process.env.BITBUCKET_REPO_SLUG}-${process.env.BITBUCKET_BRANCH}-${process.env.BITBUCKET_BUILD_NUMBER} APK: ${fileUrl}
		`, as_user : true });	
	}));
}



start();
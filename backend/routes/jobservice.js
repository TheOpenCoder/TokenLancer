const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { v4: uuid } = require('uuid');

const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
	projectId: 'tokenlancer',
	keyFilename:
		'/home/nvnn/Desktop/Hedera Hack/Code/Backend/TokenLancer-528ac477da12.json'
});

router.get('/', async (req, res) => {
	// Returns all the jobs in the global market level
	const jobResult = [];
	const snapshot = await db.collection('jobs').get();
	if (snapshot.empty) return res.status(200).send('No jobs found');

	snapshot.forEach(doc => {
		jobResult.push(doc.data());
	});

	return res.status(200).json(jobResult);
});

router.post('/hirer', async (req, res) => {
	// Post a particular jobs from the hirers acccount
	// hirer, title, description, skills
	const jobDetails = req.body;

	const functionResult = correctJobDetails(jobDetails);
	if (functionResult.error)
		return res.status(200).send(functionResult.error.details[0].message);
	const jobId = uuid();

	await db
		.collection('jobs')
		.doc(jobId)
		.set({
			...jobDetails,
			jobId: jobId
		});

	await db
		.collection('accounts')
		.doc(jobDetails.hirer)
		.collection('hirer-jobs')
		.doc(jobId)
		.set({
			...jobDetails,
			jobId: jobId
		});

	return res.status(201).send('Job Created');
});

router.post('/tokenlancer', async (req, res) => {
	// tokenlancer, jobid, description,
});

function correctJobDetails(jobDetails) {
	const schema = Joi.object({
		hirer: Joi.string().required(),
		title: Joi.string().required(),
		description: Joi.string().required(),
		skills: Joi.string().required()
	});

	return schema.validate(jobDetails);
}

module.exports = router;

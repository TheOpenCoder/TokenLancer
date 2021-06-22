const express = require('express');
const router = express.Router();

const Joi = require('joi');

// Firestore
const Firestore = require('@google-cloud/firestore');
const db = new Firestore({
	projectId: 'tokenlancer',
	keyFilename:
		'/home/nvnn/Desktop/Hedera Hack/Code/Backend/TokenLancer-528ac477da12.json'
});

// Hedera
const {
	Client,
	PrivateKey,
	AccountCreateTransaction,
	Hbar,
	AccountInfoQuery,
	TokenCreateTransaction,
	AccountId
} = require('@hashgraph/sdk');
require('dotenv').config();

// GENERAL ACCOUNT DETAILS

// router.get('/test', async (req, res) => {
// 	await createHederaAccount();
// });

router.post('/', async (req, res) => {
	// Post all the details of the newly created account -> Name, Username, DOB, Location, HBar Wallet
	const userDetails = req.body;
	// Validate the data
	if (await usernameIsPresent(userDetails.username))
		return res.status(400).send('Username already taken');

	const functionResult = correctUserDetails(userDetails);
	if (functionResult.error)
		return res.status(400).send(functionResult.error.details[0].message);

	const hederaAccountDetails = await createHederaAccount(userDetails.username);

	const createdAccount = {
		name: userDetails.name, // String
		username: userDetails.username, // String
		...hederaAccountDetails
	};

	// Send data to the firestore
	const docRef = db.collection('accounts').doc(userDetails.username);
	await docRef.set(createdAccount);

	return res.status(201).send('Posted Successfully');
});

router.get('/:id/profile-details', async (req, res) => {
	// Send back the details of the particular account
	const snapshot = await db.collection('accounts').get();
	let accountResult;
	let found = false;
	snapshot.forEach(doc => {
		if (doc.id == req.params.id) {
			accountResult = doc.data();
			found = true;
		}
	});
	if (found) return res.status(200).json(accountResult);
	else return res.status(404).send('User Account Not found');
});

router.put(':id/profile-details', async (req, res) => {
	// Update the details of the user account
	if (await !usernameIsPresent(req.params.id))
		return res.status(404).send('Username is Not Found');
	await db.collection('accounts').doc(req.params.id).update({
		name: req.body.name,
		username: req.body.username
	});

	return res.status(200).send('Profile Details Modified');
});

// TOKENLANCER

router.get('/:id/tokenlancer/my-jobs', (req, res) => {
	// Returns all the jobs the user has applied and selected for
});

// HIRER

router.get('/:id/hirer/my-jobs', async (req, res) => {
	// Returns all the jobs the user has posted and recruited for
	if (!usernameIsPresent(req.params.id))
		return res.status(404).send('Username not found');

	const jobResult = [];

	const snapshot = await db
		.collection('accounts')
		.doc(req.params.id)
		.collection('jobs')
		.get();

	if (snapshot.empty) res.status(200).send('No data');

	snapshot.forEach(doc => {
		jobResult.push(doc.data());
	});

	return res.status(200).json(jobResult);
});

// SUPPLEMENTARY FUNCTIONS

async function usernameIsPresent(username) {
	let result = false;
	await db
		.collection('accounts')
		.doc(username)
		.get()
		.then(snapshot => {
			if (snapshot.exists) result = true;
		});
	return result;
}

function correctUserDetails(userDetails) {
	// Use JOI to validate the data and send back true or false
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
		username: Joi.string().min(3).required()
	});

	return schema.validate(userDetails);
}

async function createHederaAccount(username) {
	const myAccountId = process.env.MY_ACCOUNT_ID;
	const myPrivateKey = process.env.MY_PRIVATE_KEY;

	// If we weren't able to grab it, we should throw a new error
	if (myAccountId == null || myPrivateKey == null) {
		throw new Error(
			'Environment variables myAccountId and myPrivateKey must be present'
		);
	}

	const client = Client.forTestnet();

	client.setOperator(myAccountId, myPrivateKey);

	//Create new keys
	const newAccountPrivateKey = await PrivateKey.generate();
	const newAccountPublicKey = newAccountPrivateKey.publicKey;

	//Create a new account with 1,000 tinybar starting balance
	const newAccountTransactionResponse = await new AccountCreateTransaction()
		.setKey(newAccountPublicKey)
		.setInitialBalance(Hbar.fromTinybars(1000))
		.execute(client);

	// Get the new account ID
	const getReceipt = await newAccountTransactionResponse.getReceipt(client);
	const newAccountId = getReceipt.accountId;

	const query = new AccountInfoQuery().setAccountId(newAccountId);

	//Sign with client operator private key and submit the query to a Hedera network
	const accountInfo = await query.execute(client);

	const createTokenTx = await new TokenCreateTransaction()
		.setTokenName(username)
		.setTokenSymbol(username)
		.setDecimals(0)
		.setInitialSupply(50)
		.setTreasuryAccountId(myAccountId)
		.execute(client);

	const tokenReciept = await createTokenTx.getReceipt(client);

	const result = {
		hederaAccountId: newAccountId.toString(),
		hederaKey: accountInfo.key.toString(),
		tokenId: tokenReciept.tokenId.toString()
	};

	console.log(result);

	return result;
}

module.exports = router;

const StellarSdk = require('stellar-sdk');
//const fetch = require('node-fetch');

const createTestnetWallet = async () => {
  const pair = StellarSdk.Keypair.random();
  console.log(`Secret: ${pair.secret()}`);
  console.log(`Public: ${pair.publicKey()}`);

  try {
    const response = await fetch(`https://friendbot.stellar.org?addr=${pair.publicKey()}`);
    const responseJSON = await response.json();
    console.log('SUCCESS! You have a new testnet account:', responseJSON);
  } catch (error) {
    console.error('ERROR!', error);
  }
};

createTestnetWallet();

const StellarSdk = require('stellar-sdk');
const server = new StellarSdk.Horizon.Server('https://horizon-testnet.stellar.org');

// Function to create and issue a token
const issueToken = async (issuerSecret, receiverPublic, amount) => {
  const issuerKeypair = StellarSdk.Keypair.fromSecret(issuerSecret);
  const asset = new StellarSdk.Asset('MyToken', issuerKeypair.publicKey());

  try {
    const account = await server.loadAccount(issuerKeypair.publicKey());
    const transaction = new StellarSdk.TransactionBuilder(account, { fee: StellarSdk.BASE_FEE })
      .addOperation(StellarSdk.Operation.payment({
        destination: receiverPublic,
        asset: asset,
        amount: amount
      }))
      .setTimeout(30)
      .build();
    transaction.sign(issuerKeypair);
    await server.submitTransaction(transaction);
    console.log('Token issued successfully');
  } catch (error) {
    console.error('Error issuing token:', error);
  }
};

module.exports = { issueToken };

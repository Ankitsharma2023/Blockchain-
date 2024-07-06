const StellarSdk = require('stellar-sdk');
let server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org");

const sendPayment = async () => {
  const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecret);

  try {
    const account = await server.loadAccount(sourceKeypair.publicKey());
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE, 
      networkPassphrase: StellarSdk.Networks.TESTNET // Ensure this is a string
     })
      .addOperation(StellarSdk.Operation.payment({
        destination: destinationPublic,
        asset: StellarSdk.Asset.native(),
        amount: amount
      }))
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeypair);
    const transactionResult = await server.submitTransaction(transaction);
    console.log('Payment sent successfully', transactionResult);
  } catch (error) {
    console.error('Error sending payment:', error);
  }
};

// Replace with actual values
const sourceSecret = 'SD5TGAQRJI4DFZ55BO5GRXDIAMHV6E3B35DG4OXLUDZZICE64GUARI3J'; // Replace with actual source secret
const destinationPublic = 'GDDKYPP3TAXKXQPVG7MURD24UIEAK2BNOUXBWBIIEDC4YU4S2BQ273CC'; // Replace with actual destination public key
const amount = '100';

sendPayment();

const StellarSdk = require('stellar-sdk');
//StellarSdk.Network.useTestNetwork();
const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');

const sendPayment = async (sourceSecret, destinationPublic, amount) => {
  const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecret);

  try {
    const account = await server.loadAccount(sourceKeypair.publicKey());
    const transaction = new StellarSdk.TransactionBuilder(account, {
      fee: StellarSdk.BASE_FEE,
      networkPassphrase: StellarSdk.Networks.TESTNET
    })
      .addOperation(StellarSdk.Operation.payment({
        destination: destinationPublic,
        asset: StellarSdk.Asset.native(),
        amount: amount
      }))
      .setTimeout(30)
      .build();
    transaction.sign(sourceKeypair);
    await server.submitTransaction(transaction);
    console.log('Payment sent successfully');
  } catch (error) {
    console.error('Error sending payment:', error);
  }
};

// Replace with actual values
const sourceSecret = 'SDMEDNIXUQRVVDM2NUVP3SEQK66JDDPTHN2GUSNC2EZ37QRTE2JIJNAI'; // Replace with actual source secret
const destinationPublic = 'GAKWLP75QW3EZMTLRTMWFKVZCCRSVGGGEYGPSI355ESEALLQKM4N4VLR'; // Replace with actual destination public key
const amount = '10';

sendPayment(sourceSecret, destinationPublic, amount);

src="https://cdnjs.cloudflare.com/ajax/libs/stellar-sdk/8.2.0/stellar-sdk.min.js"
tellarSdk.Keypair.random();
    console.log(`Secret: ${pair.secret()}`);
    console.log(`Public: ${pair.publicKey()}`);

    try {
      const response = await fetch(`https://friendbot.stellar.org?addr=${pair.publicKey()}`);
      const responseJSON = await response.json();
      console.log('SUCCESS! You have a new testnet account:', responseJSON);
    } catch (error) {
      console.error('ERROR!', error);
    }
  

  async function sendPayment(sourceSecret, destinationPublic, amount) {
    const sourceKeypair = StellarSdk.Keypair.fromSecret(sourceSecret);

    try {
      const account = await server.loadAccount(sourceKeypair.publicKey());
      const transaction = new StellarSdk.TransactionBuilder(account, { fee: StellarSdk.BASE_FEE })
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
  }


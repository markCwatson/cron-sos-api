const SosService = require('../src/Services/SosService');

const execute = async () => {
  try {
    console.log(`Running sos-auth script...`);

    if (!process.argv[2]) {
      console.log('Expecting SOS code as a CLI argument.');
      console.log('Example: \'npm run sos:auth -- <your sos code>\'');
      return;
    }

    const result = await SosService.convertCode(process.argv[2]);
    console.log(`SOS tokens${result ? ' ' : ' not '}created`);
  } catch (err) {
    console.error(err);
  } finally {
    console.log(`sos-auth script finished.`);
  }
}

execute();

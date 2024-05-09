import { Keypair } from "@solana/web3.js";

//Generate a new keypair
let kp = Keypair.generate();
console.log(`You've generated a new Solana wallet: ${kp.publicKey.toBase58()}`);

//DemriXaFrY2X1Vn7UQWRXXtXdF3qPLpDb2BFP8QFGFY7

import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, Address } from "@coral-xyz/anchor";
import { IDL, WbaPrereq } from "./programs/wba_prereq";
import wallet from "./wallet.json";

// We're going to import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

// Create a devnet connection
const connection = new Connection("https://api.devnet.solana.com");

// Github account
const github = Buffer.from("NkamaWilliams", "utf8");

// Create our anchor provider
const provider = new AnchorProvider(connection, new Wallet(keypair), {
  commitment: "confirmed",
});

// Create our program
const program = new Program<WbaPrereq>(IDL, provider);
// Create the PDA for our enrollment account
const enrollment_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];
const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  enrollment_seeds,
  program.programId
);

// Execute our enrollment transaction
(async () => {
  try {
    const txhash = await program.methods
      .complete(github)
      .accounts({
        signer: keypair.publicKey,
      })
      .signers([keypair])
      .rpc();
    console.log(`Success! Check out your TX here:
    https://explorer.solana.com/tx/${txhash}?cluster=devnet`);
  } catch (e) {
    console.error(`Oops, something went wrong: ${e}`);
  }
})();

// https://explorer.solana.com/tx/r3ay1x31yVFUg8fSRGK5NYNru24PtPNskFCV7hGmFunp29862tf2AGK6dhKvBZT6hM77FT4rnsrjusfuSzR2kid?cluster=devnet

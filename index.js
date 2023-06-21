require("dotenv").config();
const fs = require("fs");
const { program } = require("commander");
const { BIP32Factory } = require("bip32");
const ecc = require("tiny-secp256k1");
const bip32 = BIP32Factory(ecc);
const bitcoin = require("bitcoinjs-lib");
const bip39 = require("bip39");

const axios = require("axios");
const path = `m/44'/1'/0'/0`;
// File path to store wallets
const WALLET_FILE_PATH = "./wallets.json";

// Load existing wallets from file or initialize an empty array
let wallets = [];
if (fs.existsSync(WALLET_FILE_PATH)) {
  const data = fs.readFileSync(WALLET_FILE_PATH, "utf8");
  wallets = JSON.parse(data);
}

// Create a new wallet (BIP39 Wallet)
function createWallet(name) {
  try {
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const network = bitcoin.networks.testnet;
    const root = bip32.fromSeed(seed, network);
    const account = root.derivePath(path);
    const node = account.derive(0);
    const { address } = bitcoin.payments.p2pkh({
      pubkey: node.publicKey,
      network,
    });

    const wallet = {
      name: name,
      mnemonic: mnemonic,
      address: address,
    };
    wallets.push(wallet);
    saveWalletsToFile();
    console.log("Wallet created successfully.");
    console.log("Name:", name);
    console.log("Mnemonic:", mnemonic);
    console.log("Address:", address);
  } catch (error) {
    console.log("Error creating wallet:", error.message);
  }
}

// Import a wallet (from BIP39 Mnemonic)
function importWallet(name, mnemonic) {
  const wallet = findWalletByName(name);
  if (!wallet) {
    console.log("Wallet not found.");
    return;
  }
  try {
    if (!bip39.validateMnemonic(mnemonic)) {
      console.log("Invalid mnemonic.");
      return;
    }

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const network = bitcoin.networks.testnet;
    const root = bip32.fromSeed(seed, network);
    const account = root.derivePath(path);
    const node = account.derive(0);
    const { address } = bitcoin.payments.p2pkh({
      pubkey: node.publicKey,
      network,
    });

    const wallet = {
      name: name,
      mnemonic: mnemonic,
      address: address,
    };
    // wallets.push(wallet);
    // saveWalletsToFile();
    console.log("Wallet imported successfully.");
    console.log("Name:", name);
    console.log("Mnemonic:", mnemonic);
    console.log("Address:", address);
  } catch (error) {
    console.log("Error importing wallet:", error.message);
  }
}

// List all wallets
function listWallets() {
  if (wallets.length === 0) {
    console.log("No wallets found.");
    return;
  }

  console.log("Wallets:");
  wallets.forEach((wallet) => {
    console.log("Name:", wallet.name);
    console.log("Mnemonic:", wallet.mnemonic);
    console.log("Address:", wallet.address);
    console.log("------------------------------");
  });
}

// Get bitcoin balance of a wallet
async function getBalance(name) {
  const wallet = findWalletByName(name);
  if (!wallet) {
    console.log("Wallet not found.");
    return;
  }

  try {
    const response = await axios.get(
      `https://api.blockcypher.com/v1/btc/test3/addrs/${wallet.address}/balance?token=${process.env.API_KEY}`
    );
    const data = response.data;
    console.log("Address:", wallet.address);
    console.log("Balance:", data.balance / 100000000, "BTC");
    console.log("------------------------------");
  } catch (error) {
    console.log("Error:", error.response?.data?.error || error.message);
  }
}

// Get list of bitcoin transactions of a wallet
async function getTransactions(name) {
  const wallet = findWalletByName(name);
  if (!wallet) {
    console.log("Wallet not found.");
    return;
  }

  try {
    const response = await axios.get(
      `https://api.blockcypher.com/v1/btc/test3/addrs/${wallet.address}/full?token=${process.env.API_KEY}`
    );
    const data = response.data;
    console.log("Address:", wallet.address);
    if (data.txs.length === 0) {
      console.log("No transactions.");
      return;
    }
    console.log("Transactions:");
    data.txs.forEach((transaction) => {
      console.log("Transaction ID:", transaction.hash);
      console.log("Amount:", transaction.total / 100000000, "BTC");
      console.log("------------------------------");
    });
  } catch (error) {
    console.log("Error:", error.response?.data?.error || error.message);
  }
}

// Generate an unused bitcoin address for a wallet
async function generateAddress(name) {
  const wallet = findWalletByName(name);
  if (!wallet) {
    console.log("Wallet not found.");
    return;
  }

  try {
    const node = await getNextUnusedAddress(wallet);
    if (!node || !node.publicKey) {
      console.log("Invalid node or public key.");
      return;
    }

    const network = bitcoin.networks.testnet;
    const { address } = bitcoin.payments.p2pkh({
      pubkey: node.publicKey,
      network,
    });

    wallet.address = address;
    saveWalletsToFile();
    console.log("New address generated successfully.");
    console.log("Address:", address);
  } catch (error) {
    console.log("Error generating address:", error.message);
  }
}

// Find a wallet by name
function findWalletByName(name) {
  return wallets.find((wallet) => wallet.name === name);
}

// Save wallets to file
function saveWalletsToFile() {
  fs.writeFileSync(WALLET_FILE_PATH, JSON.stringify(wallets, null, 2));
}

// Get next unused bitcoin address for a wallet
async function getNextUnusedAddress(wallet) {
  const mnemonic = wallet.mnemonic;
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const network = bitcoin.networks.testnet;
  const root = bip32.fromSeed(seed, network);
  const account = root.derivePath("m/44'/1'/0'");
  let index = 0;
  const maxIterations = 1000; // Set a maximum number of iterations

  while (index < maxIterations) {
    const node = account.derive(index);
    try {
      const { address } = bitcoin.payments.p2pkh({
        pubkey: node.publicKey,
        network,
      });

      if (!(await hasTransactions(address))) {
        return node;
      }
    } catch (error) {
      console.log("Error generating P2PKH address:", error);
      throw error;
    }
    index++;
  }

  throw new Error("No unused address found after maximum iterations.");
}

// Check if an address has any transactions
async function hasTransactions(address) {
  try {
    const response = await axios.get(
      `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full?token=${process.env.API_KEY}`
    );
    const data = response.data;
    return data.n_tx > 0;
  } catch (error) {
    console.log("Error:", error.response?.data?.error || error.message);
    return false;
  }
}
// Define command-line options
program.version("1.0.0").description("Bitcoin Wallet Manager");

program
  .command("create <name>")
  .description("Create a new wallet")
  .action(createWallet);

program
  .command("import <name> <mnemonic>")
  .description("Import a wallet from BIP39 mnemonic")
  .action(importWallet);

program.command("list").description("List all wallets").action(listWallets);

program
  .command("balance <name>")
  .description("Get bitcoin balance of a wallet")
  .action(getBalance);

program
  .command("transactions <name>")
  .description("Get bitcoin transactions of a wallet")
  .action(getTransactions);

program
  .command("address <name>")
  .description("Generate an unused bitcoin address for a wallet")
  .action(generateAddress);

program.parse(process.argv);

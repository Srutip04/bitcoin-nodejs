# Bitcoin Wallet Manager Using Nodejs

Bitcoin Wallet Manager is a command-line tool for managing Bitcoin wallets. It provides functionality to create new wallets, import wallets from BIP39 mnemonics, list existing wallets, check wallet balances, retrieve wallet transactions, and generate unused Bitcoin addresses.

## Prerequisites

Before running the Bitcoin Wallet Manager, ensure you have the following installed on your system:

- Node.js (version 14 or above)
- npm (Node Package Manager)

## Installation

1. Clone this repository or download the source code to your local machine.
   ```bash
   git clone git@github.com:Srutip04/bitcoin-nodejs.git

   ```

2. Open a terminal or command prompt and navigate to the project directory.
   ```bash
   cd bitcoin-nodejs
   ```

3. Install the required dependencies by running the following command:
   ```bash
   npm install
   ```



## Usage

To use the Bitcoin Wallet Manager, follow the steps below:

1. Open a terminal or command prompt and navigate to the project directory.

2. Run the program by executing the following command:
node index.js `<command>` [options]


Replace `<command>` with one of the available commands and provide the required options.

Available commands:

- `create <name>`: Create a new wallet.
- `import <name> <mnemonic>`: Import a wallet from BIP39 mnemonic.
- `list`: List all wallets.
- `balance <name>`: Get the Bitcoin balance of a wallet.
- `transactions <name>`: Get the Bitcoin transactions of a wallet.
- `address <name>`: Generate an unused Bitcoin address for a wallet.

Note: Replace `<name>` with the name of the wallet you want to create, import, or perform actions on.

### Example
- For creating a new wallet run:
  ```bash
     node index.js create <name>
  ```

3. Follow the instructions provided by the program to create, import, or manage your Bitcoin wallets.

## API Key

The Bitcoin Wallet Manager requires an API key from BlockCypher to retrieve wallet balances and transactions. To obtain an API key, follow these steps:

1. Go to the BlockCypher website: [https://www.blockcypher.com/](https://www.blockcypher.com/).

2. Sign up for an account or log in if you already have one.

3. Navigate to the dashboard and find your API key.

4. Create a file named `.env` in the project directory.

5. Add the following line to the `.env` file, replacing `YOUR_API_KEY` with your actual API key:
API_KEY=YOUR_API_KEY






# Creating a wallet (BIP39)

### Sample Input 1
```bash
node index.js create wallet1
```
### Sample Ouput 1
```bash
Wallet created successfully.
Name: wallet1
Mnemonic: drive parrot execute gallery wheel exotic vibrant pill giant surround fire equip
Address: msZBo6FFTDdFoXmfwXu7Scwg8QK64SMLK5

```
# Importing a wallet (from BIP39 mnemonic)

### Sample Input 1
```bash
node index.js import wallet1 "drive parrot execute gallery wheel exotic vibrant pill giant surround fire equip"

```
### Sample Ouput 1
```bash
Wallet imported successfully.
Name: wallet1
Mnemonic: drive parrot execute gallery wheel exotic vibrant pill giant surround fire equip
Address: msZBo6FFTDdFoXmfwXu7Scwg8QK64SMLK5

```

### Sample Input 2
```bash
node index.js import wallet "drive parrot execute gallery wheel exotic vibrant pill giant surround fire equip"

```
### Sample Ouput 2
```bash
Wallet not found.

```

### Sample Input 3
```bash
node index.js import wallet1 "drive parrot execute gallery wheel exotic vibrant pill giant surround fire"

```
### Sample Ouput 3
```bash
Invalid mnemonic.

```

# Listing Wallets

### Sample Input 1
```bash
node index.js list

```
### Sample Ouput 1
```bash
Wallets:
Name: mywallet
Mnemonic: abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about
Address: mkpZhYtJu2r87Js3pDiWJDmPte2NRZ8bJV
------------------------------
Name: wallet1
Mnemonic: drive parrot execute gallery wheel exotic vibrant pill giant surround fire equip
Address: msZBo6FFTDdFoXmfwXu7Scwg8QK64SMLK5
------------------------------
```

### Sample Input 2
```bash
node index.js list

```
### Sample Ouput 2
```bash
No Wallets.
```

# Get Bitcoin balance of a wallet

### Sample Input 1
```bash
node index.js balance mywallet

```
### Sample Ouput 1
```bash
Address: mkpZhYtJu2r87Js3pDiWJDmPte2NRZ8bJV
Balance: 0.00012708 BTC
------------------------------
```

# Getting the list of bitcoin transactions of a wallet

### Sample Input 1
```bash
node index.js transactions mywallet

```
### Sample Ouput 1
```bash
Address: mkpZhYtJu2r87Js3pDiWJDmPte2NRZ8bJV
Transactions:
Transaction ID: bd8e50ee20cddbc40e8cb50d5905170ba23a79b0c9856074e811fded4c8cabb1
Amount: 0.00012708 BTC
------------------------------
Transaction ID: 11c8a04ac28bf9735c5fa5ef321a221e91afca2854076b891f48808d74561e04
Amount: 0 BTC
------------------------------
Transaction ID: 9ead4703c505edf481075df19acb7332fc489c7ba2377f418b1b6095670efd4d
Amount: 0.00330037 BTC
------------------------------
Transaction ID: e606829536461d56e2a507ba280d0d34a7d6ac86cdd80637c52b3c5f8b39a88d
Amount: 48.75350144 BTC
------------------------------
Transaction ID: a063dbdc23cf969df020536f75c431167a2bbf29d6215a2067495ac46991c954
Amount: 0 BTC
------------------------------
Transaction ID: 122b06fae7bf3409b58cf42ac0b7aec38bf44f3f82a02f477aa1d6fceb916f67
Amount: 0.00009488 BTC
------------------------------
Transaction ID: 87a97f143053f0e991e6a40966b730afd47ee324ef6ca385ff8399621d86de5a
Amount: 28.57669718 BTC
------------------------------
Transaction ID: 4bea5d3decbae3ee3132412923232e2d48d29a669422bb5697aea6057a350cae
Amount: 0.00009488 BTC
------------------------------
Transaction ID: 57da0f0c517b7510cb53a3d6f630902478ebe43d6cd45414cd1e58cb2c38963d
Amount: 28.57679862 BTC
------------------------------
Transaction ID: 0e2a318755aa4a10a1072084c563179a9655bbb5528ee241da208d9a3834b55e
Amount: 0.03173759 BTC
------------------------------
```

### Sample Input 2
```bash
node index.js transactions wallet1

```
### Sample Ouput 2
```bash
Address: msZBo6FFTDdFoXmfwXu7Scwg8QK64SMLK5
No transactions.
```


# Generating an unused bitcoin address for a wallet

### Sample Input 1
```bash
node index.js address  mywallet

```
### Sample Ouput 1
```bash
New address generated successfully.
Address: mge2bco7PEaixAxsVQEDYrNHAmzQ1brBNx
```
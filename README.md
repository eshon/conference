## Conference

A simple Ethereum smart contract and lightwallet example.


### Install

Install [testrpc] (or use geth)

```
npm install -g ethereumjs-testrpc
```

Install [truffle](https://github.com/consensys/truffle):

```
$ npm install -g truffle 
```

If you don't have solc you can get it [here](https://github.com/ethereum/go-ethereum/wiki/Contract-Tutorial#using-an-online-compiler)

### Run

Run testrpc in one console window:

```
(venv)$ testrpc
```
In another console window run truffle from project root directory:

```
$ truffle init
$ truffle compile
$ truffle deploy
$ truffle test
$ truffle serve // server at localhost:8080
```



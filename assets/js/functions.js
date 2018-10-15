$(document).ready(function () {
    //Initiating web3 provider
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    //Set the default account (Makes the executer in MetaMask as default)
    web3.eth.defaultAccount = web3.eth.accounts[0];

    //ABI for contract
    var ProductTracking = web3.eth.contract([
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "addr",
                    "type": "address"
                }
            ],
            "name": "DigitalSignature",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_signature",
                    "type": "string"
                },
                {
                    "name": "_fullName",
                    "type": "string"
                },
                {
                    "name": "_phoneNumber",
                    "type": "string"
                },
                {
                    "name": "_eMail",
                    "type": "string"
                },
                {
                    "name": "_uuid",
                    "type": "string"
                }
            ],
            "name": "addProducer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "uuid",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "message",
                    "type": "string"
                }
            ],
            "name": "RejectTransfer",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "uuid",
                    "type": "string"
                }
            ],
            "name": "ProductTransfer",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "uuid",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "message",
                    "type": "string"
                }
            ],
            "name": "RejectCreate",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "uuid",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "producerName",
                    "type": "string"
                }
            ],
            "name": "ProductCreate",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "producerAddress",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "fullName",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "phoneNumber",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "eMail",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "uuid",
                    "type": "string"
                }
            ],
            "name": "ProducerInfo",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "producer",
                    "type": "address"
                }
            ],
            "name": "ProducerHistory",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "uuid",
                    "type": "string"
                },
                {
                    "name": "producerName",
                    "type": "string"
                },
                {
                    "name": "prunerName",
                    "type": "string"
                },
                {
                    "name": "producingArea",
                    "type": "string"
                },
                {
                    "name": "harvestDate",
                    "type": "string"
                },
                {
                    "name": "shippingDate",
                    "type": "string"
                },
                {
                    "name": "receptionDate",
                    "type": "string"
                },
                {
                    "name": "issuanceDate",
                    "type": "string"
                },
                {
                    "name": "inspectionDate1",
                    "type": "string"
                },
                {
                    "name": "inspectionDate2",
                    "type": "string"
                },
                {
                    "name": "inspectionDate3",
                    "type": "string"
                },
                {
                    "name": "pesticideUse",
                    "type": "string"
                }
            ],
            "name": "createProduct",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_producerAddress",
                    "type": "address"
                }
            ],
            "name": "removeProducer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "to",
                    "type": "address"
                },
                {
                    "name": "uuid",
                    "type": "string"
                }
            ],
            "name": "transferProduct",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getAllProducers",
            "outputs": [
                {
                    "name": "",
                    "type": "address[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "getOneProducer",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "uuid",
                    "type": "string"
                }
            ],
            "name": "getProductByUUID1",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "uuid",
                    "type": "string"
                }
            ],
            "name": "getProductByUUID2",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "uuid",
                    "type": "string"
                }
            ],
            "name": "isOwnerOf",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_addr",
                    "type": "address"
                },
                {
                    "name": "hash",
                    "type": "bytes32"
                },
                {
                    "name": "v",
                    "type": "uint8"
                },
                {
                    "name": "r",
                    "type": "bytes32"
                },
                {
                    "name": "s",
                    "type": "bytes32"
                }
            ],
            "name": "isSigned",
            "outputs": [
                {
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "producers",
            "outputs": [
                {
                    "name": "signature",
                    "type": "string"
                },
                {
                    "name": "fullName",
                    "type": "string"
                },
                {
                    "name": "phoneNumber",
                    "type": "string"
                },
                {
                    "name": "eMail",
                    "type": "string"
                },
                {
                    "name": "uuid",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "producersAccounts",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "producersNumber",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "registeredProducers",
            "outputs": [
                {
                    "name": "signature",
                    "type": "string"
                },
                {
                    "name": "fullName",
                    "type": "string"
                },
                {
                    "name": "phoneNumber",
                    "type": "string"
                },
                {
                    "name": "eMail",
                    "type": "string"
                },
                {
                    "name": "uuid",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]);

    var _ProductTracking = ProductTracking.at('0xa68ab4c2f1e2edab9f0987ca9bf074e635bbb362');

    var curEvent;
    var Events = {
        "AddProducerEvent": 1,
        "AddProductEvent": 2
        // "ProductCreate": 3,
        // "RejectCreate": 4,
        // "ProductTransfer": 5,
        // "RejectTransfer": 6
    }

    //button to add a producer on the ledger
    $("#btnAddProducer").click(function () {
        ResetNavbar();
        //var _ethAddress = $("#ethAddress").val();
        var _fullName = $("#fullName").val();
        var _phoneNumber = $("#phoneNumber").val();
        var _eMail = $("#eMail").val();
        var _uuid = $("#uuid").val();

        //Input check
        // if (isEmpty(_ethAddress) || !isNumber(_ethAddress)) {
        //     InvalidAddressAlert();
        //     return;
        // }

        showHideLoader(1);

        var producerInfo = _fullName + '\n' + _phoneNumber + '\n' + _eMail + '\n' + _uuid;

        // Sign producer info
		var addr = web3.eth.accounts[0];
        var hex_msg = web3.sha3(producerInfo);
        
        web3.personal.sign(hex_msg, addr, function (err, res) {
			if (err) {
				alert('Could not sign information provided. Please try again.');
				showHideLoader(0);
				return;
			} else {

				// Save signature public key to the contract 
				signature = res.toString();

				var proceed = confirm('Would you like to proceed to registration?');

				if (proceed) {
					_ProductTracking.addProducer(signature, _fullName, _phoneNumber, _eMail, _uuid, (err, res) => {
						if (err) {
							showHideLoader(0);
						} else {
							curEvent = Events["AddProducerEvent"];
						}
					});
				} else {
					ResetNavbar();
					return;
				}
			}
		});
    });

    //event for adding a producer
    var AddProducerEvent = _ProductTracking.ProducerInfo({}, 'latest');

    AddProducerEvent.watch(function (error, result) {
        if (!error) {
            TransactionComplete(result);
            switch (curEvent) {
                case Events["AddProducerEvent"]:
                    $("#transactionResult").html('<br/>生産者のアドレス： ' + result.args.producerAddress + 
                    '<br/>生産者の氏名： ' + result.args.fullName + 
                    '<br/>生産者の電話番号： ' + result.args.phoneNumber + 
                    '<br/>生産者のメールアドレス： ' + result.args.eMail +
                    '<br/>Universally Unique Identifier： ' + result.args.uuid);
                    break;
            }

        } else {
            alert("Something went wrong!");
            showHideLoader(0);
        }
    });

    //Button to remove a producer from the ledger
    $("#btnRemoveProducer").click(function () {
        ResetNavbar();
        var _addtoRemoveAuth = $("#addtoRemoveAuth").val();

        //Input check
        if (isEmpty(_addtoRemoveAuth) || !isNumber(_addtoRemoveAuth)) {
            InvalidAddressAlert();
            return;
        }

        showHideLoader(1);
        _ProductTracking.removeProducer(_addtoRemoveAuth, (err, res) => {
            if (err) {
                showHideLoader(0);
            } else {
                $("#TransHash").html('Transaction Hash: ' + res);
                showHideLoader(0);
            }
        });
    });

    //button for getting all producers
    $("#btnGetAllProducers").click(function () {
        ResetNavbar();
        showHideLoader(1);
        _ProductTracking.getAllProducers((err, res) => {
            if (err) {
                showHideLoader(0);
            } else {
                ResetNavbar();
                var producers = res.toString().split(',');
                var producerStr = "";

                for (i = 0 ; i < producers.length ; i++) {
                    producerStr += '<br/>生産者 ' + (i + 1).toString() + ': ' + producers[i];
                }

                $("#transactionResult").html('全ての生産者の数： ' + producers.length + producerStr);
            }
        });
    });

    //button for getting one producer
    $("#btnGetOneProducer").click(function () {
        ResetNavbar();
        var _checkOneProducer = $("#checkOneProducer").val();

        //Input check
        if (isEmpty(_checkOneProducer) || !isNumber(_checkOneProducer)) {
            InvalidAddressAlert();
            return;
        }

        showHideLoader(1);
        _ProductTracking.getOneProducer(_checkOneProducer, (err, res) => {
            if (err) {
                showHideLoader(0);
            } else {
                ResetNavbar();
                var producers = res.toString().split(',');
                var producerStr = "";

                for (j = 0 ; j < producers.length ; j++) {
                    if (j == 0) {
                        producerStr += '<br/>デジタル署名：' + producers[j];
                    } else if (j == 1) {
                        producerStr += '<br/>氏名：' + producers[j];
                    } else if (j == 2) {
                        producerStr += '<br/>電話番号： ' + producers[j];
                    } else if (j == 3) {
                        producerStr += '<br/>メールアドレス： ' + producers[j];
                    } else {
                        producerStr += '<br/>Universally Unique Identifier： ' + producers[j];
                    }
                }

                $("#transactionResult").html('生産者の情報： ' + producerStr);
            }
        });
    });

    function toHex(str) {
		var hex = '';
		for (var i = 0; i < str.length; i++) {
			hex += '' + str.charCodeAt(i).toString(16);
		}
		return hex;
	};

    // Check if producer info is signed or not button
	$("#btnCheckIfSigned").click(function () {
		ResetNavbar();
		showHideLoader(1);
		var _producerAddr = $("#checkIfSigned").val();

		//Input check
		if (isEmpty(_producerAddr) || !isNumber(_producerAddr)) {
			InvalidAddressAlert();
			ResetNavbar();
			return;
		}

		// Get student info from the contract 
		_ProductTracking.getOneProducer(_producerAddr, (err, res) => {
			if (err) {
				showHideLoader(0);
				alert('Something went wrong');
			} else {
				var producers = res.toString().split(',');
				var producerStr = "";

				var signature = '';
				var fullName = '';
				var phoneNumber = '';
                var eMail = '';
                var uuid = '';

				for (j = 0; j < producers.length; j++) {
					if (j == 0) {
						producerStr += "\nProducer signature: " + producers[j];
						signature = producers[j];
					} else if (j == 1) {
						producerStr += "\nFull Name: " + producers[j];
						fullName = producers[j];
					} else if (j == 2) {
						producerStr += "\nPhone Number: " + producers[j];
						phoneNumber = producers[j];
					} else if (j == 3) {
						producerStr += "\neMail: " + producers[j];
						eMail = producers[j];
					} else {
						producerStr += "\nUniversally Unique Identifier: " + producers[j];
						uuid = producers[j];
					}
				}

				if (signature === '') {
					ResetNavbar();
					alert('その生産者が存在していない');
					return;
				}

				var proceed = confirm("Proceed with the following information? \nProducer Info: " + producerStr);
				if (proceed) {

					var producerInfo = fullName + '\n' + phoneNumber + '\n' + eMail + '\n' + uuid;
					var hex_msg = web3.sha3(producerInfo);

					var r = signature.slice(0, 66);
					var s = '0x' + signature.slice(66, 130);
					var v = '0x' + signature.slice(130, 132);
					v = web3.toDecimal(v);

					// Check if the producer signed the info or not
					_ProductTracking.isSigned(_producerAddr, hex_msg, v, r, s, (err, res) => {
						if (err) {
							ResetNavbar();
							alert('Something went wrong');
							return;
						} else {
							showHideLoader(0);
							$("#transactionResult").html('Is signed: ' + res.toString());
						}
					});
				} else {
					ResetNavbar();
					return;
				}
			}
		});

	});

    //button to add a product on the ledger
    $("#btnAddProduct").click(function () {
        ResetNavbar();
        var _uuid = $("#uuid").val();
        var _producerName = $("#producerName").val();
        var _prunerName = $("#prunerName").val();
        var _producingArea = $("#producingArea").val();
        var _harvestDate = $("#harvestDate").val();
        var _shippingDate = $("#shippingDate").val();
        var _receptionDate = $("#receptionDate").val();
        var _issuanceDate = $("#issuanceDate").val();
        var _inspectionDate1 = $("#inspectionDate1").val();
        var _inspectionDate2 = $("#inspectionDate2").val();
        var _inspectionDate3 = $("#inspectionDate3").val();
        var _pesticideUse = $("#pesticideUse").val();

        showHideLoader(1);

        _ProductTracking.createProduct(_uuid, _producerName, _prunerName, _producingArea, _harvestDate, _shippingDate, _receptionDate, _issuanceDate, _inspectionDate1, _inspectionDate2, _inspectionDate3, _pesticideUse, (err, res) => {
            if (err) {
                showHideLoader(0);
            } else {
                curEvent = Events["AddProductEvent"];
            }
        });
    });

    //event for adding a product
    var AddProductEvent = _ProductTracking.ProductCreate({}, 'latest');

    AddProductEvent.watch(function (error, result) {
        if (!error) {
            TransactionComplete(result);
            switch (curEvent) {
                case Events["AddProductEvent"]:
                    $("#transactionResult").html('<br/>生産者のアドレス： ' + result.args.result + '<br/>製品のUUID： ' + result.args.uuid + '<br/>生産者の氏名： ' + result.args.producerName);
                    break;
            }

        } else {
            alert("Something went wrong!");
            showHideLoader(0);
        }
    });

    //button for getting first part of one product
    $("#btnCheckProduct").click(function () {
        ResetNavbar();
        var _uuid1 = $("#uuid1").val();

        showHideLoader(1);
        _ProductTracking.getProductByUUID1(_uuid1, (err, res) => {
            if (err) {
                showHideLoader(0);
            } else {
                ResetNavbar();
                var products = res.toString().split(',');
                var productStr = "";

                for (j = 0 ; j < products.length ; j++) {
                    if (j == 0) {
                        productStr += '<br/>生産者の氏名：' + products[j];
                    } else if (j == 1) {
                        productStr += '<br/>剪定士の氏名：' + products[j];
                    } else if (j == 2) {
                        productStr += '<br/>生産地： ' + products[j];
                    } else if (j == 3) {
                        productStr += '<br/>収穫日： ' + products[j];
                    } else {
                        productStr += '<br/>出荷日： ' + products[j];
                    }

                }

                $("#transactionResult").html('製品の履歴： ' + productStr);
            }
        });
    });

    //button for getting second part of one product
    $("#btnCheckProduct2").click(function () {
        ResetNavbar();
        var _uuid2 = $("#uuid2").val();

        showHideLoader(1);
        _ProductTracking.getProductByUUID2(_uuid2, (err, res) => {
            if (err) {
                showHideLoader(0);
            } else {
                ResetNavbar();
                var products = res.toString().split(',');
                var productStr = "";

                for (j = 0 ; j < products.length ; j++) {
                    if (j == 0) {
                        productStr += '<br/>雪室入庫日：' + products[j];
                    } else if (j == 1) {
                        productStr += '<br/>雪室出庫日：' + products[j];
                    } else if (j == 2) {
                        productStr += '<br/>検査日１： ' + products[j];
                    } else if (j == 3) {
                        productStr += '<br/>検査日２： ' + products[j];
                    } else if (j == 4){
                        productStr += '<br/>検査日３： ' + products[j];
                    } else {
                        productStr += '<br/>農薬使用有無： ' + products[j];
                    }

                }

                $("#transactionResult").html('製品の履歴： ' + productStr);
            }
        });
    });

    //button for checking product onwership
    $("#btnCheckOwner").click(function () {
        ResetNavbar();
        var _addToCheck = $("#addToCheck").val();
        var _uuidToCheck = $("#uuidToCheck").val();

        //Input check
        if (isEmpty(_addToCheck) || !isNumber(_addToCheck)) {
            InvalidAddressAlert();
            return;
        }

        showHideLoader(1);
        _ProductTracking.isOwnerOf(_addToCheck, _uuidToCheck, (err, res) => {
            if (err) {
                showHideLoader(0);
            } else {
                ResetNavbar();
                $("#transactionResult").html('入力した生産者が入力した製品のオーナー: ' + res);

            }
        });
    });

    //button to transfer product ownership
    $("#btnTransOwner").click(function () {
        ResetNavbar();
        var _addToTrans = $("#addToTrans").val();
        var _uuidToTrans = $("#uuidToTrans").val();

        //Input check
        if (isEmpty(_addToTrans) || !isNumber(_addToTrans)) {
            InvalidAddressAlert();
            return;
        }

        showHideLoader(1);
        _ProductTracking.transferProduct(_addToTrans, _uuidToTrans, (err, res) => {
            if (err) {
                showHideLoader(0);
            } else {
                $("#TransHash").html('Transaction Hash: ' + res);
                showHideLoader(0);
            }
        });
    });

	var digitalSignatureEvent = _ProductTracking.DigitalSignature({}, 'latest');

	digitalSignatureEvent.watch(function (error, result) {
		if (!error) {
			TransactionComplete(result);
					$("#transactionResult").html('Address signed: ' + result.args.addr);

		} else {
			alert("Something went wrong!");
			showHideLoader(0);
		}
	});

    //Clear navbar
    function ResetNavbar() {
        showHideLoader(0);
        $("#insTrans").html('');
        $("#transBlock").html('');
        $("#TransHash").html('');
        $("#transactionResult").html('');
    }

    //Common info function (only on successful transaction)
    function TransactionComplete(block) {
        if (block.blockHash != $("#insTrans").html())
            showHideLoader(0);
        $("#insTrans").html('Block hash: ' + block.blockHash);
        $("#transBlock").html('Transaction Block: ' + block.blockNumber);
    }

    //Alert if no address is found
    function InvalidAddressAlert() {
        alert('Please enter a valid address');
    }

    //Empty string check
    function isEmpty(str) {
        return (!str || 0 === str.length);
    }

    //Loading image switch (0: off, 1: on)
    function showHideLoader(onOff) {
        if (onOff == 1) {
            var sLoader = $("#loader").show();
        } else {
            var hLoader = $("#loader").hide();
        }
    }

    //Check if input is a number (address)
    function isNumber(str) {
        if (isNaN(str)) {
            return false;
        } else {
            return true;
        }
    }
});
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  CrossChainControl,
  CrossChainControlInterface,
} from "../../contracts/CrossChainControl";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "txId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "revertReason",
        type: "string",
      },
    ],
    name: "CallFailure",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "txId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "destBcId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "destContract",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "destFunctionCall",
        type: "bytes",
      },
    ],
    name: "CrossCall",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_blockchainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_cbc",
        type: "address",
      },
    ],
    name: "addRemoteCrossChainControl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_blockchainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_verifier",
        type: "address",
      },
    ],
    name: "addVerifier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_destBcId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_destContract",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_destData",
        type: "bytes",
      },
    ],
    name: "crossBlockchainCall",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_sourceBcId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_cbcAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_eventData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
    ],
    name: "crossCallHandler",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_srcBcId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_cbcAddress",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_eventData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes",
      },
      {
        internalType: "bytes32[]",
        name: "_oldTxIds",
        type: "bytes32[]",
      },
    ],
    name: "crossCallHandlerSaveGas",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_myBcId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_timeHorizon",
        type: "uint256",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "myBcId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    name: "replayPrevention",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "timeHorizon",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50612783806100206000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c80638129fc1c1161008c578063b283209611610066578063b2832096146101c6578063e4a30116146101e2578063f2fde38b146101fe578063f51a72d81461021a576100cf565b80638129fc1c146101825780638da5cb5b1461018c57806392b2c335146101aa576100cf565b80630a3ef1f2146100d45780631101b8f014610104578063206320e71461012257806322eb6b9b14610140578063408840521461015c578063715018a614610178575b600080fd5b6100ee60048036038101906100e9919061126d565b610236565b6040516100fb91906112b3565b60405180910390f35b61010c61024e565b60405161011991906112b3565b60405180910390f35b61012a610254565b60405161013791906112b3565b60405180910390f35b61015a60048036038101906101559190611358565b61025a565b005b610176600480360381019061017191906113fd565b6102b8565b005b610180610536565b005b61018a61054a565b005b610194610688565b6040516101a191906114b3565b60405180910390f35b6101c460048036038101906101bf91906114ce565b6106b2565b005b6101e060048036038101906101db9190611358565b61074f565b005b6101fc60048036038101906101f79190611542565b61085f565b005b61021860048036038101906102139190611582565b6109a5565b005b610234600480360381019061022f9190611605565b610a28565b005b60686020528060005260406000206000915090505481565b60675481565b60695481565b610262610ad2565b806066600084815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b6102e786867f59f736dc5e15c4b12526487502645403b0a4316d82eba7e9ecdc2a050c10ad2787878787610b50565b6000806000806000606089898101906103009190611860565b809650819750829850839950849a50859b50505050505050600060686000888152602001908152602001600020541461036e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161036590611966565b60405180910390fd5b4285106103b0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103a7906119d2565b60405180910390fd5b42606754866103bf9190611a21565b116103ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103f690611aa1565b60405180910390fd5b846068600088815260200190815260200160002081905550606954831461045b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161045290611b33565b60405180910390fd5b6000610468828e87610d52565b9050600060608473ffffffffffffffffffffffffffffffffffffffff16836040516104939190611bc4565b6000604051808303816000865af19150503d80600081146104d0576040519150601f19603f3d011682016040523d82523d6000602084013e6104d5565b606091505b50809250819350505081610525577f39112ef9f5044b43dcef5a47ca6b7850a5305c8906d2fb35c508d9d322b52e938961050e83610da0565b60405161051c929190611c2e565b60405180910390a15b505050505050505050505050505050565b61053e610ad2565b6105486000610e57565b565b60008060019054906101000a900460ff1615905080801561057b5750600160008054906101000a900460ff1660ff16105b806105a8575061058a30610f1d565b1580156105a75750600160008054906101000a900460ff1660ff16145b5b6105e7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105de90611cd0565b60405180910390fd5b60016000806101000a81548160ff021916908360ff1602179055508015610624576001600060016101000a81548160ff0219169083151502179055505b61062c610f40565b80156106855760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498600160405161067c9190611d42565b60405180910390a15b50565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b606a60008154809291906106c590611d5d565b919050555060004260695486868686606a546040516020016106ed9796959493929190611e33565b6040516020818303038152906040528051906020012090507f59f736dc5e15c4b12526487502645403b0a4316d82eba7e9ecdc2a050c10ad27814233888888886040516107409796959493929190611edf565b60405180910390a15050505050565b610757610ad2565b6000820361079a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079190611f95565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610809576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161080090612001565b60405180910390fd5b806065600084815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050565b60008060019054906101000a900460ff161590508080156108905750600160008054906101000a900460ff1660ff16105b806108bd575061089f30610f1d565b1580156108bc5750600160008054906101000a900460ff1660ff16145b5b6108fc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108f390611cd0565b60405180910390fd5b60016000806101000a81548160ff021916908360ff1602179055508015610939576001600060016101000a81548160ff0219169083151502179055505b826069819055508160678190555080156109a05760008060016101000a81548160ff0219169083151502179055507f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249860016040516109979190611d42565b60405180910390a15b505050565b6109ad610ad2565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610a1c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a1390612093565b60405180910390fd5b610a2581610e57565b50565b60005b82829050811015610ab9576000838383818110610a4b57610a4a6120b3565b5b9050602002013590506000606860008381526020019081526020016000205490504260675482610a7b9190611a21565b1115610aa45760008114610aa357600060686000848152602001908152602001600020819055505b5b50508080610ab190611d5d565b915050610a2b565b50610ac88888888888886102b8565b5050505050505050565b610ada610f99565b73ffffffffffffffffffffffffffffffffffffffff16610af8610688565b73ffffffffffffffffffffffffffffffffffffffff1614610b4e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b459061212e565b60405180910390fd5b565b60006065600089815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610bf7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bee906121c0565b60405180910390fd5b6066600089815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168773ffffffffffffffffffffffffffffffffffffffff1614610c98576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c8f90612252565b60405180910390fd5b60008888888888604051602001610cb3959493929190612293565b60405160208183030381529060405290508173ffffffffffffffffffffffffffffffffffffffff16634c1ce9028a898488886040518663ffffffff1660e01b8152600401610d05959493929190612318565b602060405180830381865afa158015610d22573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d4691906123a5565b50505050505050505050565b6060838383604051602001610d689291906123d2565b604051602081830303815290604052604051602001610d889291906123fe565b60405160208183030381529060405290509392505050565b6060602482511015610ddc57610db68251610fa1565b604051602001610dc691906124d0565b6040516020818303038152906040529050610e52565b6000604483511090506004830192508015610e3a57600083806020019051810190610e079190612507565b9050610e1281610fa1565b604051602001610e229190612580565b60405160208183030381529060405292505050610e52565b82806020019051810190610e4e9190612643565b9150505b919050565b6000603360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081603360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b6000808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b600060019054906101000a900460ff16610f8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f86906126fe565b60405180910390fd5b610f9761106f565b565b600033905090565b606060006001610fb0846110d0565b01905060008167ffffffffffffffff811115610fcf57610fce611735565b5b6040519080825280601f01601f1916602001820160405280156110015781602001600182028036833780820191505090505b509050600082602001820190505b600115611064578080600190039150507f3031323334353637383961626364656600000000000000000000000000000000600a86061a8153600a85816110585761105761271e565b5b0494506000850361100f575b819350505050919050565b600060019054906101000a900460ff166110be576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110b5906126fe565b60405180910390fd5b6110ce6110c9610f99565b610e57565b565b600080600090507a184f03e93ff9f4daa797ed6e38ed64bf6a1f010000000000000000831061112e577a184f03e93ff9f4daa797ed6e38ed64bf6a1f01000000000000000083816111245761112361271e565b5b0492506040810190505b6d04ee2d6d415b85acef8100000000831061116b576d04ee2d6d415b85acef810000000083816111615761116061271e565b5b0492506020810190505b662386f26fc10000831061119a57662386f26fc1000083816111905761118f61271e565b5b0492506010810190505b6305f5e10083106111c3576305f5e10083816111b9576111b861271e565b5b0492506008810190505b61271083106111e85761271083816111de576111dd61271e565b5b0492506004810190505b6064831061120b57606483816112015761120061271e565b5b0492506002810190505b600a831061121a576001810190505b80915050919050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b61124a81611237565b811461125557600080fd5b50565b60008135905061126781611241565b92915050565b6000602082840312156112835761128261122d565b5b600061129184828501611258565b91505092915050565b6000819050919050565b6112ad8161129a565b82525050565b60006020820190506112c860008301846112a4565b92915050565b6112d78161129a565b81146112e257600080fd5b50565b6000813590506112f4816112ce565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000611325826112fa565b9050919050565b6113358161131a565b811461134057600080fd5b50565b6000813590506113528161132c565b92915050565b6000806040838503121561136f5761136e61122d565b5b600061137d858286016112e5565b925050602061138e85828601611343565b9150509250929050565b600080fd5b600080fd5b600080fd5b60008083601f8401126113bd576113bc611398565b5b8235905067ffffffffffffffff8111156113da576113d961139d565b5b6020830191508360018202830111156113f6576113f56113a2565b5b9250929050565b6000806000806000806080878903121561141a5761141961122d565b5b600061142889828a016112e5565b965050602061143989828a01611343565b955050604087013567ffffffffffffffff81111561145a57611459611232565b5b61146689828a016113a7565b9450945050606087013567ffffffffffffffff81111561148957611488611232565b5b61149589828a016113a7565b92509250509295509295509295565b6114ad8161131a565b82525050565b60006020820190506114c860008301846114a4565b92915050565b600080600080606085870312156114e8576114e761122d565b5b60006114f6878288016112e5565b945050602061150787828801611343565b935050604085013567ffffffffffffffff81111561152857611527611232565b5b611534878288016113a7565b925092505092959194509250565b600080604083850312156115595761155861122d565b5b6000611567858286016112e5565b9250506020611578858286016112e5565b9150509250929050565b6000602082840312156115985761159761122d565b5b60006115a684828501611343565b91505092915050565b60008083601f8401126115c5576115c4611398565b5b8235905067ffffffffffffffff8111156115e2576115e161139d565b5b6020830191508360208202830111156115fe576115fd6113a2565b5b9250929050565b60008060008060008060008060a0898b0312156116255761162461122d565b5b60006116338b828c016112e5565b98505060206116448b828c01611343565b975050604089013567ffffffffffffffff81111561166557611664611232565b5b6116718b828c016113a7565b9650965050606089013567ffffffffffffffff81111561169457611693611232565b5b6116a08b828c016113a7565b9450945050608089013567ffffffffffffffff8111156116c3576116c2611232565b5b6116cf8b828c016115af565b92509250509295985092959890939650565b60006116ec826112fa565b9050919050565b6116fc816116e1565b811461170757600080fd5b50565b600081359050611719816116f3565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61176d82611724565b810181811067ffffffffffffffff8211171561178c5761178b611735565b5b80604052505050565b600061179f611223565b90506117ab8282611764565b919050565b600067ffffffffffffffff8211156117cb576117ca611735565b5b6117d482611724565b9050602081019050919050565b82818337600083830152505050565b60006118036117fe846117b0565b611795565b90508281526020810184848401111561181f5761181e61171f565b5b61182a8482856117e1565b509392505050565b600082601f83011261184757611846611398565b5b81356118578482602086016117f0565b91505092915050565b60008060008060008060c0878903121561187d5761187c61122d565b5b600061188b89828a01611258565b965050602061189c89828a016112e5565b95505060406118ad89828a0161170a565b94505060606118be89828a016112e5565b93505060806118cf89828a0161170a565b92505060a087013567ffffffffffffffff8111156118f0576118ef611232565b5b6118fc89828a01611832565b9150509295509295509295565b600082825260208201905092915050565b7f5472616e73616374696f6e20616c726561647920657869737473000000000000600082015250565b6000611950601a83611909565b915061195b8261191a565b602082019050919050565b6000602082019050818103600083015261197f81611943565b9050919050565b7f4576656e742074696d657374616d7020697320696e2074686520667574757265600082015250565b60006119bc602083611909565b91506119c782611986565b602082019050919050565b600060208201905081810360008301526119eb816119af565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611a2c8261129a565b9150611a378361129a565b9250828201905080821115611a4f57611a4e6119f2565b5b92915050565b7f4576656e7420697320746f6f206f6c6400000000000000000000000000000000600082015250565b6000611a8b601083611909565b9150611a9682611a55565b602082019050919050565b60006020820190508181036000830152611aba81611a7e565b9050919050565b7f496e636f72726563742064657374696e6174696f6e20626c6f636b636861696e60008201527f2069640000000000000000000000000000000000000000000000000000000000602082015250565b6000611b1d602383611909565b9150611b2882611ac1565b604082019050919050565b60006020820190508181036000830152611b4c81611b10565b9050919050565b600081519050919050565b600081905092915050565b60005b83811015611b87578082015181840152602081019050611b6c565b60008484015250505050565b6000611b9e82611b53565b611ba88185611b5e565b9350611bb8818560208601611b69565b80840191505092915050565b6000611bd08284611b93565b915081905092915050565b611be481611237565b82525050565b600081519050919050565b6000611c0082611bea565b611c0a8185611909565b9350611c1a818560208601611b69565b611c2381611724565b840191505092915050565b6000604082019050611c436000830185611bdb565b8181036020830152611c558184611bf5565b90509392505050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6000611cba602e83611909565b9150611cc582611c5e565b604082019050919050565b60006020820190508181036000830152611ce981611cad565b9050919050565b6000819050919050565b600060ff82169050919050565b6000819050919050565b6000611d2c611d27611d2284611cf0565b611d07565b611cfa565b9050919050565b611d3c81611d11565b82525050565b6000602082019050611d576000830184611d33565b92915050565b6000611d688261129a565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611d9a57611d996119f2565b5b600182019050919050565b6000819050919050565b611dc0611dbb8261129a565b611da5565b82525050565b60008160601b9050919050565b6000611dde82611dc6565b9050919050565b6000611df082611dd3565b9050919050565b611e08611e038261131a565b611de5565b82525050565b6000611e1a8385611b5e565b9350611e278385846117e1565b82840190509392505050565b6000611e3f828a611daf565b602082019150611e4f8289611daf565b602082019150611e5f8288611daf565b602082019150611e6f8287611df7565b601482019150611e80828587611e0e565b9150611e8c8284611daf565b60208201915081905098975050505050505050565b600082825260208201905092915050565b6000611ebe8385611ea1565b9350611ecb8385846117e1565b611ed483611724565b840190509392505050565b600060c082019050611ef4600083018a611bdb565b611f0160208301896112a4565b611f0e60408301886114a4565b611f1b60608301876112a4565b611f2860808301866114a4565b81810360a0830152611f3b818486611eb2565b905098975050505050505050565b7f496e76616c696420626c6f636b636861696e2069640000000000000000000000600082015250565b6000611f7f601583611909565b9150611f8a82611f49565b602082019050919050565b60006020820190508181036000830152611fae81611f72565b9050919050565b7f496e76616c696420766572696669657220616464726573730000000000000000600082015250565b6000611feb601883611909565b9150611ff682611fb5565b602082019050919050565b6000602082019050818103600083015261201a81611fde565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b600061207d602683611909565b915061208882612021565b604082019050919050565b600060208201905081810360008301526120ac81612070565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000612118602083611909565b9150612123826120e2565b602082019050919050565b600060208201905081810360008301526121478161210b565b9050919050565b7f4e6f207265676973746572656420766572696669657220666f7220626c6f636b60008201527f636861696e000000000000000000000000000000000000000000000000000000602082015250565b60006121aa602583611909565b91506121b58261214e565b604082019050919050565b600060208201905081810360008301526121d98161219d565b9050919050565b7f44617461206e6f7420656d697474656420627920617070726f76656420636f6e60008201527f7472616374000000000000000000000000000000000000000000000000000000602082015250565b600061223c602583611909565b9150612247826121e0565b604082019050919050565b6000602082019050818103600083015261226b8161222f565b9050919050565b6000819050919050565b61228d61228882611237565b612272565b82525050565b600061229f8288611daf565b6020820191506122af8287611df7565b6014820191506122bf828661227c565b6020820191506122d0828486611e0e565b91508190509695505050505050565b60006122ea82611b53565b6122f48185611ea1565b9350612304818560208601611b69565b61230d81611724565b840191505092915050565b600060808201905061232d60008301886112a4565b61233a6020830187611bdb565b818103604083015261234c81866122df565b90508181036060830152612361818486611eb2565b90509695505050505050565b60008115159050919050565b6123828161236d565b811461238d57600080fd5b50565b60008151905061239f81612379565b92915050565b6000602082840312156123bb576123ba61122d565b5b60006123c984828501612390565b91505092915050565b60006123de8285611daf565b6020820191506123ee8284611df7565b6014820191508190509392505050565b600061240a8285611b93565b91506124168284611b93565b91508190509392505050565b600081905092915050565b7f52657665727420666f7220756e6b6e6f776e206572726f722e204572726f722060008201527f6c656e6774683a20000000000000000000000000000000000000000000000000602082015250565b6000612489602883612422565b91506124948261242d565b602882019050919050565b60006124aa82611bea565b6124b48185612422565b93506124c4818560208601611b69565b80840191505092915050565b60006124db8261247c565b91506124e7828461249f565b915081905092915050565b600081519050612501816112ce565b92915050565b60006020828403121561251d5761251c61122d565b5b600061252b848285016124f2565b91505092915050565b7f50616e69633a2000000000000000000000000000000000000000000000000000600082015250565b600061256a600783612422565b915061257582612534565b600782019050919050565b600061258b8261255d565b9150612597828461249f565b915081905092915050565b600067ffffffffffffffff8211156125bd576125bc611735565b5b6125c682611724565b9050602081019050919050565b60006125e66125e1846125a2565b611795565b9050828152602081018484840111156126025761260161171f565b5b61260d848285611b69565b509392505050565b600082601f83011261262a57612629611398565b5b815161263a8482602086016125d3565b91505092915050565b6000602082840312156126595761265861122d565b5b600082015167ffffffffffffffff81111561267757612676611232565b5b61268384828501612615565b91505092915050565b7f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960008201527f6e697469616c697a696e67000000000000000000000000000000000000000000602082015250565b60006126e8602b83611909565b91506126f38261268c565b604082019050919050565b60006020820190508181036000830152612717816126db565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fdfea26469706673582212205a36a9fad100e69692b44359afd399fc5e25e053f6725cc3a9ee6c663a18ccb264736f6c63430008120033";

type CrossChainControlConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CrossChainControlConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CrossChainControl__factory extends ContractFactory {
  constructor(...args: CrossChainControlConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      CrossChainControl & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): CrossChainControl__factory {
    return super.connect(runner) as CrossChainControl__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CrossChainControlInterface {
    return new Interface(_abi) as CrossChainControlInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): CrossChainControl {
    return new Contract(address, _abi, runner) as unknown as CrossChainControl;
  }
}

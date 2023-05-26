
import { ethers, JsonRpcProvider } from 'ethers';
import { MULTICALL_ABI, ERC20_ABI } from './constants.js';

const provider = new JsonRpcProvider('https://rpc.dfkchain.com/');
// const provider = new JsonRpcProvider('https://klaytn.rpc.defikingdoms.com/');
// const signer = provider.getSigner();
// console.log(await signer)

const multiCallAddress = '0xcA11bde05977b3631167028862bE2a173976CA11';
const multiCallContract = new ethers.Contract(multiCallAddress, MULTICALL_ABI, signer);
// const crystalContract = new ethers.Contract("0x04b9dA42306B023f3572e106B11D82aAd9D32EBb", ERC20_ABI, signer);

const addresses = [
'0xf543311360d1072873D627B06ffe85587e8fc41a',
'0x0E9c5f1787f24a39269487421E19A8A2FDB8aFC1'
];

const callData = addresses.map(address => ({
    target: multiCallAddress,
    callData: multiCallContract.interface.encodeFunctionData('getEthBalance(address)', [address])
    // callData: crystalContract.interface.encodeFunctionData('balanceOf(address)', [address])
}));
console.log(callData)

const result = await multiCallContract.aggregate(callData);
console.log(result)


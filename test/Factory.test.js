const { expect } = require('chai');
const hre = require('hardhat');

const TEST_ADDRESSES = [
    '0x1000000000000000000000000000000000000000',
    '0x2000000000000000000000000000000000000000'
  ]
const AddressZero = '0x0000000000000000000000000000000000000000';
const WETH_GOERLI = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6';
const DAI_GOERLI = "0x73967c6a0904aA032C103b4104747E88c566B1A2";
const USDC_GOERLI = "0x2f3A40A3db8a7e3D09B0adfEfbCe4f6F81927557";

describe("Factory Testing", async () => {
    let owner, acc1, acc2, acc3, acc4;
    let factoryFactory;
    let factoryContract;
    let token0Factory, token1Factory;
    let token0Contract, token1Contract;
    let routerFactory, routerContract;

    before(async () => {
        [owner, acc1, acc2, acc3, acc4] = await hre.ethers.getSigners();

        factoryFactory = await hre.ethers.getContractFactory("UniswapV2Factory");
        factoryContract = await factoryFactory.deploy(owner.address);

        // routerFactory = await hre.ethers.getContractFactory("UniswapV2Router02");
        // routerContract = await routerFactory.deploy(factoryContract.address, WETH_GOERLI);

        token0Factory = await hre.ethers.getContractFactory("TestERC20");
        token0Contract = await token0Factory.deploy(10000000);

        token1Factory = await hre.ethers.getContractFactory("TestERC20");
        token1Contract = await token1Factory.deploy(10000000);
    })

    describe("Testing", async () => {
        it("should return values", async () => {
            expect(await factoryContract.feeTo()).to.eq(AddressZero);
            expect(await factoryContract.feeToSetter()).to.eq(owner.address);
        })

        it("should be able to deploy pair", async () => {
            await factoryContract.createPair(token0Contract.address, token1Contract.address);
            const pairAddress = await factoryContract.getPair(token0Contract.address, token1Contract.address);
            console.log("Pair::=> ", pairAddress);
        })

        it("should be get pair hash", async () => {
            console.log("PairHash::=> ", await factoryContract.pairCodeHash());
        })

        it("should be able to revert if deploy same pair", async () => {
            await expect(factoryContract.createPair(token1Contract.address, token0Contract.address)).to.be.reverted;
        })

        it("should be able to create pair with test tokens", async () => {
            await factoryContract.createPair(DAI_GOERLI, USDC_GOERLI);
            const pairAddress = await factoryContract.getPair(DAI_GOERLI, USDC_GOERLI);
            console.log("Pair::=> ", pairAddress);
        })

        it("should return the length of pairs", async () => {
            expect(await factoryContract.allPairsLength()).to.eq(2)
        })

        it("setFeeToo", async () => {
            await expect(factoryContract.connect(acc1).setFeeTo(acc1.address)).to.be.revertedWith('UniswapV2: FORBIDDEN');
            await factoryContract.setFeeTo(acc1.address);
            expect(await factoryContract.feeTo()).to.eq(acc1.address);
        })
    })
})
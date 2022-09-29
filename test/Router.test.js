const { expect } = require('chai');
const hre = require('hardhat');

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

        routerFactory = await hre.ethers.getContractFactory("UniswapV2Router02");
        routerContract = await routerFactory.deploy(factoryContract.address, WETH_GOERLI);

        token0Factory = await hre.ethers.getContractFactory("TestERC20");
        token0Contract = await token0Factory.deploy(10000000);

        token1Factory = await hre.ethers.getContractFactory("TestERC20");
        token1Contract = await token1Factory.deploy(10000000);

        await factoryContract.createPair(token0Contract.address, token1Contract.address);
        await factoryContract.createPair(DAI_GOERLI, USDC_GOERLI);
    })

    describe("Testing", async () => {
        it("should be able to return pair address", async () => {
            const pairAddress = await factoryContract.getPair(token0Contract.address, token1Contract.address);
            console.log("Pair::=> ", pairAddress);
        })

        it('factory, WETH', async () => {
            expect(await routerContract.factory()).to.eq(factoryContract.address)
            // expect(await routerContract.WETH()).to.eq(WETH_GOERLI.address)
        })

        it("addLiquidity", async () => {
            const token0Amount = 1000;
            const token1Amount = 2000;

            await token0Contract.approve(routerContract.address, hre.ethers.constants.MaxUint256);
            await token1Contract.approve(routerContract.address, hre.ethers.constants.MaxUint256);

            await routerContract.addLiquidity(
                token0Contract.address, 
                token1Contract.address, 
                token0Amount, 
                token1Amount, 
                0, 
                0, 
                acc1.address, 
                hre.ethers.constants.MaxUint256
            )
        })
    })
})
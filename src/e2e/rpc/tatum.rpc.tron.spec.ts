import { Network, TatumSDK, Tron } from '../../service'
import { Status } from '../../util'
import { BlockIdentifier } from "../../dto";
import BigNumber from "bignumber.js";

const getTronRpc = async (testnet?: boolean) =>
  await TatumSDK.init<Tron>({
    network: testnet ? Network.TRON_SHASTA : Network.TRON,

    retryCount: 1,
    retryDelay: 2000,
  })
describe('RPCs', () => {
  describe('TRON', () => {
    describe('testnet', () => {
      it('getNowBlock', async () => {
        const tatum = await getTronRpc(true)
        const { data, status } = await tatum.rpc.getNowBlock()
        expect(status).toBe(Status.SUCCESS)
        expect(data.block_header.raw_data.number).toBeGreaterThan(0)
      })
      it('getChainParameters', async () => {
        const tatum = await getTronRpc(true)
        const { data, status } = await tatum.rpc.getChainParameters()
        expect(status).toBe(Status.SUCCESS)
        expect(data.chainParameter.length).toBeGreaterThan(0)
      })
      it('getBlockByNum', async () => {
        const tatum = await getTronRpc(true)
        const { data, status } = await tatum.rpc.getBlock('1000000')
        expect(status).toBe(Status.SUCCESS)
        expect(data.block_header.raw_data.number).toBeGreaterThan(0)
      })
      it('getBlockById', async () => {
        const tatum = await getTronRpc(true)
        const { data, status } = await tatum.rpc.getBlock(
          '00000000000f424013e51b18e0782a32fa079ddafdb2f4c343468cf8896dc887',
        )
        expect(status).toBe(Status.SUCCESS)
        expect(data.block_header.raw_data.number).toBeGreaterThan(0)
      })
      it('getTransactionById', async () => {
        const tatum = await getTronRpc(true)
        const { data, status } = await tatum.rpc.getTransactionById(
          '7c2d4206c03a883dd9066d620335dc1be272a8dc733cfa3f6d10308faa37facc',
        )
        expect(status).toBe(Status.SUCCESS)
        expect(data.txID).toBe('7c2d4206c03a883dd9066d620335dc1be272a8dc733cfa3f6d10308faa37facc')
      })
    })
    describe('mainnet', () => {
      it('getNowBlock', async () => {
        const tatum = await getTronRpc(false)
        const { data, status } = await tatum.rpc.getNowBlock()
        expect(status).toBe(Status.SUCCESS)
        expect(data.block_header.raw_data.number).toBeGreaterThan(0)
      })
      it('getChainParameters', async () => {
        const tatum = await getTronRpc(false)
        const { data, status } = await tatum.rpc.getChainParameters()
        expect(status).toBe(Status.SUCCESS)
        expect(data.chainParameter.length).toBeGreaterThan(0)
      })
      it('getBlockByNum', async () => {
        const tatum = await getTronRpc(false)
        const { data, status } = await tatum.rpc.getBlock('51173114')
        expect(status).toBe(Status.SUCCESS)
        expect(data.block_header.raw_data.number).toBeGreaterThan(0)
      })
      it('getBlockById', async () => {
        const tatum = await getTronRpc(false)
        const { data, status } = await tatum.rpc.getBlock(
          '00000000030cd6faf6c282df598285c51bd61e108f98e90ea8a0ef4bd0b2d9ec',
        )
        expect(status).toBe(Status.SUCCESS)
        expect(data.block_header.raw_data.number).toBeGreaterThan(0)
      })
      it('getTransactionById', async () => {
        const tatum = await getTronRpc(false)
        const { data, status } = await tatum.rpc.getTransactionById(
          'eb49c1c052fb23a9b909a0f487602459112d1fb41276361752e9bc491e649598',
        )
        expect(status).toBe(Status.SUCCESS)
        expect(data.txID).toBe('eb49c1c052fb23a9b909a0f487602459112d1fb41276361752e9bc491e649598')
      })
      it('getAccountBalance', async () => {
        const address = 'TQuDQGdYmzuicmjkWrdpFWXKxpb9P17777';
        const blockHash = '0000000003153ce39bcd0a9832ab6783b629b43d656107bb26f18697095ec073';
        const blockNumber = new BigNumber(51723491);

        const tatum = await getTronRpc(false)
        const accountIdentifier = {
          address:address
        }

        const blockIdentifier: BlockIdentifier = {
          hash: blockHash,
          number: blockNumber
        }
        const { data, status, error } = await tatum.rpc.getAccountBalance(accountIdentifier, blockIdentifier, { visible: true })
        expect(status).toBe(Status.SUCCESS)
        expect(error).toBeUndefined()
        expect(data).toStrictEqual({"balance": 0, "block_identifier": {"hash": "0000000003153ce39bcd0a9832ab6783b629b43d656107bb26f18697095ec073", "number": 51723491}})
      })
    })
  })
})

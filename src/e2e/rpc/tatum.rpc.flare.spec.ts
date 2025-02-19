import { Network } from '../../service'
import { EvmE2eUtils } from './evm.e2e.utils'

//temporarily skipping Flare as RPC's are not available
describe.skip('Flare', () => {
  describe('mainnet', () => {
    EvmE2eUtils.e2e({ network: Network.FLARE, chainId: 14 })
  })

  describe.skip('songbird', () => {
    EvmE2eUtils.e2e({ network: Network.FLARE_SONGBIRD, chainId: 19 })
  })

  describe('coston', () => {
    EvmE2eUtils.e2e({ network: Network.FLARE_COSTON, chainId: 16 })
  })

  describe('coston 2', () => {
    EvmE2eUtils.e2e({ network: Network.FLARE_COSTON_2, chainId: 114 })
  })
})

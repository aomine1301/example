import { combineReducers } from 'redux'
import { History } from 'history'
import { connectRouter } from 'connected-react-router'
import ripe, { StateRipeInterface } from '../ripe/ripeStateSlice'
import vlan, { StateVlanInterface } from '../vlan/vlanStateSlice'
import workers from '../workers/workersStateSlice'
import { StateWorkersInterface } from '@state/workers/workersStateInterfaces'

export interface AppStateInterface {
  vlan: StateVlanInterface
  ripe: StateRipeInterface
  workers: StateWorkersInterface
}

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    vlan,
    ripe,
    workers,
  })

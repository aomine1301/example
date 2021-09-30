import React from 'react'
import VlanIpAddIconButton from './RipeIpAddIconButton/RipeIpAddIconButton'
import RipeItemEditIconButton from './RipeItemEditIconButton/RipeItemEditIconButton'
import VlanDeleteIconButton from './RipeDeleteIconButton/RipeDeleteIconButton'
import { FormValuesVlanInterface } from '@page/VlanPage/vlanForm/VlanItemForm/VlanItemForm'

interface Props {
  fromValues: FormValuesVlanInterface
  id: string
}

const RipeEditColumn: React.FC<Props> = ({ id, fromValues }: Props) => (
  <>
    <VlanIpAddIconButton id={id} />
    <RipeItemEditIconButton fromValues={fromValues} id={id} />
    <VlanDeleteIconButton id={id} />
  </>
)

export default RipeEditColumn

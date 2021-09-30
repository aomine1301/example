import React from 'react'
import VlanIpAddIconButton from './VlanIpAddIconButton/VlanIpAddIconButton'
import VlanItemEditIconButton from './VlanItemEditIconButton/VlanItemEditIconButton'
import VlanDeleteIconButton from './VlanDeleteIconButton/VlanDeleteIconButton'
import { FormValuesVlanInterface } from '../vlanForm/VlanItemForm/VlanItemForm'

interface Props {
  fromValues: FormValuesVlanInterface
  id: string
}

const VlanEditColumn: React.FC<Props> = ({ id, fromValues }: Props) => (
  <>
    <VlanIpAddIconButton id={id} />
    <VlanItemEditIconButton fromValues={fromValues} id={id} />
    <VlanDeleteIconButton id={id} />
  </>
)

export default VlanEditColumn

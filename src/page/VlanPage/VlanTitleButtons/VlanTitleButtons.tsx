import React, { memo } from 'react'
import SearchIconButton from '@components/iconButtons/SearchIconButton/SearchIconButton'
import VlanItemAddButton from './VlanItemAddButton/VlanItemAddButton'

const VlanTitleButtons = () => {
  return (
    <>
      <SearchIconButton />
      <VlanItemAddButton />
    </>
  )
}

export default memo(VlanTitleButtons)

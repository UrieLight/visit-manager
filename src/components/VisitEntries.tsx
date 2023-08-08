import { useEffect, useRef, useState } from 'react'
import { useTable } from 'react-table'
import { Input } from './Input'
import { BsCheck2Square } from 'react-icons/bs'
import { TbRefresh } from 'react-icons/tb'
import { FaRegEdit } from 'react-icons/fa'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { toast } from 'react-hot-toast'
import cn from 'classnames'
import { motion } from 'framer-motion'

interface Visitor {
  firstName: string,
  lastName: string,
  email: string,
  phone: number,
  adress: {
    country: string,
    town: string
  }
}

// interface Visit {
//   id: string,
//   purpose: string,
//   arrivalDate: Date,
//   departureDate: Date,
//   status: 'Pending' | 'Approved' | 'Rejected',
//   visitor: Visitor
// }
export const VisitEntries = ({visit}) => {

  return (
    <motion.li
      layout
      key={visit.id}
      className={cn(
        'p-5 rounded-xl bg-zinc-900'
      )}
    >
      
      <div className="flex flex-col gap-5">
        <motion.div
          className="flex justify-between gap-5"
          layout
          style={{
            //textDecoration: visit.reason === 'finished' ? 'line-through' : 'none'
          }}
        >
          <div className='text-base font-bold'>{visit.purpose}</div>
          <div className='italic'>{visit.arrivalDate.toISOString().slice(0, -1)}</div>
          
        </motion.div>
        <div
          className='flex justify-between gap-5 text-white'
        >
          <p className='flex items-center gap-1'>
            <BsCheck2Square />
            Approval Pending
          </p>
          
          <p className='flex items-center gap-1'>
            <TbRefresh />
            Approved
          </p>

          <div className='flex items-center gap-2'>
            <p
              className='flex items-center gap-2'
            >
              <FaRegEdit />
              {visit.arrivalDate.toLocaleDateString()}
            </p>

            <p
              className='flex items-center gap-1 text-red-500'
            >
              <RiDeleteBin7Line />
              {visit.departureDate.toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </motion.li>
  )
}

// export default VisitEntries
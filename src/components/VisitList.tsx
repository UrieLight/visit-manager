import { useState, useEffect } from 'react'
// import { VisitEntries } from './VisitEntries'
// import { useVisit } from '../context'
import { SiStarship } from 'react-icons/si'
import { motion } from 'framer-motion'
import cn from 'classnames'

// TODO:: A placer dans un contexte
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

interface Visit {
  id: string,
  purpose: string,
  arrivalDate: Date,
  departureDate: Date,
  status: 'Pending' | 'Approved' | 'Rejected',
  visitor: Visitor
}

const getDataFromLocalStorage = () => {
  const storedVisits = localStorage.getItem('visits');
  if(storedVisits)
    return JSON.parse(storedVisits)
  else
    return []
}

console.log(`1- localstorage : ${localStorage.getItem("visits")}`)

export const VisitList = () => {
  // const { visits } = useVisit()
  const [visits, setVisits] = useState<Visit[]>(getDataFromLocalStorage())
  console.log(`visitList rerendering ${visits}`)

  if (!visits.length) {
    return(
      <div className='max-w-lg px-5 m-auto'>
        <h1 className="flex flex-col items-center gap-5 
                        px-5 py-10 
                        text-xl font-bold text-center 
                        rounded-xl bg-zinc-900">
          <SiStarship className="text-5xl" />
            No visit yet !
        </h1>
      </div>
    )
  }

  return (
    <motion.ul className="grid max-w-xl gap-2 px-5 m-auto">
      {visits.map(visit => (
        <motion.li
        layout
        key={visit.id}
        className={cn(
          'w-full max-w-lg p-5 rounded-xl bg-zinc-900'
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
            <div className='italic'>{visit.purpose}</div>
            {/* {visit.arrivalDate.toLocaleDateString()} */}
            
          </motion.div>
          <div
            className='flex justify-between gap-5 text-white'
          >
            <p className='flex items-center gap-1'>
              Approval Pending
            </p>
            
            <p className='flex items-center gap-1'>
              Approved
            </p>
  
            <div className='flex items-center gap-2'>
              <p
                className='flex items-center gap-2'
              >
                {/* {visit.arrivalDate.toLocaleDateString()} */}
              </p>
  
              <p
                className='flex items-center gap-1 text-red-500'
              >
                {/* {visit.departureDate.toLocaleDateString()} */}
              </p>
            </div>
          </div>
        </div>
      </motion.li>
      ))}
    </motion.ul>
  )
}
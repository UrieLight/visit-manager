import { useState } from 'react'
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


export const VisitList = () => {
  // const { visits } = useVisit()
  const [visits] = useState<Visit[]>(getDataFromLocalStorage())
  console.log(`visitList date ${visits}`)

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
    <motion.div className="grid gap-2 px-5 m-auto">
      <table>
        <thead className={cn('w-full p-5')}>
          <tr>
            <th>First Name </th>
            <th>Last Name</th>
            <th>Country</th>
            <th>Visit Purpose</th>
            <th>Begining Date time</th>
            <th>Ending Date time</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((visit) => (
            <motion.tr
              layout
              key={visit.id}
              className={cn(
                'w-full items-center px-15 rounded-xl bg-zinc-900'
              )}
            >  
              <td className='text-center'>{visit.visitor.firstName}</td>
              <td className='text-center'>{visit.visitor.lastName}</td>
              <td className='text-center'>{visit.visitor.adress.country}</td>
              <td className='text-center'>{visit.purpose}</td>
              <td className='text-center'>{visit.arrivalDate.toString().split('T')[0]}</td>
              <td className='text-center'>{visit.departureDate.toString().split('T')[0]}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>     
    </motion.div>
  )
}
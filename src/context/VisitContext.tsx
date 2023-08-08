import React, { createContext, useState } from 'react'
import { nanoid } from 'nanoid'
import { useLocalStorage } from 'usehooks-ts'

//Specifying the structure of the properties expected in the VisitContext
interface VisitContextProps {
  visits: Visit[]
  addVisit: (visitor: string, reason: string) => void
  deleteVisit: (id: string) => void
  editVisit: (id: string, visitor: string, reason: string) => void
  updateVisitStatus: (id: string) => void
}

export interface Visit {
  id: string
  visitor: string
  reason: string
  status: 'ongoing' | 'finished'
}

export const VisitContext = createContext<VisitContextProps | undefined>(undefined)

export const VisitProvider = (props: { children: React.ReactNode }) => {
  const [visits, setVisits] = useState<Visit[]>([])

  // ::: ADD NEW VISIT :::
  const addVisit = (visitor: string, reason: string) => {
    const newVisit: Visit = {
      id: nanoid(),
      visitor,
      reason,
      status: 'ongoing'
    }
    setVisits([...visits, newVisit])
  }

  // ::: DELETE VISIT :::
  const deleteVisit = (id: string) => {
    setVisits(visits.filter(visit => visit.id !== id))
  }

  // ::: EDIT VISIT :::
  const editVisit = (id: string, newVisitor: string, newReason: string) => {
    setVisits(prevVisits => {
      return prevVisits.map(visit => {
        if(visit.id === id){
          return {...visit, visitor: newVisitor, reason: newReason}
        }
        return visit
      })
    })
  }

  // ::: UPDATE VISIT STATUS :::
  const updateVisitStatus = (id: string) => {
    setVisits(prevVisits => {
        return prevVisits.map(visit => {
        if(visit.id === id){
          return {
            ...visit, 
            status: visit.status === 'ongoing' ? 'finished' : 'ongoing'
          }
        }
        return visit
      })
    })
  }

  const value: VisitContextProps = {
    visits,
    addVisit,
    editVisit,
    deleteVisit,
    updateVisitStatus,
  }

  return (
    <VisitContext.Provider value={value}>
      {props.children}
    </VisitContext.Provider>
  )
}

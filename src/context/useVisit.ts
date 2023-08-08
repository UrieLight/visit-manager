import { useContext } from 'react'
import { VisitContext } from './VisitContext'

export const useVisit = () => {
  const context = useContext(VisitContext)
  
  if(!context){
    throw new Error('useVisit must be used within a VisitProvider')
  }

  return context
}
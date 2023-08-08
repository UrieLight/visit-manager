// import { Visit } from '../context/VisitContext'
import { useEffect, useRef, useState } from 'react'
import { useVisit } from '../context'
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

interface Visit {
  id: string,
  purpose: string,
  arrivalDate: Date,
  departureDate: Date,
  visitor: Visitor
}

export const VisitItem = (props: { visit: Visit }) => {
  const { visit } = props

  const [editingVisitor, setEditingVisitor] = useState<string>('')
  const [editingReason, setEditingReason] = useState<string>('')
  const [editingVisitId, setEditingVisitId] = useState<string | null>(null)

  const {deleteVisit, editVisit, updateVisitStatus} = useVisit()

  const editVisitorInputRef = useRef<HTMLInputElement>(null)
  const editReasonInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if(editingVisitId !== null && editVisitorInputRef.current){
      editVisitorInputRef.current.focus()
    }
  }, 
  [editingVisitId])

  const handleEdit = (visitId: string, visitor: string, visitReason: string) => {
    setEditingVisitId(visitId)
    setEditingVisitor(visitor)
    setEditingReason(visitReason)
  }

  const handleUpdate = (visitId: string) => {
    if(editingVisitor.trim() !== '' && editingReason.trim() !== ''){
      editVisit(visitId, editingVisitor, editingReason)
      setEditingVisitId(null)
      setEditingVisitor('')
      setEditingReason('')
      toast.success('Visit details updated successfully')
    }else{
      toast.error('Visitor nor visit reason cannot be empty')
    }
  }

  const handleDelete = (visitId: string) => {
    deleteVisit(visitId)
    toast.success('Visit deleted successfully')
  }

  const handleStatusUpdate = (visitId: string) => {
    updateVisitStatus(visitId)
  }

  return (
    <motion.li
      layout
      key={visit.id}
      className={cn(
        'p-5 rounded-xl bg-zinc-900',
        //visit.status === 'finished' && 'bg-opacity-50 text-zinc-500'
      )}
    >
      {editingVisitId === visit.id ? (
          <motion.div
            layout
            className='flex gap-2'
          >
            <Input 
              ref={editVisitorInputRef}
              type='text'
              value={editingVisitor}
              onChange={e => setEditingVisitor(e.target.value)}
            />

            <Input 
              ref={editReasonInputRef}
              type='text'
              value={editingReason}
              onChange={e => setEditingReason(e.target.value)}
            />

            <button
              className=''
              onClick={() => handleUpdate(visit.id)}
            >
              Update
            </button>
          </motion.div>
        
        ) : (
          <div className="flex flex-col gap-5">
            <motion.div
              className="flex justify-between gap-5"
              layout
              style={{
                //textDecoration: visit.reason === 'finished' ? 'line-through' : 'none'
              }}
            >

                <div className='text-base font-bold'>{visit.purpose}</div>
                <div  className='italic'>{visit.reason}</div>
              
            </motion.div>
            <div
              className='flex justify-between gap-5 text-white'
            >
              <button onClick={() => handleStatusUpdate(visit.id)}>
                {visit.status == 'ongoing' ? (
                  <span className='flex items-center gap-1'>
                    <BsCheck2Square />
                    Mark Finished
                  </span>
                ) : (
                  <span className='flex items-center gap-1'>
                    <TbRefresh />
                    Mark Ongoing
                  </span>
                )}
              </button>
              <div className='flex items-center gap-2'>
                <button
                  className='flex items-center gap-2'
                  onClick={() => handleEdit(visit.id, visit.visitor, visit.reason)}
                >
                  <FaRegEdit />
                  Edit
                </button>

                <button
                  className='flex items-center gap-1 text-red-500'
                  onClick={() => handleDelete(visit.id)}
                >
                  <RiDeleteBin7Line />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      }
    </motion.li>
  )
}
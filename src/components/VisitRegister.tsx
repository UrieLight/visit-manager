import React, { useEffect, useRef, useState } from 'react'
import { nanoid } from 'nanoid'
import { toast } from 'react-hot-toast'
// import { useVisit } from '../context'
import { Input } from './Input'

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

console.log(`1- localstorage : ${localStorage.getItem("visits")}`)

export const VisitRegister = () => {
  console.log(`2- localstorage : ${localStorage.getItem("visits")}`)

  const [visitor, setVisitor] = useState<Visitor>({
    firstName: '',
    lastName: '',
    email: '',
    phone: 6,
    adress: {
      country: '',
      town: ''
    }
  })

  const [visit, setVisit] = useState<Visit>({
    id: nanoid(),
    purpose: '',
    arrivalDate: new Date(),
    departureDate: new Date(),
    status: 'Pending',
    visitor: visitor
  })

  const [visits, setVisits] = useState<Visit[]>([])

  // :: INPUTs REFs ::
    const firstNameInputRef = useRef<HTMLInputElement>(null)
    const lastNameInputRef = useRef<HTMLInputElement>(null)
    const emailInputRef = useRef<HTMLInputElement>(null)
    const phoneInputRef = useRef<HTMLInputElement>(null)
    const countryInputRef = useRef<HTMLInputElement>(null)
    const townInputRef = useRef<HTMLInputElement>(null)
    const visitPurposeInputRef = useRef<HTMLInputElement>(null)
    const arrivalDateInputRef = useRef<HTMLInputElement>(null)
    const departureDateInputRef = useRef<HTMLInputElement>(null)
    
  // const { addVisit } = useVisit()

  useEffect(() => {
    if(firstNameInputRef.current){
      firstNameInputRef.current.focus()
    }
  }, [])

  const handleVisitorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setVisitor({...visitor, [e.target.name]: e.target.value.trim()})
    setVisit({...visit, visitor})
  }

  const handleVisitorAdressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setVisitor({...visitor, adress: {...visitor.adress, [e.target.name]: e.target.value.trim()}})
    setVisit({...visit, visitor})
  }

  const handleVisitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setVisit({...visit, [e.target.name]: e.target.value})
  }

  const handleVisitDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setVisit({...visit, [e.target.name]: new Date(e.target.value)})
  }

  const handleSubmission = (e: React.FormEvent) => {
    e.preventDefault()
    if(visit){
      
      setVisits([...visits, visit])

      setVisitor({
        firstName: '',
        lastName: '',
        email: '',
        phone: 6,
        adress: {
          country: '',
          town: ''
        }
      })

      setVisit({
        id: nanoid(),
        purpose: '',
        arrivalDate: new Date(),
        departureDate: new Date(),
        status: 'Pending',
        visitor: visitor
      })
      toast.success('Visit added successfully!')
    }else
      toast.error('Visitor nor Visit information cannot be empty!')
  }

  
  useEffect(() => {
      localStorage.setItem("visits", JSON.stringify(visits))
  }, [visits])

  return (
    <div className='w-full max-w-xl
                    flex flex-col items-start gap-3
                    p-1 m-auto'>
      <form  onSubmit={handleSubmission}>
        <div className='flex items-start justify-between gap-2
                      pb-3 m-auto'>
          <label>First Name
          <Input required name="firstName" ref={firstNameInputRef} type="text" value={visitor.firstName} placeholder='First Name'
            onChange={handleVisitorChange}
            className='w-full
              px-5 py-2
              bg-transparent
              border-2 outline-none border-zinc-600 rounded-xl
              placeholder:text-zinc-500
              focus:border-white'
          /></label>
          <label>Last Name
          <Input required name="lastName" ref={lastNameInputRef} type="text" value={visitor.lastName} placeholder='Last Name'
            onChange={handleVisitorChange}
            className='w-full
              px-5 py-2
              bg-transparent
              border-2 outline-none border-zinc-600 rounded-xl
              placeholder:text-zinc-500
              focus:border-white'
          /></label>
        </div>

        <div className='w-full
              pb-3'>
          <label>Email
          <Input required name="email" ref={emailInputRef} type="email" value={visitor.email} placeholder='email'
            onChange={handleVisitorChange}
            className='w-full
              px-5 py-2
              bg-transparent
              border-2 outline-none border-zinc-600 rounded-xl
              placeholder:text-zinc-500
              focus:border-white'
          /></label>
        </div>

        <div className='w-full
              pb-3'>
          <label>Phone
          <Input required name="phone" ref={phoneInputRef} type="phone" value={visitor.phone} placeholder='phone'
            onChange={handleVisitorChange}
            className='w-full
              px-5 py-2
              bg-transparent
              border-2 outline-none border-zinc-600 rounded-xl
              placeholder:text-zinc-500
              focus:border-white'
          /></label>
        </div>

        <div className='flex items-start justify-between gap-2
                      pb-3 m-auto'>
          <label>Country
          <Input required name="country" ref={countryInputRef} type="text" value={visitor.adress.country} placeholder='Country'
            onChange={handleVisitorAdressChange}
            className='w-full
              px-5 py-2
              bg-transparent
              border-2 outline-none border-zinc-600 rounded-xl
              placeholder:text-zinc-500
              focus:border-white'
          /></label>

          <label>Town
          <Input required name="town" ref={townInputRef} type="text" value={visitor.adress.town} placeholder='Town'
            onChange={handleVisitorAdressChange}
            className='w-full
              px-5 py-2
              bg-transparent
              border-2 outline-none border-zinc-600 rounded-xl
              placeholder:text-zinc-500
              focus:border-white'
          /></label>
        </div>

        <div className='w-full
              pb-3'>
          <label>Visit purpose
          <Input required name="purpose" ref={visitPurposeInputRef} type="textarea" value={visit.purpose} placeholder='Visit purpose'
            onChange={handleVisitChange}
            className='w-full
              px-5 py-2
              bg-transparent
              border-2 outline-none border-zinc-600 rounded-xl
              placeholder:text-zinc-500
              focus:border-white'
          /></label>
        </div>

        <div className='flex items-start justify-between gap-2
                      pb-3 m-auto'>
          <label>Arrival Date
          <Input required name="arrivalDate" step="any" ref={arrivalDateInputRef} type="datetime-local" value={visit.arrivalDate.toISOString().slice(0, -1)} placeholder='Arrival date'
            onChange={handleVisitDateChange}
            className='w-full
              px-5 py-2
              bg-transparent
              border-2 outline-none border-zinc-600 rounded-xl
              placeholder:text-zinc-500
              focus:border-white'
          /></label>

          <label>Departure Date
          <Input required name="departureDate" ref={departureDateInputRef} type="datetime-local" value={visit.departureDate.toISOString().slice(0, -1)} placeholder='Departure date'
            onChange={handleVisitDateChange}
            className='w-full
              px-5 py-2
              bg-transparent
              border-2 outline-none border-zinc-600 rounded-xl
              placeholder:text-zinc-500
              focus:border-white'
          /></label>
        </div>

        <div>
          <button type="submit"
            className='
              px-5 py-2
              text-sm font-normal text-blue-300
              bg-blue-900
              border-2 border-blue-900 rounded-xl
              active:scale-95'
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

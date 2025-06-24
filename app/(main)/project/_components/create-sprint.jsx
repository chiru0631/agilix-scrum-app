"use client";
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { addDays, format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { sprintSchema } from '@/app/lib/validators';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Chevron, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Import DayPicker styles
import useFetch from '@/hooks/use-fetch';



const SprintCreationForm = ({
    projectTitle,
    projectId,
    projectKey,
    sprintkey
}) => {
  const [showForm, setShowForm] = useState(false);

  const [dateRange,setDateRange]=useState({
    from: new Date(),
    to: addDays(new Date(), 30),
  })

  const {register, handleSubmit, formState:{errors},control} =useForm({
    resolver: zodResolver(sprintSchema),
    defaultValues:{
      name: `${projectKey}-${sprintkey}`,
      startDate: dateRange.from,
      endDate: dateRange.to,
    },
  });

  

  return <>
  <div className='flex justify-between'>
    <h1 className='text-5xl font-bold mb-8 bg-gradient-to-br from-blue-500 via-blue-100 to from-blue-400 bg-clip-text text-transparent'>{projectTitle}</h1>
    <Button className="mt-2" onClick={()=> setShowForm(!showForm)} variant={showForm?"destructive":"default"} >

      {showForm?"Cancel":"Create New Sprint"}
    </Button>
  </div>{showForm  && <Card className='pt-4 mb-4'>
    <CardContent>
      <form className='flex gap-4 items-end'>
        <div className='flex-1'>
          <label htmlFor="name"
          className='block text-sm font-medium mb-1'>Sprint Name</label>
          <Input
          id="name"
          readOnly
          className="bg-slate-950"
          {...register("name")}
          />
          <p className='text-red-500 text-sm'>{errors.name?.message}</p>
        </div>

        <div  className='flex-1'>
          <label className='block text-sm font-medium mb-1'>Sprint Duration

          </label>
          <Controller
          control={control}
          name="daterange"
          render={({field})=>{
            return<Popover>
              <PopoverTrigger  asChild>
                <Button variant='outline'
                className={`w-full justify-start text-left font-normal bg-slate-950
                ${!dateRange && "text-muted-foreground"}`}>
                  <CalendarIcon className='mr-2 h-4 w-4'/>
                  {dateRange.from && dateRange.to ? (
  format(dateRange.from, "LLL dd,y") + " - " + format(dateRange.to, "LLL dd,y")
) : (
  <span>Pick a date</span>
)}
                </Button>
              </PopoverTrigger>
              <PopoverContent
              className="w-auto bg-slate-900"
              align='start'>

                <DayPicker
                mode='range'
                selected={dateRange}
                onSelect={(range) => {
                  if(range.from && range.to) {
                    setDateRange(range);
                    field.onChange(range);
                  }
                }}
                classNames={{
            chevron: "fill-blue-500",
            range_start: "bg-blue-700",
            range_end: "bg-blue-700",
            range_middle: "bg-blue-400",
            day_button: "border-none",
            today: "border-2 border-blue-700 ",
          }}
                />
              </PopoverContent>
            </Popover>
          }}
          
          />
        </div>
        <Button>
          Create Sprint
        </Button>


      </form>
    </CardContent>
    </Card>}
  </>
}

export default SprintCreationForm;

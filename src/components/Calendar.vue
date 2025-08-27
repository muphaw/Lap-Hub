<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone, parseDate, today } from "@internationalized/date"
import { CalendarIcon } from "lucide-vue-next"
import { toDate } from "reka-ui/date"
import { computed } from "vue"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// vee-validate hooks
import { useForm } from 'vee-validate'

const df = new DateFormatter("en-US", {
  dateStyle: "long",
})

// Use the form context or directly useField for 'projectDate'
const { values, setFieldValue, errors } = useForm() // Or just useField('projectDate')

const fieldName = 'projectDate'

// computed to convert values.projectDate string to CalendarDate and back
const calendarDate = computed({
  get: () => values[fieldName] ? parseDate(values[fieldName]) : undefined,
  set: (val) => {
    if (val) {
      setFieldValue(fieldName, val.toString())
    } else {
      setFieldValue(fieldName, '')
    }
  }
})
</script>

<template>
  <FormField :name="fieldName">
    <FormItem class="flex flex-col">
      <FormLabel class="text-xl">Project Date</FormLabel>
      <Popover>
        <PopoverTrigger as-child>
          <FormControl>
            <Button
              variant="outline"
              :class="[
                'w-full ps-3 text-start font-normal shadow-[4px_4px_0px_black] border-2 border-black bg-input hover:bg-yellow-100 text-black',
                !calendarDate && 'text-muted-foreground'
              ]"
            >
              <span class="text-black">
                {{ calendarDate ? df.format(toDate(calendarDate)) : "Pick a date" }}
              </span>
              <CalendarIcon class="ms-auto h-4 w-4 " />
            </Button>
            <input hidden />
          </FormControl>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0 bg-input">
          <Calendar
            v-model="calendarDate"
            calendar-label="Project Date"
            initial-focus
            :min-value="new CalendarDate(1900, 1, 1)"
            :max-value="today(getLocalTimeZone())"
          />
        </PopoverContent>
      </Popover>
      <FormMessage>{{ errors[fieldName] }}</FormMessage>
    </FormItem>
  </FormField>
</template>

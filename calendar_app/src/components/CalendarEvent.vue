<template>
  <div id="calendar-event">
    <div class="day-event" :style="getEventBackgroundColor">
      <div>
        <div v-if="event.edit">
          <input
            type="text"
            :placeholder="event.details"
            v-model="newEventDetails">
          <div class="has-text-centered icons">
            <i
              class="fa fa-check"
              @click="updateEvent(day.id, event.details, newEventDetails)">
            </i>
          </div>
        </div>
        <div v-else>
          <span class="has-text-centered details">
            {{ event.details }}
          </span>
          <div class="has-text-centered icons">
            <i
              class="fa fa-pencil-square edit-icon"
              @click="editEvent(day.id, event.details)">
            </i>
            <i
              class="fa fa-trash-o delete-icon"
              @click="deleteEvent(day.id, event.details)">
            </i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { store } from "../store.js";

export default {
  name: "CalendarEvent",
  props: ["day", "event"],
  data() {
    return {
      newEventDetails: ""
    }
  },
  methods: {
    editEvent(dayId, eventDetails) {
      store.editEvent(dayId, eventDetails)
    },
    updateEvent(dayId, originalEventDetails, updateEventDetails) {
      if (updateEventDetails === "") {
        store.updateEvent(dayId, originalEventDetails, originalEventDetails);
      } else {
        store.updateEvent(dayId, originalEventDetails, updateEventDetails);
      }
      this.newEventDetails = "";
    },
    deleteEvent(dayId, eventDetails) {
      store.deleteEvent(dayId, eventDetails)
    }
  },
  computed: {
    getEventBackgroundColor() {
      const colors = ['#FF9999', '#85D6FF', '#99FF99'];
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      return `background-color: ${randomColor}`
    }
  }
}
</script>

<style>
.day-event {
  margin-top: 6px;
  margin-bottom: 6px;
  display: block;
  color: #4C4C4C;
  padding: 5px;
}

.day-event .details {
  display: block;
}

.day-event .icons .fa {
  padding: 0 2px;
}
</style>

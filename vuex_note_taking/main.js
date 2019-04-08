// Defining state, mutations, actions and getters for Vuex

const state = {
  notes: [],
  timestamps: []
}

// Warning: mutations have to be synchronous
const mutations = {
  ADD_NOTE(state, payload) {
    const newNote = payload;
    state.notes.push(newNote);
  },
  ADD_TIMESTAMP(state, payload) {
    const newTimeStamp = payload;
    state.timestamps.push(newTimeStamp);
  }
}

const actions = {
  addNote(context, payload) {
    context.commit("ADD_NOTE", payload);
  },
  addTimestamp(context, payload) {
    context.commit("ADD_TIMESTAMP", payload);
  }
}

const getters = {
  getNotes:      state => state.notes,
  getTimeStamps: state => state.timestamps,
  getNoteCount:  state => state.notes.length
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// Defining components

const inputComponent = {
  template: `
  <input
    placeholder="Enter a note"
    v-model="input"
    @keyup.enter="monitorEnterKey"
    class="input"
    type="text"
  />`,
  data() {
    return {
      input: ""
    }
  },
  methods: {
    monitorEnterKey() {
      this.$store.dispatch("addNote", this.input);
      this.$store.dispatch("addTimestamp", new Date().toLocaleString());
      this.input = "";
    }
  }
}

const noteCountComponent = {
  template: `
    <div class="note-count">
      Note count: <strong>{{ noteCount }}</strong>
    </div>
  `,
  computed: {
    noteCount() {
      return this.$store.getters.getNoteCount;
    }
  }
}

new Vue({
  el: "#app",
  store,
  computed: {
    notes() {
      return this.$store.getters.getNotes;
    },
    timestamps() {
      return this.$store.getters.getTimeStamps;
    }
  },
  components: {
    "input-component": inputComponent,
    "note-count-component": noteCountComponent
  }
})

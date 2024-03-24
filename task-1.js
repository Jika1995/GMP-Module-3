class MyEventEmitter {
  constructor() {
    this._events = {};
  }

  on(name, listener) {
    if (!this._events[name]) {
      this._events[name] = [];
    }

    this._events[name].push(listener)
  };

  // off(name, callback) {
  //   if(!this._events[name]) {
  //     throw new Error (`Can't off a listener. Event "${name}" doesn't exists`);
  //   };

  //   const callbacks = this._events.get(event).filter(cb => cb !== callback);
  //   this._events[name] = 
  // }

  removeListener(name, listenerToRemove) {
    if (!this._events[name]) {
      throw new Error(`Can't remove a listener. Event "${name}" doesn't exists`);
    }

    const filterListeners = (listener) => listener !== listenerToRemove;

    this._events[name] = this._events[name].filter(filterListeners);
  }

  emit(name, data) {
    if (!this._events[name]) {
      throw new Error(`Can't emit a listener. Event "${name}" doesn't exists`);
    }

    const fireCallbacks = (callback) => {
      callback(data);
    }
    this._events[name].forEach(fireCallbacks);
  }
}




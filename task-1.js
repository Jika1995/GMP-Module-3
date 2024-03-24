class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  addListener(eventName, listenerFuncToAdd) {

    if (typeof listenerFuncToAdd !== 'function') {
      throw new Error('listener to add needs to be a function');
    };

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    };

    this.listeners[eventName].push(listenerFuncToAdd);
  };

  removeListener(eventName, listenerFuncToRemove) {

    if (!this.listeners[eventName]) {
      throw new Error(`Can't remove a listener. Event "${eventName}" doesn't exists`);
    };

    const filterListeners = (listener) => listener !== listenerFuncToRemove;

    this.listeners[eventName] = this.listeners[eventName].filter(filterListeners);
  };

  on(eventName, listenerFunc) {
    this.addListener(eventName, listenerFunc);
  };

  off(eventName, listenerFunc) {
    this.removeListener(eventName, listenerFunc);
  };

  once(eventName, listenerFunc) {
    const wrappedListenerFunc = () => {
      listenerFunc();
      this.removeListener(eventName, listenerFunc);
    }; //обертка, чтобы вызывалась один раз

    this.on(eventName, wrappedListenerFunc);
  };

  emit(eventName, data) {
    if (!this.listeners[eventName]) {
      throw new Error(`Can't emit a listener. Event "${eventName}" doesn't exists`);
    };

    this.listeners[eventName].forEach(func => func.call(null, data)); //this это null, чтобы не падал объект(класс)
  };

  listenerCount(eventName) {
    let listeners = this.listeners[eventName] || [];

    return listeners.length;
  };

  rawListeners(eventName) {
    return this.listeners[eventName];
  };

  emit(name, data) {
    if (!this.listeners[name]) {
      throw new Error(`Can't emit a listener. Event "${name}" doesn't exists`);
    }

    // const fireCallbacks = (callback) => {
    //   callback(data);
    // };

    this.listeners[name].forEach(func => {
      func(data);
    });
  }
}

const myEmitter = new MyEventEmitter();

function c1() {
  console.log('an event occurred!');
}

function c2() {
  console.log('yet another event occurred!');
}

myEmitter.on('eventOne', c1); // Register for eventOne
myEmitter.on('eventOne', c2); // Register for eventOne

// Register eventOnce for one time execution
myEmitter.once('eventOnce', () => console.log('eventOnce once fired'));
myEmitter.once('init', () => console.log('init once fired'));

// Register for 'status' event with parameters
myEmitter.on('status', (code, msg) => console.log(`Got ${code} and ${msg}`));


myEmitter.emit('eventOne');

// Emit 'eventOnce' -> After this the eventOnce will be
// removed/unregistered automatically
myEmitter.emit('eventOnce');


myEmitter.emit('eventOne');
myEmitter.emit('init');
myEmitter.emit('init'); // Will not be fired
myEmitter.emit('eventOne');
myEmitter.emit('status', 200, 'ok');

// Get listener's count
console.log(myEmitter.listenerCount('eventOne'));

// Get array of rawListeners//
// Event registered with 'once()' will not be available here after the
// emit has been called
console.log(myEmitter.rawListeners('eventOne'));

// Get listener's count after remove one or all listeners of 'eventOne'
myEmitter.off('eventOne', c1);
console.log(myEmitter.listenerCount('eventOne'));
myEmitter.off('eventOne', c2);
console.log(myEmitter.listenerCount('eventOne'));



# Async action creator (`async-action-creator`)
[![Build Status](https://travis-ci.org/goncy/async-action-creator.svg?branch=master)](https://travis-ci.org/goncy/async-action-creator)
[![Coverage Status](https://coveralls.io/repos/github/goncy/async-action-creator/badge.svg?branch=master)](https://coveralls.io/github/goncy/async-action-creator?branch=master)

Async actions with steroids for Redux or whatever you want.


## What
Action creator is a library that helps with handling async actions on redux or similar implementations, giving a couple of methods for dispatching async actions and handling actions status, errors, and responses in a separated reducers so you don't need to hesitate creating a reducer for that.


## How
```js
// Creating an action
import {createAction} from 'async-action-creator'
const myAction = createAction('MY_ACTION')

// Mounting the reducer
import {REDUCER_NAME, reducer} from 'async-action-creator'
const rootReducer = combineReducers({
    // All of your reducers
    [REDUCER_NAME]: reducer // Naming is important
})

// Creating the services
export default {
  [myAction.TYPE]: {
    uri: "https://api.chucknorris.io/jokes/random",
    method: "GET",
    selector: response => response.value,
  },
};

// Adding the middleware
import {middleware} from 'async-action-creator'

...
createStore(
  rootReducer,
  applyMiddleware(middleware(services))
)
...

// Middleware in action
dispatch(myAction.run())

// Actions automatically dispatched:
{type: 'MY_ACTION'}
{type: 'MY_ACTION_STARTED'}
{type: 'MY_ACTION_RESOLVED', payload: "Jean-Claude Van Damme once attempted to throw a Chuck Norris Roundhouse Kick. He was immediately arrested for fraud."}

// Dispatching async actions manually
const mapDispatchToProps = {
    run: myAction.run, // run({foo: 'bar'}) -> {type: MY_ACTION, payload: {foo: 'bar'}}
    start: myAction.start, // start({foo: 'bar'}) -> {type: MY_ACTION_STARTED, payload: {foo: 'bar'}}
    cancel: myAction.cancel, // cancel({foo: 'bar'}) -> {type: MY_ACTION_CANCELED, payload: {foo: 'bar'}}
    resolve: myAction.resolve, // resolve({foo: 'bar'}) -> {type: MY_ACTION_RESOLVED, payload: {foo: 'bar'}}
    reject: myAction.reject // reject({foo: 'bar'}) -> {type: MY_ACTION_REJECTED, payload: {foo: 'bar'}}
}

// Getting action status, error and response
// Using this with this `myAction.resolve({foo: 'bar'})` as the last action dispatched
const mapStateToProps = state => ({
    status: myAction.getStatus(state), // => 'resolved'
    error: myAction.getError(state), // => undefined
    response: myAction.getResponse(state) // => {foo: 'bar'}
)}

// Using actions in reducers
switch (type) {
    case myAction.TYPE: // => 'MY_ACTION'
        return {
            ...state,
            hello: 'me'
        }
    case myAction.STARTED: // => 'MY_ACTION_STARTED'
        return {
            ...state,
            hello: 'cat'
        }
    case myAction.RESOLVED: // => 'MY_ACTION_RESOLVED'
        return {
            ...state,
            hello: 'dog'
        }
    case myAction.CANCELED: // => 'MY_ACTION_CANCELED'
        return {
            ...state,
            hello: 'woof'
        }
    case myAction.REJECTED: // => 'MY_ACTION_REJECTED'
        return {
            ...state,
            hello: 'dodo'
        }
    default:
      return state
}
```


## Why
Sometimes you need an action status and you had to create a new reducer just for that, also, this reduces the boilerplate of creating a lot of actions for all your async actions.


## Installation
```sh
yarn add async-action-creator
// or
npm install --save async-action-creator
```


## Tests
```sh
// jest tests
yarn test
// jest coverage
yarn cover
```


## Contributors
Simply create a pull request :)
* Code style: **Standard**
* **FlowType** used


## Thanks
This project is based on the idea of [make-action-creator](https://github.com/ajchambeaud/make-action-creator) by [@ajchambeaud](https://github.com/ajchambeaud), and the `getStatus` and `getError` implementations to the same library from [@pablen](https://github.com/pablen).


## License
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

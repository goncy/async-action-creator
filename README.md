# Async action creator (`async-action-creator`)
[![Build Status](https://travis-ci.org/goncy/async-action-creator.svg?branch=master)](https://travis-ci.org/goncy/async-action-creator)
[![Coverage Status](https://coveralls.io/repos/github/goncy/async-action-creator/badge.svg?branch=master)](https://coveralls.io/github/goncy/action-creator?branch=master)

Async actions with steroids for Redux or whatever you want.


## What
Action creator is a library that helps with handling async actions on redux or similar implementations, giving a couple of methods for dispatching async actions and handling actions status, errors, and responses in a separated reducers so you don't need to hesitate creating a reducer for that.


## How
```js
// Creating an action
import {makeAction} from 'async-action-creator'
const myAction = makeAction('MY_ACTION')

// Mounting the reducer
import {reducer as async} from 'async-action-creator'
const rootReducer = combineReducers({
    // All of your reducers
    async // Naming is important
})

// Dispatching async actions
const mapDispatchToProps = {
    run: myAction.run, // run({foo: 'bar'}) -> {type: MY_ACTION, payload: {foo: 'bar'}}
    start: myAction.start, // start({foo: 'bar'}) -> {type: MY_ACTION_START, payload: {foo: 'bar'}}
    success: myAction.success, // success({foo: 'bar'}) -> {type: MY_ACTION_SUCCESS, payload: {foo: 'bar'}}
    failure: myAction.failure // failure({foo: 'bar'}) -> {type: MY_ACTION_FAILURE, payload: {foo: 'bar'}}
}

// Getting action status, error and response
// Using this with this `myAction.success({foo: 'bar'})` as the last action dispatched
const mapStateToProps = state => ({
    status: myAction.getStatus(state), // => 'success'
    error: myAction.getError(state), // => null
    response: myAction.getResponse(state) // => {foo: 'bar'}
)}

// Using actions in reducers
switch (type) {
    case myAction.type: // => 'MY_ACTION'
        return {
            ...state,
            hello: 'me'
        }
    case myAction.START: // => 'MY_ACTION_START'
        return {
            ...state,
            hello: 'cat'
        }
    case myAction.SUCCESS: // => 'MY_ACTIO_SUCCESS'
        return {
            ...state,
            hello: 'dog'
        }
    case myAction.FAILURE: // => 'MY_ACTION_FAILURE'
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

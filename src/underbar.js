(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val; 
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.\\

  //input: array and number of elements [1, 2, 3], 2
  //output: last element if n is undefined
  //output: array of last n elements  [2, 3]
  //use for loop to iterate backwards 

  _.last = function(array, n) {
    var result = [];
    if (n === undefined) {
      return array[array.length - 1];
    }
    if (n > array.length) {
      return array;
    }
    for (var i = array.length - n; i < array.length; i++) {
      result.push(array[i]);
    }
    return result; 
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  //input: collection and iterator 
  //output: no output 
  //if Array: iterator(element, index, array)
  //if Object: iterator(value, key, obj)
  //use Array.isArray(obj) to check if collection is array 

  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    }
    else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  //input: array and test 
  //output: array
  //iterate through each element of the array; use each method 
  //if test(element), then push to result array 
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(element) {
      if (test(element)) {
        result.push(element);
      }
    })
    return result; 
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var result = [];
    _.each(collection, function(element) {
      if (!test(element)) {
        result.push(element);
      }
    })
    return result;
  };

  // Produce a duplicate-free version of the array.
  //input: array, isSorted === undefined, iterator === undefined; [1, 2, 1, 3, 1, 4]
  //output: array [1, 2, 3, 4]
  //use each method to iterate through input array 
  //use index method and if element does not exist in result array, then store into result array 

  //input: array, isSorted, iterator; [1, 2, 2, 3, 4, 4], true, function(value) { return value === 1; }
  //output: array [1, 2]
  //use each method to iterate through input array
  //take each element and pass into iterator function; true, false, false, false, false, false 
  //store into iteratorResult array
  //use uniq method on iteratorResult and to return result 

  _.uniq = function(array, isSorted, iterator) {
    var result = [];
    var iteratorResult = [];
    if (isSorted === undefined && iterator === undefined) {
      _.each(array, function(element) {
        if (_.indexOf(result, element) === -1) {
          result.push(element);
        }
      })
    }
    else {
      _.each(array, function(element) {
        if (_.indexOf(iteratorResult, iterator(element)) === -1) {
          iteratorResult.push(iterator(element));
          result.push(element);
        };
      })
    }
    return result;
  };


  // Return the results of applying an iterator to each element.

  //input: array, iterator 
  //output: array
  //use each method to access each element of input array
  //pass each element into iterator 
  //store it into results array 
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var result = [];
    _.each(collection, function(element) {
      result.push(iterator(element));
    })
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  //input: array, iterator, accumulator, 
  //output: accumulator  
  //use each method
  //pass accumulator and each number in array into iterator
  //set accumulator as the result of iterator 

  //input: array, iterator, accumulator === undefined
  //output: number
  //set accumulator as first element 
  //use for loop to iterate through input array (start from second element and end at length)
  //pass accumulator and second element into iterator
  //set accumulator as result of itertor 

  _.reduce = function(collection, iterator, accumulator) {
    if (accumulator === undefined) {
      var accumulator = collection[0];
      for (var i = 1; i < collection.length; i++) {
        accumulator = iterator(accumulator, collection[i]);
      }
    }
    else {
      _.each(collection, function(element) {
        accumulator = iterator(accumulator, element);
      })
    }
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) { //[4, 5, 6], 2
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) { //reduce([4, 5, 6], function, false) 
      if (wasFound) { //function(false, 4), function(false, 5)
        return true;
      }
      return item === target; // false, false 
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  //input: array, iterator
  //ouput: boolean
  //use reduce, start with true 
  //if iterator(element) === false, return false 
  _.every = function(collection, iterator) { //[2, 3, 4], function(i%2 === 0)
    // TIP: Try re-using reduce() here.
    if (iterator === undefined) {
      if (_.contains(collection, false)) {
        return false; 
      }
      return true; 
    }
    return _.reduce(collection, function(passed, element) { //reduce([2, 3, 4], function(true, 2), true)
      if (!iterator(element)) {
        return false; 
      }
      return passed;
    }, true)
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  // [true, false, 1], _.identity)
  //iterate through array. pass iterator to each element, if true, then return true. return false if none 
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if (iterator === undefined) {
      if (_.contains(collection, true)) {
        return true; 
      }
      return false; 
    }
    if (collection === []) {
      return false; 
    }
    //every returns true if iterator is true for all element
    //need at least 1 element that passes the iterator to be TRUE
    //element that doesn't pass any of the iterator => false => ! => true => return !true for some function
    //all element passes the iterator => true => ! => false => return !false for some function
    //at least 1 element that passes the iterator [2, 3, 4], find evens => false, true, false => false => return !false for some function
    return !(_.every(collection, function(element) {
      return !iterator(element);
    }));
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //add more key value pairs into obj1 
  //input: obj
  //output: obj
  //like push but for obj 
  //use arguments ({age: 50})
  //use for loop to iterate through arguments 
  //set each key value pair of arguments as object's key value pair
  _.extend = function(obj) {
    for (var i = 0; i < arguments.length; i++) {
      var addObj = arguments[i];
      for (var key in addObj) {
        obj[key] = addObj[key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  //if key in obj already; then obj[key]
  _.defaults = function(obj) {
    for (var i = 0; i < arguments.length; i++) {
      var addObj = arguments[i];
      for (var key in addObj) {
        if (key in obj) {
          obj[key];
        }
        else {
          obj[key] = addObj[key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  //input: function, hashFunction
  //output: function
  //check if result is returned 
  //var add = function(a, b) {return a + b}
  //memoadd = _.memoize(add)
  //invoke memoadd(1, 3) => 4
  _.memoize = function(func) {
    var cache = {};
    return function() {
      var objArg = {};
      _.each(arguments, function(value, key) {
        objArg[key] = value;
      })
      var stringArg = JSON.stringify(objArg); 

      if(cache[stringArg] === undefined) {
        cache[stringArg] = func.apply(this, arguments);
      }
      return cache[stringArg];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms

  //setTimeout(function(){ alert("Hello"); }, 3000);
  //Display an alert box after 3 seconds (3000 milliseconds)

  _.delay = function(func, wait) {
    var arrayArg = Array.prototype.slice.call(arguments, 2); //['a', 'b']
    return setTimeout(function() {
      return func.apply(this, arrayArg); 
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice

  //input: array
  //output: array 
  //start with index of 3 from length of newArr

  //decrease index by 1 
  //get random number (random) by multiplying 2 to 0 - 1 (math.random) => (0, 1, 2)
  //use that random index and to get corresponding value of newArr => value = newArr[random]
  //replace that value with value of newArr[index]
  //do it 3 times 
  _.shuffle = function(array) { //[1, 2, 3]
    var newArr = array.slice(); //[1, 2, 3]
    var index = newArr.length; //3
    var randomIndex = 0;
    var value = 0;
    while (index > 0) {
      index -= 1; //2
      randomIndex = Math.floor(Math.random() * index); //(0, 1, or 2); randomly got 1
      value = newArr[index]; //3
      newArr[index] = newArr[randomIndex]; //change [1, 2, 3] => [1, 2, 2]
      newArr[randomIndex] = value;  
    } 
    return newArr; 
     
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());

import { crawlObject, deepClone, deepFreeze, deletePropPath, getObjectKeysRecursive, layeredAssignment, objFilterKeys, objKeyMap, objKeyValMap, objMap, objMultiplication } from './object'

describe('Object Utils', () => {
  describe('deepClone', () => {
    it('should create a deep clone of an object with nested objects', () => {
      const originalObject = {
        a: {
          b: {
            c: 123,
          },
        },
        x: 456,
      }

      const clonedObject = deepClone(originalObject)

      expect(clonedObject).toEqual(originalObject)
      expect(clonedObject).not.toBe(originalObject) // Check if it's a different instance
    })

    it('should handle empty objects', () => {
      const emptyObject = {}

      const clonedEmptyObject = deepClone(emptyObject)

      expect(clonedEmptyObject).toEqual(emptyObject)
      expect(clonedEmptyObject).not.toBe(emptyObject)
    })

    it('should handle null and undefined', () => {
      const nullObject = null
      const undefinedObject = undefined

      const clonedNull = deepClone(nullObject)
      const clonedUndefined = deepClone(undefinedObject)

      expect(clonedNull).toEqual(nullObject)
      expect(clonedUndefined).toEqual(undefinedObject)
    })

    it('should handle non-object types', () => {
      const number = 42
      const string = 'hello'

      const clonedNumber = deepClone(number)
      const clonedString = deepClone(string)

      expect(clonedNumber).toEqual(number)
      expect(clonedString).toEqual(string)
    })
  })

  describe('deepFreeze', () => {
    it('should deep freeze an object with nested objects up to the specified layers', () => {
      const originalObject = {
        a: {
          // 1
          b: {
            // 2
            c: {
              // 3
              d: 1,
            },
          },
        },
        x: 456,
      }

      const deepFrozenObject = deepFreeze(originalObject, 2)

      // Verify that the object is frozen
      expect(Object.isFrozen(deepFrozenObject)).toBeTruthy()

      // Verify that nested objects up to 2 layers are frozen
      expect(Object.isFrozen(deepFrozenObject.a)).toBeTruthy()
      expect(Object.isFrozen(deepFrozenObject.a.b)).toBeTruthy()
      expect(Object.isFrozen(deepFrozenObject.x)).toBeTruthy()

      // Verify that nested objects beyond 2 layers are not frozen
      expect(Object.isFrozen(deepFrozenObject.a.b.c)).toBeFalsy()
    })

    it('should handle null and undefined', () => {
      const nullObject = null
      const undefinedObject = undefined

      const deepFrozenNull = deepFreeze(nullObject)
      const deepFrozenUndefined = deepFreeze(undefinedObject)

      expect(deepFrozenNull).toBe(nullObject)
      expect(deepFrozenUndefined).toBe(undefinedObject)
    })

    it('should handle non-object types', () => {
      const number = 42
      const string = 'hello'

      const deepFrozenNumber = deepFreeze(number)
      const deepFrozenString = deepFreeze(string)

      expect(deepFrozenNumber).toBe(number)
      expect(deepFrozenString).toBe(string)
    })
  })

  describe('crawlObject', () => {
    it('should crawl through an object and execute callback on valid objects', () => {
      const myObject = {
        a: 1,
        b: {
          c: 2,
          d: {
            e: 3,
          },
        },
      }

      const keysArray: string[] = []
      const validateFunction = (obj: unknown, keys: string[]) => typeof obj === 'number'
      const callbackFunction = jest.fn()

      crawlObject(myObject, keysArray, validateFunction, callbackFunction)

      expect(callbackFunction).toHaveBeenCalledTimes(3)
      expect(callbackFunction).toHaveBeenCalledWith(1, ['a'])
      expect(callbackFunction).toHaveBeenCalledWith(2, ['b', 'c'])
      expect(callbackFunction).toHaveBeenCalledWith(3, ['b', 'd', 'e'])
    })

    it('should handle empty object', () => {
      const emptyObject = {}

      const keysArray: string[] = []
      const validateFunction = jest.fn()
      const callbackFunction = jest.fn()

      crawlObject(emptyObject, keysArray, validateFunction, callbackFunction)

      expect(validateFunction).toHaveBeenCalledTimes(1) // It validates once anyway
      expect(callbackFunction).not.toHaveBeenCalled()
    })

    it('should handle null and undefined', () => {
      const nullObject = null
      const undefinedObject = undefined

      const keysArray: string[] = []
      const validateFunction = jest.fn()
      const callbackFunction = jest.fn()

      crawlObject(nullObject, keysArray, validateFunction, callbackFunction)
      crawlObject(undefinedObject, keysArray, validateFunction, callbackFunction)

      expect(validateFunction).not.toHaveBeenCalled()
      expect(callbackFunction).not.toHaveBeenCalled()
    })
  })

  describe('layeredAssignment', () => {
    it('should assign a value to a nested object and create the path if it does not exist', () => {
      const myObject = {}

      const keysArray = ['a', 'b', 'c']
      const valueToAssign = 42

      layeredAssignment(myObject, keysArray, valueToAssign)

      expect(myObject).toEqual({ a: { b: { c: 42 } } })
    })

    it('should handle empty object', () => {
      const emptyObject = {}

      const keysArray = ['a', 'b', 'c']
      const valueToAssign = 42

      layeredAssignment(emptyObject, keysArray, valueToAssign)

      expect(emptyObject).toEqual({ a: { b: { c: 42 } } })
    })

    it('should handle null and undefined', () => {
      const nullObject = null
      const undefinedObject = undefined

      const keysArray = ['a', 'b', 'c']
      const valueToAssign = 42

      expect(() => {
        layeredAssignment(nullObject, keysArray, valueToAssign)
      }).toThrow()

      expect(() => {
        layeredAssignment(undefinedObject, keysArray, valueToAssign)
      }).toThrow()
    })
  })

  describe('objFilterKeys', () => {
    it('should filter the object to retain only specified keys and their values', () => {
      const myObject = {
        name: 'Alice',
        age: 30,
        city: 'New York',
      }

      const filteredObject = objFilterKeys(myObject, ['name', 'age'])

      expect(filteredObject).toEqual({ name: 'Alice', age: 30 })
    })

    it('should handle empty object', () => {
      const emptyObject = {}

      const filteredObject = objFilterKeys(emptyObject, ['name', 'age'])

      expect(filteredObject).toEqual({})
    })

    it('should handle empty key', () => {
      const myObject = {
        name: 'Alice',
        age: 30,
        city: 'New York',
      }

      const filteredObject = objFilterKeys(myObject, [''])

      expect(filteredObject).toEqual({})
    })
  })

  describe('objMap', () => {
    it('should map over key-value pairs and transform each value', () => {
      const myObject = {
        a: 10,
        b: 20,
        c: 30,
      }

      const transformedObject = objMap(myObject, (value, key, index) => value * index)

      expect(transformedObject).toEqual({ a: 0, b: 20, c: 60 })
    })

    it('should handle empty object', () => {
      const emptyObject = {}

      const transformedEmptyObject = objMap(emptyObject, (value, key, index) => value * index)

      expect(transformedEmptyObject).toEqual({})
    })
  })

  describe('objKeyMap', () => {
    it('should generate an object by mapping keys to values using a mapping function', () => {
      const keysArray = ['a', 'b', 'c']
      const mapFunction = (key, index) => key.toUpperCase() + index

      const mappedObject = objKeyMap(keysArray, mapFunction)

      expect(mappedObject).toEqual({ a: 'A0', b: 'B1', c: 'C2' })
    })

    it('should handle empty array of keys', () => {
      const emptyKeysArray: string[] = []
      const mapFunction = (key, index) => key.toUpperCase() + index

      const mappedEmptyObject = objKeyMap(emptyKeysArray, mapFunction)

      expect(mappedEmptyObject).toEqual({})
    })
  })

  describe('objKeyValMap', () => {
    it('should generate an object by mapping items to key-value pairs using a mapping function', () => {
      const itemsArray = ['a', 'b', 'c']
      const mapFunction = (item, index) => [item.toUpperCase(), index + 10] as any

      const mappedObject = objKeyValMap(itemsArray, mapFunction)

      expect(mappedObject).toEqual({ A: 10, B: 11, C: 12 })
    })

    it('should handle empty array of items', () => {
      const emptyItemsArray: string[] = []
      const mapFunction = (item, index) => [item.toUpperCase(), index + 10] as any

      const mappedEmptyObject = objKeyValMap(emptyItemsArray, mapFunction)

      expect(mappedEmptyObject).toEqual({})
    })
  })

  describe('objMultiplication', () => {
    it('should multiply numerical values in the object by the specified multiplier', () => {
      const myObject = {
        a: 10,
        b: {
          c: 20,
          d: {
            e: 30,
          },
        },
      }

      const multiplier = 2

      const multipliedObject = objMultiplication(myObject, multiplier)

      expect(multipliedObject).toEqual({
        a: 20,
        b: {
          c: 40,
          d: {
            e: 60,
          },
        },
      })
    })

    it('should handle empty object', () => {
      const emptyObject = {}

      const multiplier = 2

      const multipliedEmptyObject = objMultiplication(emptyObject, multiplier)

      expect(multipliedEmptyObject).toEqual({})
    })

    it('should handle multiplier of 1', () => {
      const myObject = {
        a: 10,
        b: {
          c: 20,
          d: {
            e: 30,
          },
        },
      }

      const multiplier = 1

      const unchangedObject = objMultiplication(myObject, multiplier)

      expect(unchangedObject).toEqual(myObject)
    })
  })

  describe('deletePropPath', () => {
    it('should delete the value at the specified path and remove empty objects in the path', () => {
      const myObject = {
        a: {
          b: {
            c: 123,
          },
        },
        x: 456,
      }

      const pathToDelete = ['a', 'b', 'c']

      deletePropPath(myObject, pathToDelete)

      expect(myObject).toEqual({ a: { b: {} }, x: 456 })
    })

    it('should handle missing path elements', () => {
      const myObject = {
        a: {
          b: {
            c: 123,
          },
        },
        x: 456,
      }

      const pathToDelete = ['a', 'b', 'd']

      deletePropPath(myObject, pathToDelete)

      expect(myObject).toEqual({ a: { b: { c: 123 } }, x: 456 })
    })

    it('should handle empty path', () => {
      const myObject = {
        a: {
          b: {
            c: 123,
          },
        },
        x: 456,
      }

      const pathToDelete: string[] = []

      deletePropPath(myObject, pathToDelete)

      expect(myObject).toEqual(myObject)
    })
  })

  describe('getObjectKeysRecursive', () => {
    it('should retrieve all keys from the provided object, including nested object keys', () => {
      const myObject = {
        a: {
          b: {
            c: 123,
          },
          d: [4, 5, 6],
        },
        x: 456,
      }

      const keys = getObjectKeysRecursive(myObject)

      expect(keys).toEqual(['a', 'b', 'c', 'd', 'x'])
    })

    it('should handle empty object', () => {
      const emptyObject = {}

      const keys = getObjectKeysRecursive(emptyObject)

      expect(keys).toEqual([])
    })

    it('should handle null and undefined', () => {
      const nullObject = null
      const undefinedObject = undefined

      const keysNull = getObjectKeysRecursive(nullObject)
      const keysUndefined = getObjectKeysRecursive(undefinedObject)

      expect(keysNull).toEqual([])
      expect(keysUndefined).toEqual([])
    })

  })
})

import { arrayMove, getArrLastElement, range, toggleArr, toggleInArr } from './array'

describe('Array utils', () => {
  describe('getArrLastElement', () => {
    it('should return the last element of the array', () => {
      const arr = [1, 2, 3, 4]

      const lastElement = getArrLastElement(arr)

      expect(lastElement).toEqual(4)
    })

    it('should return null for an empty array', () => {
      const emptyArr: number[] = []

      const lastElement = getArrLastElement(emptyArr)

      expect(lastElement).toBeNull()
    })
  })

  describe('toggleInArr', () => {
    it('should add the value to the array if it is not present', () => {
      const arr = [1, 2, 3]
      const valueToAdd = 4

      const modifiedArr = toggleInArr(arr, valueToAdd)

      expect(modifiedArr).toEqual([1, 2, 3, 4])
    })

    it('should remove the value from the array if it is already present', () => {
      const arr = [1, 2, 3]
      const valueToRemove = 2

      const modifiedArr = toggleInArr(arr, valueToRemove)

      expect(modifiedArr).toEqual([1, 3])
    })

    it('should handle an empty array', () => {
      const emptyArr: number[] = []
      const valueToAdd = 10

      const modifiedArr = toggleInArr(emptyArr, valueToAdd)

      expect(modifiedArr).toEqual([10])
    })

    it('should return the same array if the value is not present and the array is empty', () => {
      const emptyArr: number[] = []
      const valueToRemove = 5

      const modifiedArr = toggleInArr(emptyArr, valueToRemove)

      expect(modifiedArr).toBe(emptyArr)
    })
  })

  describe('toggleArr', () => {
    it('should add the value to the array if it is not present', () => {
      const arr = [1, 2, 3]
      const valueToAdd = 4

      const modifiedArr = toggleArr(arr, valueToAdd)

      expect(modifiedArr).toEqual([1, 2, 3, 4])
    })

    it('should remove the value from the array if it is already present', () => {
      const arr = [1, 2, 3]
      const valueToRemove = 2

      const modifiedArr = toggleArr(arr, valueToRemove)

      expect(modifiedArr).toEqual([1, 3])
    })

    it('should handle an empty array', () => {
      const emptyArr: number[] = []
      const valueToAdd = 10

      const modifiedArr = toggleArr(emptyArr, valueToAdd)

      expect(modifiedArr).toEqual([10])
    })
  })

  describe('arrayMove', () => {
    it('should move an item from one position to another', () => {
      const arr = ['a', 'b', 'c', 'd', 'e']
      const oldIndex = 2
      const newIndex = 4

      const modifiedArr = arrayMove(arr, oldIndex, newIndex)

      expect(modifiedArr).toEqual(['a', 'b', 'd', 'e', 'c'])
    })

    it('should handle moving an item to the beginning of the array', () => {
      const arr = ['a', 'b', 'c', 'd', 'e']
      const oldIndex = 3
      const newIndex = 0

      const modifiedArr = arrayMove(arr, oldIndex, newIndex)

      expect(modifiedArr).toEqual(['d', 'a', 'b', 'c', 'e'])
    })

    it('should handle moving an item to the end of the array', () => {
      const arr = ['a', 'b', 'c', 'd', 'e']
      const oldIndex = 0
      const newIndex = 4

      const modifiedArr = arrayMove(arr, oldIndex, newIndex)

      expect(modifiedArr).toEqual(['b', 'c', 'd', 'e', 'a'])
    })

    it('should return the same array if oldIndex or newIndex is out of bounds', () => {
      const arr = ['a', 'b', 'c', 'd', 'e']
      const invalidOldIndex = 5
      const invalidNewIndex = -1

      const arrAfterInvalidOldIndex = arrayMove(arr, invalidOldIndex, 1)
      const arrAfterInvalidNewIndex = arrayMove(arr, 1, invalidNewIndex)

      expect(arrAfterInvalidOldIndex).toBe(arr)
      expect(arrAfterInvalidNewIndex).toBe(arr)
    })
  })

  describe('range', () => {
    it('should generate an array of numbers in the specified range', () => {
      const from = 1;
      const to = 5;
  
      const result = range(from, to);
  
      expect(result).toEqual([1, 2, 3, 4, 5]);
    });
  
    it('should handle a range with a single number', () => {
      const from = 7;
      const to = 7;
  
      const result = range(from, to);
  
      expect(result).toEqual([7]);
    });
  
    it('should handle a range with a negative numbers', () => {
      const from = -3;
      const to = 1;
  
      const result = range(from, to);
  
      expect(result).toEqual([-3, -2, -1, 0, 1]);
    });
  
    it('should handle an empty range (from > to)', () => {
      const from = 5;
      const to = 1;
  
      const result = range(from, to);
  
      expect(result).toEqual([]);
    });
  
    it('should handle a large range', () => {
      const from = 1;
      const to = 1000;
  
      const result = range(from, to);
  
      const expectedArray = Array.from({ length: 1000 }, (_, i) => i + 1);
      expect(result).toEqual(expectedArray);
    });
  });
})

/*
* A sorted and rotated array is an array that was originally sorted (ascending or descending) and then rotated (elements shifted circularly).
*
* Right Rotation: A right rotation moves the last element to the front.
*   [1, 2, 3, 4, 5, 6, 7]
*   1st right rotation:
*       [7, 1, 2, 3, 4, 5, 6]
*
* Left Rotation: If you rotate the original array to the left, you get:
*   [1, 2, 3, 4, 5, 6, 7]
*   1st left rotation:
*       [2, 3, 4, 5, 6, 7, 1]
*
* The standard interview problem assumes right rotations.

  Efficient Solution (Binary Search) - O(log n)
    The minimum element is the pivot where the rotation happened.
 */
// Binary search should exclude mid after checking it.

// sorted and rotated array
const arr=[4,5,6,7,1,2,3];
function findKey(arr, low, high, key){
  if(low>high) return;
  let mid=Math.floor((low+high)/2);
  console.log('mid index', mid)
  if(arr[mid]===key){
    console.log('found element, ', arr[mid]);
    return key;
  }

// left half is sorted
  if(arr[low]<arr[mid]){
    if(key >= arr[low] && key < arr[mid]){
      return findKey(arr, low, mid-1, key);
    }

    return findKey(arr, mid+1, high, key);
  }

// right half is sorted
  if(key > arr[mid] && key <= arr[high]){
    return findKey(arr, mid+1, high, key);
  }

  return findKey(arr, low, mid-1, key);
}

const kf=findKey(arr, 0, arr.length-1, 3);
console.log(kf)
console.log('#################################')
const kf5=findKey(arr, 0, arr.length-1, 5)
console.log(kf5)
console.log('#################################')
const kf1=findKey(arr, 0, arr.length-1, 1)
console.log(kf1)


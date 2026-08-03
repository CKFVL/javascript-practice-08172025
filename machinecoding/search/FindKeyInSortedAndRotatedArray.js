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


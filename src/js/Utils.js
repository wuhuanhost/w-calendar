export default {
    arr2arr(arr, num) {
        var arrs  = [];
        var start = 0;
        var num   = num;
        while (arr.length) {
            arrs.push(arr.splice(start, num));
        }
        return arrs;
    }
}

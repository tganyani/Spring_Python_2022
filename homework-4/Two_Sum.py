# O(n^2)
def twoSum(numbers, target):
    for i in range(len(numbers)):
        for j in range(i + 1, len(numbers)):
            if numbers[i] + numbers[j] == target:
                return (i, j)


# O(n*log(n))
def twoSum(numbers, target):
    def binary_search(numbers, target):
        start = 0
        end = len(numbers) - 1
        while start <= end:
            mid = (start + end) // 2
            if target == numbers[mid][0]:
                return numbers[mid][1]
            if target < numbers[mid][0]:
                end = mid - 1
            else:
                start = mid + 1
    sorted_numbers = []
    for i in range(len(numbers)):
        sorted_numbers.append((numbers[i], i))
    sorted_numbers.sort()
    for i in range(len(numbers)):
        first = sorted_numbers[i][0]
        last = target - first
        if binary_search(sorted_numbers[i + 1:], last) is not None:
            return (sorted_numbers[i][1], binary_search(sorted_numbers[i + 1:], last))

# O(n)
def twoSum(numbers, target):
    hash_table = {}
    for index1, value1 in enumerate(numbers):
        index2 = hash_table.get(target - value1)
        if index2 is not None:
            return (index1, index2)
        else:
            hash_table[value1] = index1

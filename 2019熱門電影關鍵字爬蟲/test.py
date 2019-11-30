arr = [1,2,3]
arr2 = [4,5,6]
arr.append(arr2)
print(arr)

str = 'ILOVEPYTHON'
rev = ''
for index in range(len(str)-1,-1,-1):
    rev+=str[index]
print(rev)
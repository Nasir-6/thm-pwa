string = "01:45"

print("changing : -> -")
newStr = string[:2] + "-" + string[-2:]
print(newStr)

print("some other tests")
print(string[:2])
print(string[-3:])
print(string[0])

print(int(string[0]) + 2)

print(str(int(string[0:2]) + 2) + "hello")